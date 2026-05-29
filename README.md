# Jogo das Heurísticas

A web-based educational game that teaches Nielsen's ten usability heuristics through paired interactive scenarios. For every heuristic the player completes the same small task twice: once in an interface that violates the heuristic, and once in an interface that respects it. A narrator frames each scenario before the player starts, comes back with a short comment after the task is done, and a reveal screen then labels the heuristic and recaps the contrast.

This repository contains two things:

1. The source code of the game, a single-page React + TypeScript app built with Vite.
2. The LaTeX source of an experience-report paper (submitted to IHC 2026) that describes the design of the game and a qualitative evaluation with 31 participants.

## What the Game Looks Like

The game runs entirely in the browser. There is no backend, nothing is saved to a server, and the whole session fits in a single page load. It is bilingual (English and Portuguese).

Each heuristic follows the same flow:

1. The player enters the bad scenario.
2. The narrator announces the mission (the task to be completed).
3. The player attempts the task. The bad interface produces friction, and the player works around it until the task is done.
4. The narrator returns to comment on what was wrong.
5. The player enters the good scenario for the same heuristic.
6. The narrator announces the same mission again.
7. The player completes the task in the compliant interface.
8. The narrator comments on what was good.
9. A reveal screen recaps both scenarios side by side, explains why the compliant interface is better, names the heuristic with its definition, and awards a star.
10. The next heuristic begins.

After all ten heuristics, a closing screen greets the player as a "Heuristics Expert" and a final overview shows the average time spent per heuristic.

The ten heuristics and the tasks paired with them are:

| #   | Heuristic                                               | Task in the game                               |
| --- | ------------------------------------------------------- | ---------------------------------------------- |
| 1   | Visibility of System Status                             | Send a message to a friend                     |
| 2   | Match Between System and the Real World                 | Save a document before closing                 |
| 3   | User Control and Freedom                                | Exit an upgrade wizard that opened by accident |
| 4   | Consistency and Standards                               | Go through a four-step checkout                |
| 5   | Error Prevention                                        | Delete an account from settings                |
| 6   | Recognition Rather Than Recall                          | Bold a word in a document                      |
| 7   | Flexibility and Efficiency of Use                       | Mark all unread notifications as read          |
| 8   | Aesthetic and Minimalist Design                         | Find and click the Buy Now button              |
| 9   | Help Users Recognize, Diagnose, and Recover from Errors | Fix a form error and finish signup             |
| 10  | Help and Documentation                                  | Enable Two-Factor Authentication               |

The full design rationale, including why a scoring layer and a recognition step were deliberately left out, is in the paper inside `paper/`.

## Repository Layout

```
.
├── src/                    React + TypeScript source for the game
│   ├── scenarios/          One folder per heuristic (h01-system-status, h02-real-world, ...)
│   ├── screens/            Reveal screen, closing screen, final overview
│   ├── components/         Shared UI building blocks (narrator panel, mission bar, ...)
│   ├── context/            React contexts holding game state
│   ├── hooks/              Custom React hooks
│   ├── i18n/               English and Portuguese strings
│   └── styles/             CSS modules
├── public/                 Static assets (narration audio, images, icons)
├── scripts/                Utility scripts (Google-Forms helpers, etc.)
├── paper/                  LaTeX source of the experience-report paper
│   ├── article.tex         Top-level paper file
│   ├── sections/           One .tex per section (introduction, background, game, methodology, ...)
│   ├── references/         BibTeX bibliography
│   ├── figures/            Screenshots and demographic plots
│   └── scripts/            Python script that generates the demographic figures from form data
├── package.json
└── README.md               This file
```

## Running the Game Locally

You need Node.js (any recent LTS) and npm.

```bash
npm install
npm run dev
```

Vite will print the local URL (usually `http://localhost:5173`). Open it in a browser, pick a language, and start playing.

Other scripts:

- `npm run build` produces a static-site build under `dist/`.
- `npm run preview` serves the production build locally.
- `npm run lint` runs ESLint on the source.

## About the Experience Report (Paper)

The paper reports the design of the game and a qualitative evaluation with 31 participants who played the full session and answered an open-ended questionnaire afterwards. Participants were mostly students, with some researchers and industry professionals, drawn from Computer Science, Software Engineering, Design / UX, and Information Systems. The analysis follows Bardin's qualitative content analysis.

While the paper is under double-blind review, author names, affiliations, and the ethics review number are omitted from the LaTeX. They will be reinstated for the camera-ready version.
