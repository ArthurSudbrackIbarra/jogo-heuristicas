import type { HeuristicConfig } from '../../types/game';
import { BadScenario } from './BadScenario';
import { GoodScenario } from './GoodScenario';

export const h08: HeuristicConfig = {
  id: 8,
  name: 'Aesthetic and Minimalist Design',
  tagline: 'Every extra unit of information competes with relevant information.',
  description:
    'Dialogues should not contain irrelevant or rarely needed information. Every extra unit of information in a dialogue competes with the relevant units of information and diminishes their relative visibility.',
  goal: 'Find and click the "Buy Now" button for the Laptop XZ Pro.',
  scenarios: [
    {
      kind: 'bad',
      component: BadScenario,
      narratorBefore:
        'You want to buy a laptop. Find the "Buy Now" button on this page.',
      narratorAfter:
        'Popups, banners, newsletter forms, recommendation carousels — all competing for your attention. The actual purpose of the page — buying the product — was buried. Every distraction is a design failure.',
    },
    {
      kind: 'good',
      component: GoodScenario,
      narratorBefore:
        'Same product, same goal. Find and click "Buy Now".',
      narratorAfter:
        'Instantly obvious. Product info, price, and a single clear call-to-action. No noise, no distractions. The design serves one goal — helping you buy the laptop — and does only that.',
    },
  ],
  revealText:
    'Heuristic #8 is Aesthetic and Minimalist Design. Every element on a page competes for attention. Irrelevant information doesn\'t just fail to help — it actively harms by diluting the signal-to-noise ratio. Remove the unnecessary to highlight the essential.',
};
