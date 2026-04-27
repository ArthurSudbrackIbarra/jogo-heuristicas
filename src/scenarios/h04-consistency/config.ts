import type { HeuristicConfig } from '../../types/game';
import { BadScenario } from './BadScenario';
import { GoodScenario } from './GoodScenario';

export const h04: HeuristicConfig = {
  id: 4,
  name: 'Consistency and Standards',
  tagline: 'Users should not have to wonder if different words or actions mean the same thing.',
  description:
    'Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform and industry conventions. Maintain visual and behavioral consistency throughout the product.',
  goal: 'Navigate through all 4 steps of the checkout form.',
  scenarios: [
    {
      kind: 'bad',
      component: BadScenario,
      narratorBefore:
        'Navigate through all four checkout steps. Pay attention to the buttons.',
      narratorAfter:
        'Did the buttons confuse you? "Proceed", "Go on", "Continue", "Return", "Go Back", "Previous" — all meaning the same two actions but with different words and positions on every step. Exhausting!',
    },
    {
      kind: 'good',
      component: GoodScenario,
      narratorBefore:
        'Go through the same checkout — notice how the navigation feels now.',
      narratorAfter:
        '"← Back" and "Next →" on every step, always in the same position. Once you learn the pattern once, you can rely on it forever. Consistency builds confidence.',
    },
  ],
  revealText:
    'Heuristic #4 is Consistency and Standards. Every element that behaves the same way should look and be named the same way. When patterns are consistent, users can build mental models and navigate confidently — without having to re-learn each screen.',
};
