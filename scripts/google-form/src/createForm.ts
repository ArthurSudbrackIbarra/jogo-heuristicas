/**
 * Build the post-game feedback Google Form from the bilingual question bank.
 *
 * The form has three top-level sections:
 *   1. Welcome + language selector (default section, no page break needed).
 *   2. English questionnaire (starts at the first page break we emit for EN).
 *   3. Portuguese questionnaire (starts at the first page break for PT).
 *
 * The language selector's options each carry `goToSectionId` pointing at
 * the corresponding language's first page break, so the respondent only
 * sees questions in their chosen language. The very last question in each
 * language ("Overall rating") uses `goToAction: SUBMIT_FORM` on every
 * option so the EN section terminates cleanly instead of falling through
 * into the PT section.
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { google, type forms_v1 } from 'googleapis';
import { getAuthorizedClient } from './auth.js';
import {
  formMeta,
  likertScales,
  questions,
  type Lang,
  type LikertItem,
  type ChoiceItem,
  type TextItem,
  type SectionBreak,
} from './questions.js';

type Item = forms_v1.Schema$Item;
type Request = forms_v1.Schema$Request;
type Option = forms_v1.Schema$Option;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CREDENTIALS_PATH = path.join(__dirname, '..', 'credentials.json');
const TOKEN_PATH = path.join(__dirname, '..', 'token.json');

// ─── Item builders ───────────────────────────────────────────────────────────

function likertToItem(q: LikertItem, lang: Lang): Item {
  const scale = likertScales[q.scale][lang];
  return {
    title: `[${q.code}] ${q.prompt[lang]}`,
    description: q.description?.[lang],
    questionItem: {
      question: {
        required: q.required,
        choiceQuestion: {
          type: 'RADIO',
          options: scale.map((value) => ({ value })),
        },
      },
    },
  };
}

function choiceToItem(q: ChoiceItem, lang: Lang): Item {
  const options: Option[] = q.options.map((opt) => {
    const o: Option = { value: opt[lang] };
    if (q.submitAfter) o.goToAction = 'SUBMIT_FORM';
    return o;
  });
  return {
    title: `[${q.code}] ${q.prompt[lang]}`,
    description: q.description?.[lang],
    questionItem: {
      question: {
        required: q.required,
        choiceQuestion: {
          type: q.multiple ? 'CHECKBOX' : 'RADIO',
          options,
        },
      },
    },
  };
}

function textToItem(q: TextItem, lang: Lang): Item {
  return {
    title: `[${q.code}] ${q.prompt[lang]}`,
    description: q.description?.[lang],
    questionItem: {
      question: {
        required: q.required,
        textQuestion: {
          paragraph: q.paragraph,
        },
      },
    },
  };
}

function sectionToItem(sec: SectionBreak, lang: Lang): Item {
  return {
    title: sec.title[lang],
    description: sec.description?.[lang],
    pageBreakItem: {},
  };
}

// ─── Per-language pass ───────────────────────────────────────────────────────

interface LanguagePass {
  items: Item[];
  /** Index within `items` of the first page break — used as the section's entry point for routing. */
  firstPageBreakIndex: number;
}

function buildLanguagePass(lang: Lang): LanguagePass {
  const items: Item[] = [];
  let firstPageBreakIndex = -1;

  for (const q of questions) {
    let item: Item;
    if (q.type === 'section') {
      item = sectionToItem(q, lang);
      if (firstPageBreakIndex === -1) firstPageBreakIndex = items.length;
    } else if (q.type === 'likert') {
      item = likertToItem(q, lang);
    } else if (q.type === 'choice') {
      item = choiceToItem(q, lang);
    } else {
      item = textToItem(q, lang);
    }
    items.push(item);
  }

  if (firstPageBreakIndex === -1) {
    throw new Error(
      'Question bank has no section breaks — at least one is required to start the language section.',
    );
  }
  return { items, firstPageBreakIndex };
}

// ─── Top-of-form items (intro + language selector) ───────────────────────────

function introItem(): Item {
  return {
    title: 'Welcome · Bem-vindo(a)',
    description:
      "Please pick your preferred language below — you'll only see the questionnaire in the language you select.\n\nEscolha o idioma de sua preferência abaixo — você só verá o questionário no idioma escolhido.",
    textItem: {},
  };
}

function languageSelectorPlaceholder(): Item {
  return {
    title: 'Language · Idioma',
    description:
      'Select the language you would like to answer in.\nSelecione o idioma em que deseja responder.',
    questionItem: {
      question: {
        required: true,
        choiceQuestion: {
          type: 'RADIO',
          options: [{ value: 'English' }, { value: 'Português' }],
        },
      },
    },
  };
}

