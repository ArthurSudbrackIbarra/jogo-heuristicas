# Post-game feedback form builder

Standalone TypeScript script that creates the post-game survey for the Nielsen Heuristics game via the Google Forms API.

## What it does

Running `npm run create` produces a single Google Form (in Brazilian Portuguese) that:

- Opens with the **Termo de Consentimento Livre e Esclarecido (TCLE)** loaded verbatim from [`paper/claude_context/forms_header.txt`](../../paper/claude_context/forms_header.txt) — this wording is mandated by the ethics committee approval and must not be altered.
- Requires the respondent to confirm consent before continuing.
- Asks five quick multiple-choice demographic questions (role, age range, area, prior familiarity with the heuristics, HCI evaluation experience).
- Ends with five open-ended (paragraph) questions capturing qualitative feedback on the game, on whether it helped comprehension of the heuristics, on the effects of the gamification and narration, and on improvements.

The question bank lives in [`src/questions.ts`](src/questions.ts). The TCLE text lives in [`paper/claude_context/forms_header.txt`](../../paper/claude_context/forms_header.txt) and is read at runtime — edit the question bank and/or the TCLE file and re-run the script to regenerate.

## Question codes

| Prefix | Meaning                        |
| ------ | ------------------------------ |
| `C#`   | Consent confirmation           |
| `D#`   | Demographics (multiple choice) |
| `T#`   | Open-text (paragraph)          |

Each question title in the form is prefixed with `[CODE]` so columns are easy to spot in the response spreadsheet.

## One-time setup

1. **Create a Google Cloud project & enable the Forms API**
   - Visit https://console.cloud.google.com/
   - Create a project (or pick an existing one).
   - Enable **Google Forms API** (APIs & Services → Library).

2. **Configure the OAuth consent screen**
   - APIs & Services → OAuth consent screen.
   - User type: **External** (fine for personal use; you'll be the only test user).
   - Add your Google account as a **Test user**.
   - Add scope `https://www.googleapis.com/auth/forms.body`.

3. **Create OAuth Desktop credentials**
   - APIs & Services → Credentials → Create credentials → **OAuth client ID**.
   - Application type: **Desktop app**.
   - Download the JSON and save it to this directory as **`credentials.json`** (already gitignored).

4. **Install dependencies**
   ```sh
   cd scripts/google-form
   npm install
   ```

## Run

```sh
npm run create
```

On first run a browser tab will open asking you to authorize the script. After consenting, a `token.json` refresh token is saved in this directory (also gitignored) so subsequent runs don't prompt again.

The script prints the form's **edit URL** and **responder URL** on success.

## After creating the form

1. Open the edit URL and skim the form to make sure the TCLE rendered correctly and the layout looks right.
2. On the **Responses** tab, click the green Sheets icon to capture submissions into a linked spreadsheet.
3. Replace the `https://forms.gle/PLACEHOLDER` URL in [`src/screens/ResultsScreen/index.tsx`](../../src/screens/ResultsScreen/index.tsx) with the responder URL (or a shortened `forms.gle` link from Google Forms' "Send" button).

## Re-running

Running the script again creates a **new** form — it does not modify the previous one. If you want to iterate, you can delete old forms from your Google Drive between runs.

## Troubleshooting

- **`Could not find credentials.json`** — Step 3 above.
- **`Google did not return a refresh_token`** — Delete `token.json` and rerun. Make sure the OAuth client is a **Desktop** type.
- **`Access blocked: project has not been verified`** — On the consent screen, add your account as a Test user (consent screen → Test users).
- **`Insufficient Permission`** — Make sure the scope `forms.body` was approved during consent. Delete `token.json` and rerun.
- **`Invalid value at 'requests[N].create_item.item.description'`** — The TCLE chunking logic may have produced a chunk over the API limit. Lower `MAX_DESC_CHARS` in [`src/createForm.ts`](src/createForm.ts).
