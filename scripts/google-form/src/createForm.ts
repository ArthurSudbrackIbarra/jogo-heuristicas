/**
 * Build the post-game feedback Google Form from the question bank.
 *
 * Form layout:
 *   Page 1 (default page, no break):
 *     - TCLE text (loaded verbatim from paper/claude_context/forms_header.txt,
 *       split into chunks under the Google Forms description-length limit)
 *     - Required consent checkbox
 *   Page 2: Demographics ("Sobre você")
 *   Page 3: Open-ended questions ("Sobre o jogo")
 *
 * The TCLE wording is mandated by the ethics committee approval and must
 * match the source file exactly — do not edit forms_header.txt without the
 * advisor's approval.
 */

import path from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
import { google, type forms_v1 } from "googleapis";
import { getAuthorizedClient } from "./auth.js";
import {
  formMeta,
  questions,
  type ChoiceItem,
  type TextItem,
  type SectionBreak,
} from "./questions.js";

type Item = forms_v1.Schema$Item;
type Request = forms_v1.Schema$Request;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CREDENTIALS_PATH = path.join(__dirname, "..", "credentials.json");
const TOKEN_PATH = path.join(__dirname, "..", "token.json");
const TCLE_PATH = path.join(__dirname, "..", "TCLE.txt");

// ─── TCLE loader ─────────────────────────────────────────────────────────────

function loadTcleItem(): Item {
  const raw = readFileSync(TCLE_PATH, "utf-8");
  const normalized = raw.replace(/\r\n/g, "\n").replace(/[ \t]+$/gm, "");
  const trimmed = normalized.replace(/\n+$/g, "");

  // First non-empty line is the title; the remaining lines (verbatim) become
  // the description body. Kept as a single block per the advisor's request —
  // if Google Forms rejects the description for being too long, we'll need
  // to chunk it again.
  const lines = trimmed.split("\n");
  const firstNonEmpty = lines.findIndex((l) => l.trim().length > 0);
  const title =
    firstNonEmpty >= 0 ? lines[firstNonEmpty].trim() : "Termo de Consentimento";
  // Preserve the blank line that follows the title in the source file so the
  // Google Forms description renders with visual separation between title and
  // body. If the source has no such blank line, prepend one.
  const rawBody = lines.slice(firstNonEmpty + 1).join("\n");
  const body = rawBody.startsWith("\n") ? rawBody : "\n" + rawBody;

  return {
    title,
    description: body,
    textItem: {},
  };
}

// ─── Item builders ───────────────────────────────────────────────────────────

function choiceToItem(q: ChoiceItem): Item {
  return {
    title: `[${q.code}] ${q.prompt}`,
    description: q.description,
    questionItem: {
      question: {
        required: q.required,
        choiceQuestion: {
          type: q.multiple ? "CHECKBOX" : "RADIO",
          options: q.options.map((value) => ({ value })),
        },
      },
    },
  };
}

function textToItem(q: TextItem): Item {
  return {
    title: `[${q.code}] ${q.prompt}`,
    description: q.description,
    questionItem: {
      question: {
        required: q.required,
        textQuestion: { paragraph: q.paragraph },
      },
    },
  };
}

function sectionToItem(sec: SectionBreak): Item {
  return {
    title: sec.title,
    description: sec.description,
    pageBreakItem: {},
  };
}

function questionToItem(q: ChoiceItem | TextItem | SectionBreak): Item {
  if (q.type === "section") return sectionToItem(q);
  if (q.type === "choice") return choiceToItem(q);
  return textToItem(q);
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  console.log("Authorizing Google Forms API client…");
  const auth = await getAuthorizedClient({
    credentialsPath: CREDENTIALS_PATH,
    tokenPath: TOKEN_PATH,
  });
  const forms = google.forms({ version: "v1", auth });

  console.log(`Creating form "${formMeta.title}"…`);
  const createRes = await forms.forms.create({
    requestBody: { info: { title: formMeta.title } },
  });
  const formId = createRes.data.formId;
  if (!formId) throw new Error("forms.create did not return a formId");
  console.log(`Form created (formId: ${formId}).`);

  const tcleItem = loadTcleItem();
  console.log(
    `Loaded TCLE (${(tcleItem.description ?? "").length} chars in description).`,
  );

  const items: Item[] = [tcleItem, ...questions.map(questionToItem)];

  const requests: Request[] = [
    {
      updateFormInfo: {
        info: { description: formMeta.description },
        updateMask: "description",
      },
    },
    ...items.map((item, index) => ({
      createItem: { item, location: { index } },
    })),
  ];

  console.log(`Submitting ${items.length} items…`);
  await forms.forms.batchUpdate({
    formId,
    requestBody: { requests },
  });

  const editUrl = `https://docs.google.com/forms/d/${formId}/edit`;
  const responderUrl =
    createRes.data.responderUri ??
    `https://docs.google.com/forms/d/e/${formId}/viewform`;

  console.log("\n✓ Form created and configured.");
  console.log(`  Edit URL:      ${editUrl}`);
  console.log(`  Responder URL: ${responderUrl}`);
  console.log("\nNext steps:");
  console.log("  1. Open the edit URL and review the form's layout.");
  console.log(
    "  2. On the 'Responses' tab, click the green Sheets icon to capture submissions into a spreadsheet.",
  );
  console.log(
    "  3. Paste the responder URL into src/screens/ResultsScreen/index.tsx (replace https://forms.gle/PLACEHOLDER).",
  );
}

main().catch((err) => {
  console.error(
    "\n✗ Failed to create form:",
    err instanceof Error ? err.message : err,
  );
  if (err instanceof Error && err.stack) console.error(err.stack);
  process.exit(1);
});
