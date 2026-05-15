# Post-game feedback form builder

Standalone TypeScript script that creates the bilingual post-game survey for the Nielsen Heuristics game via the Google Forms API.

## What it does

Running `npm run create` produces a single Google Form that:

- Greets the respondent in both English and Portuguese.
- Asks them to pick a language; subsequent questions only appear in that language (uses Google Forms' "go to section based on answer" routing).
- Contains the same question set in both languages, with a shared `[CODE]` prefix on every question title so responses can be aggregated across languages in the response spreadsheet.
- Ends with a final overall rating that submits the form.

The question bank lives in [`src/questions.ts`](src/questions.ts). Edit that file and re-run the script to regenerate.

## Question codes

| Prefix | Meaning |
|--------|---------|
| `D#`   | Demographics |
| `L#`   | Learning & comprehension |
| `N#`   | Narrator / narrative |
| `G#`   | Gamification |
| `U#`   | Usability of the game itself |
| `E#`   | Educational value |
| `S#`   | Specific reflection (heuristic choices, difficulty) |
| `T#`   | Optional open text |
| `F`    | Final overall rating |

In the response sheet, columns share a `[CODE]` prefix between languages — group them by prefix to merge PT-BR and EN-US responses.

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

1. Open the edit URL and skim the form to make sure it looks right.
2. On the **Responses** tab, click the green Sheets icon to capture submissions into a linked spreadsheet.
3. Replace the `https://forms.gle/PLACEHOLDER` URL in [`src/screens/ResultsScreen/index.tsx`](../../src/screens/ResultsScreen/index.tsx) with the responder URL (or a shortened `forms.gle` link from Google Forms' "Send" button).

## Re-running

Running the script again creates a **new** form — it does not modify the previous one. If you want to iterate, you can delete old forms from your Google Drive between runs.

## Troubleshooting

- **`Could not find credentials.json`** — Step 3 above.
- **`Google did not return a refresh_token`** — Delete `token.json` and rerun. Make sure the OAuth client is a **Desktop** type.
- **`Access blocked: project has not been verified`** — On the consent screen, add your account as a Test user (consent screen → Test users).
- **`Insufficient Permission`** — Make sure the scope `forms.body` was approved during consent. Delete `token.json` and rerun.
