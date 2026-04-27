import type { HeuristicConfig } from '../../types/game';
import { BadScenario } from './BadScenario';
import { GoodScenario } from './GoodScenario';

export const h09: HeuristicConfig = {
  id: 9,
  name: 'Help Users Recognize, Diagnose, and Recover from Errors',
  tagline: 'Error messages should express the problem in plain language and suggest a solution.',
  description:
    'Error messages should be expressed in plain language (no codes), precisely indicate the problem, and constructively suggest a solution. Users should never be left wondering what went wrong or what to do next.',
  goal: 'Fix the form errors and complete your registration.',
  scenarios: [
    {
      kind: 'bad',
      component: BadScenario,
      narratorBefore:
        'Fill in the form and try to register. The email has a problem — see if you can fix it.',
      narratorAfter:
        '"Error 422: Unprocessable Entity" tells you nothing actionable. What field is wrong? What rule did it break? How do you fix it? The user is stuck without a map.',
    },
    {
      kind: 'good',
      component: GoodScenario,
      narratorBefore:
        'Same form, same error — but now try to fix it and register successfully.',
      narratorAfter:
        'The inline error highlighted the exact field, explained the specific problem ("needs @domain format"), and let you fix and resubmit immediately. That\'s a recoverable error experience.',
    },
  ],
  revealText:
    'Heuristic #9 is Help Users Recognize, Diagnose, and Recover from Errors. Error messages must be human-readable, field-specific, and solution-oriented. "Error 422" is useless; "Email must include @domain.com" is helpful. Give users a path forward, not a dead end.',
};
