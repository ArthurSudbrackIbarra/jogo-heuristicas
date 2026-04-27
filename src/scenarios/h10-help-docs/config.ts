import type { HeuristicConfig } from '../../types/game';
import { BadScenario } from './BadScenario';
import { GoodScenario } from './GoodScenario';

export const h10: HeuristicConfig = {
  id: 10,
  name: 'Help and Documentation',
  tagline: 'Even though it is better if the system can be used without documentation...',
  description:
    'Even though it is better if the system can be used without documentation, it may be necessary to provide help and documentation. Any such information should be easy to search, focused on the user\'s task, list concrete steps to be carried out, and not be too large.',
  goal: 'Enable Two-Factor Authentication (2FA) in Security Settings.',
  scenarios: [
    {
      kind: 'bad',
      component: BadScenario,
      narratorBefore:
        'Enable Two-Factor Authentication on this settings page.',
      narratorAfter:
        '"2FA", "TOTP", "FIDO2" — what do these mean? The page offers no explanations, no tooltips, no "Learn more" links. Unfamiliar users are left guessing what each option does and which to choose.',
    },
    {
      kind: 'good',
      component: GoodScenario,
      narratorBefore:
        'Enable 2FA again — notice how much clearer this version is.',
      narratorAfter:
        'Each option has a clear name, a plain-language description, and an info tooltip with extra context. The recommended option is labeled. Users can make informed decisions without leaving the page.',
    },
  ],
  revealText:
    'Heuristic #10 is Help and Documentation. Well-designed systems are self-explanatory — but when complexity is unavoidable, inline help (descriptions, tooltips, "Learn more" links) removes friction without requiring users to consult external documentation.',
};
