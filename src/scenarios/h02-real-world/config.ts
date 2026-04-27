import type { HeuristicConfig } from '../../types/game';
import { BadScenario } from './BadScenario';
import { GoodScenario } from './GoodScenario';

export const h02: HeuristicConfig = {
  id: 2,
  name: 'Match Between System and the Real World',
  tagline: 'Speak the users\' language, not the computer\'s.',
  description:
    'The system should speak the users\' language, with words, phrases and concepts familiar to the user, rather than system-oriented terms. Follow real-world conventions, making information appear in a natural and logical order.',
  goal: 'Save your document before closing.',
  scenarios: [
    {
      kind: 'bad',
      component: BadScenario,
      narratorBefore:
        'You need to save your document. Find the right option in the menu below.',
      narratorAfter:
        'Frustrating, right? "Serialize & commit to persistent storage layer" means Save. "Discard volatile in-memory state" means Cancel. Technical jargon creates a wall between the user and the system.',
    },
    {
      kind: 'good',
      component: GoodScenario,
      narratorBefore:
        'Same task — save the document. Notice how the language has changed.',
      narratorAfter:
        'Instantly clear! "💾 Save", "☁️ Save to Cloud", "✕ Discard changes" — these match how people think about documents in the real world. No translation needed.',
    },
  ],
  revealText:
    'Heuristic #2 is Match Between System and the Real World. Interfaces should use the vocabulary, metaphors, and logic of the user\'s domain — not internal system terminology. When users understand the language, they feel confident and make fewer mistakes.',
};
