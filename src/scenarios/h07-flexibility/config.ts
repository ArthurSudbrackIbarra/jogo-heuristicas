import type { HeuristicConfig } from '../../types/game';
import { BadScenario } from './BadScenario';
import { GoodScenario } from './GoodScenario';

export const h07: HeuristicConfig = {
  id: 7,
  name: 'Flexibility and Efficiency of Use',
  tagline: 'Accelerators — unseen by the novice — let experts speed up interaction.',
  description:
    'Accelerators — unseen by the novice user — may often speed up the interaction for the expert user such that the system can cater to both inexperienced and experienced users. Allow users to tailor frequent actions.',
  goal: 'Mark all 3 unread notifications as read.',
  scenarios: [
    {
      kind: 'bad',
      component: BadScenario,
      narratorBefore:
        'You have 3 unread notifications. Mark all of them as read.',
      narratorAfter:
        'You had to open and mark each one individually — 3 clicks for 3 notifications. Imagine having 50. There\'s no shortcut, no bulk action. Efficiency is zero for power users.',
    },
    {
      kind: 'good',
      component: GoodScenario,
      narratorBefore:
        'Same task — 3 notifications to mark as read. Notice any shortcuts?',
      narratorAfter:
        'One click — "Mark all as read" — handles everything instantly. Individual dismiss still works for granular control. Both novices and power users are served efficiently.',
    },
  ],
  revealText:
    'Heuristic #7 is Flexibility and Efficiency of Use. Designs should serve both beginners (clear individual steps) and experts (bulk actions, shortcuts, keyboard commands). Power users should never be forced to do manually what could be automated.',
};
