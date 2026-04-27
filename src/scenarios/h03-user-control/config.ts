import type { HeuristicConfig } from '../../types/game';
import { BadScenario } from './BadScenario';
import { GoodScenario } from './GoodScenario';

export const h03: HeuristicConfig = {
  id: 3,
  name: 'User Control and Freedom',
  tagline: 'Always provide a clearly marked emergency exit.',
  description:
    'Users often choose system functions by mistake and need a clearly marked "emergency exit" to leave the unwanted state without having to go through an extended dialogue. Support undo and redo.',
  goal: 'You accidentally deleted an important email. Try to get it back.',
  scenarios: [
    {
      kind: 'bad',
      component: BadScenario,
      narratorBefore:
        'Click the delete button on the email — pretend it was accidental. Then try to recover it.',
      narratorAfter:
        'There was no way back. No undo, no trash folder, no warning before deletion. Once gone, it\'s gone. The user is trapped with no emergency exit.',
    },
    {
      kind: 'good',
      component: GoodScenario,
      narratorBefore:
        'Delete the email again — but watch what happens this time.',
      narratorAfter:
        'A timed "Undo" toast appeared immediately after the action. The user has a brief window to reverse the mistake. This is the emergency exit that every destructive action needs.',
    },
  ],
  revealText:
    'Heuristic #3 is User Control and Freedom. Every destructive action should have an escape hatch — undo, cancel, go back. Users make mistakes; the system should make recovering from them easy, not punishing.',
};
