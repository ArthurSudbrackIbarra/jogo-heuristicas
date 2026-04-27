import type { HeuristicConfig } from '../../types/game';
import { BadScenario } from './BadScenario';
import { GoodScenario } from './GoodScenario';

export const h06: HeuristicConfig = {
  id: 6,
  name: 'Recognition Rather Than Recall',
  tagline: 'Minimize the user\'s memory load by making elements visible.',
  description:
    'Minimize the user\'s memory load by making objects, actions, and options visible. The user should not have to remember information from one part of the interface to another. Instructions should be visible or easily retrievable whenever appropriate.',
  goal: 'Make the text in the editor bold.',
  scenarios: [
    {
      kind: 'bad',
      component: BadScenario,
      narratorBefore:
        'Try to make the text bold. There\'s a command for it, but you\'ll have to figure it out yourself.',
      narratorAfter:
        'The system required you to recall a specific command from memory. If you didn\'t know "/bold", you were stuck. Users shouldn\'t have to memorize invisible options.',
    },
    {
      kind: 'good',
      component: GoodScenario,
      narratorBefore:
        'Make the text bold again — see how the interface changes.',
      narratorAfter:
        'The formatting options are visible in the toolbar. You recognized what to click instead of recalling a hidden command. No memorization, no guessing.',
    },
  ],
  revealText:
    'Heuristic #6 is Recognition Rather Than Recall. Visible options, menus, and labels reduce cognitive load. Users should never have to remember what to type or which command to use — they should be able to recognize the right action when they see it.',
};