function languageSelectorWithRouting(
  itemId: string,
  enPageBreakItemId: string,
  ptPageBreakItemId: string,
): Item {
  return {
    itemId,
    title: 'Language · Idioma',
    description:
      'Select the language you would like to answer in.\nSelecione o idioma em que deseja responder.',
    questionItem: {
      question: {
        required: true,
        choiceQuestion: {
          type: 'RADIO',
          options: [
            { value: 'English', goToSectionId: enPageBreakItemId },
            { value: 'Português', goToSectionId: ptPageBreakItemId },
          ],
        },
      },
    },
  };
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log('Authorizing Google Forms API client…');
  const auth = await getAuthorizedClient({
    credentialsPath: CREDENTIALS_PATH,
    tokenPath: TOKEN_PATH,
  });
  const forms = google.forms({ version: 'v1', auth });

  const combinedTitle = `${formMeta.title.en} · ${formMeta.title.pt}`;
  console.log(`Creating form "${combinedTitle}"…`);
  const createRes = await forms.forms.create({
    requestBody: {
      info: { title: combinedTitle },
    },
  });
  const formId = createRes.data.formId;
  if (!formId) throw new Error('forms.create did not return a formId');
  console.log(`Form created (formId: ${formId}).`);

  // ── Build flat item list ──
  const enPass = buildLanguagePass('en');
  const ptPass = buildLanguagePass('pt');

  // Layout (indices in the final form):
  //   0           : intro text
  //   1           : language selector (placeholder, no routing yet)
  //   2 .. 2+enN-1: EN items (first page break = EN entry)
  //   2+enN..end  : PT items (first page break = PT entry)
  const items: Item[] = [
    introItem(),
    languageSelectorPlaceholder(),
    ...enPass.items,
    ...ptPass.items,
  ];

  const LANG_INDEX = 1;
  const EN_ENTRY_INDEX = 2 + enPass.firstPageBreakIndex;
  const PT_ENTRY_INDEX = 2 + enPass.items.length + ptPass.firstPageBreakIndex;

  // ── batchUpdate #1: description + every item ──
  const initialRequests: Request[] = [
    {
      updateFormInfo: {
        info: {
          description: `${formMeta.description.en}\n\n— — —\n\n${formMeta.description.pt}`,
        },
        updateMask: 'description',
      },
    },
    ...items.map((item, index) => ({
      createItem: { item, location: { index } },
    })),
  ];

  console.log(`Submitting ${items.length} items in batchUpdate #1…`);
  const batchRes = await forms.forms.batchUpdate({
    formId,
    requestBody: { requests: initialRequests },
  });

  const replies = batchRes.data.replies ?? [];
  // replies[0] is the updateFormInfo reply (empty). Subsequent replies are
  // createItem replies in the same order as the items array.
  const CREATE_REPLY_OFFSET = 1;
  const idOf = (itemsIdx: number): string | undefined =>
    replies[CREATE_REPLY_OFFSET + itemsIdx]?.createItem?.itemId ?? undefined;

  const langItemId = idOf(LANG_INDEX);
  const enPageBreakItemId = idOf(EN_ENTRY_INDEX);
  const ptPageBreakItemId = idOf(PT_ENTRY_INDEX);

  if (!langItemId || !enPageBreakItemId || !ptPageBreakItemId) {
    throw new Error(
      `Could not resolve itemIds from batchUpdate response. lang=${langItemId} en=${enPageBreakItemId} pt=${ptPageBreakItemId}`,
    );
  }

  // ── batchUpdate #2: rewrite language selector options with routing ──
  console.log('Submitting batchUpdate #2 to wire language routing…');
  await forms.forms.batchUpdate({
    formId,
    requestBody: {
      requests: [
        {
          updateItem: {
            item: languageSelectorWithRouting(
              langItemId,
              enPageBreakItemId,
              ptPageBreakItemId,
            ),
            location: { index: LANG_INDEX },
            updateMask: 'questionItem.question.choiceQuestion.options',
          },
        },
      ],
    },
  });

  const editUrl = `https://docs.google.com/forms/d/${formId}/edit`;
  const responderUrl =
    createRes.data.responderUri ??
    `https://docs.google.com/forms/d/e/${formId}/viewform`;

  console.log('\n✓ Form created and configured.');
  console.log(`  Edit URL:      ${editUrl}`);
  console.log(`  Responder URL: ${responderUrl}`);
  console.log('\nNext steps:');
  console.log("  1. Open the edit URL and review the form's layout.");
  console.log("  2. On the 'Responses' tab, click the green Sheets icon to capture submissions into a spreadsheet.");
  console.log(
    "  3. Paste the responder URL into src/screens/ResultsScreen/index.tsx (replace https://forms.gle/PLACEHOLDER).",
  );
  console.log(
    '  4. To aggregate across languages: response columns share a `[CODE]` prefix (e.g. [L1]) — group columns by prefix.',
  );
}

main().catch((err) => {
  console.error('\n✗ Failed to create form:', err instanceof Error ? err.message : err);
  if (err instanceof Error && err.stack) console.error(err.stack);
  process.exit(1);
});
