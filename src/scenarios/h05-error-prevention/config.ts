import type { HeuristicConfig } from '../../types/game';
import { BadScenario } from './BadScenario';
import { GoodScenario } from './GoodScenario';

export const h05: HeuristicConfig = {
  id: 5,
  name: 'Error Prevention',
  tagline: 'Design carefully to prevent problems from occurring in the first place.',
  description:
    'Even better than good error messages is a careful design which prevents a problem from occurring in the first place. Either eliminate error-prone conditions or check for them and present users with a confirmation option before they commit to the action.',
  goal: 'Delete your account from the settings page.',
  scenarios: [
    {
      kind: 'bad',
      component: BadScenario,
      narratorBefore:
        'Find and click the option to delete your account.',
      narratorAfter:
        'One click and it\'s gone — no warning, no confirmation, no second chance. A single misclick permanently destroys an account. This is catastrophic error design.',
    },
    {
      kind: 'good',
      component: GoodScenario,
      narratorBefore:
        'Try to delete your account again — follow all the steps.',
      narratorAfter:
        'Three layers of protection: a less prominent button, a clear warning dialog, a type-to-confirm field, and a checkbox acknowledging the consequences. Errors are prevented before they happen.',
    },
  ],
  revealText:
    'Heuristic #5 is Error Prevention. The best error message is the one that never has to appear. For high-stakes or irreversible actions, good design adds friction — confirmations, warnings, and type-to-confirm fields — to prevent accidental disasters.',
};
