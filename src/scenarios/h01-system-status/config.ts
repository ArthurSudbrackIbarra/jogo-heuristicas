import type { HeuristicConfig } from '../../types/game';
import { BadScenario } from './BadScenario';
import { GoodScenario } from './GoodScenario';

export const h01: HeuristicConfig = {
  id: 1,
  name: 'Visibility of System Status',
  tagline: 'Always keep users informed about what is going on.',
  description:
    'The system should always keep users informed about what is going on, through appropriate feedback within a reasonable time. Users should never have to wonder whether their action was registered or if something is happening in the background.',
  goal: 'Send a message to your friend Ana about dinner tonight.',
  scenarios: [
    {
      kind: 'bad',
      component: BadScenario,
      narratorBefore:
        'Try to send Ana a message. Click the Send button when you\'re ready.',
      narratorAfter:
        'Did you notice anything strange? After clicking Send, the interface gave you zero feedback. No spinner, no progress, no confirmation. You had no idea if the message was sent or lost.',
    },
    {
      kind: 'good',
      component: GoodScenario,
      narratorBefore:
        'Now try the same task — send Ana a message. See how this version handles it.',
      narratorAfter:
        'Much better! This version showed a progress bar, a "Sending…" status, and a final "✅ Message delivered" confirmation. You always knew exactly what the system was doing.',
    },
  ],
  revealText:
    'Heuristic #1 is Visibility of System Status. Good design always tells users what is happening — loading states, progress indicators, and confirmations are not optional extras, they are essential communication.',
};
