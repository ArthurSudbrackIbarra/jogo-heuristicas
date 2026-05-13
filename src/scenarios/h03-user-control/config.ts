import type { HeuristicConfig } from '../../types/game';
import { BadScenario } from './BadScenario';
import { GoodScenario } from './GoodScenario';

export const h03: HeuristicConfig = {
  id: 3,
  name: {
    en: 'User Control and Freedom',
    pt: 'Controle e Liberdade do Usuário',
  },
  tagline: {
    en: 'Always provide a clearly marked emergency exit.',
    pt: 'Sempre forneça uma saída de emergência claramente marcada.',
  },
  description: {
    en: 'Users often choose system functions by mistake and need a clearly marked "emergency exit" to leave the unwanted state without having to go through an extended dialogue. Support undo and redo.',
    pt: 'Os usuários frequentemente escolhem funções do sistema por engano e precisam de uma "saída de emergência" claramente marcada para sair do estado indesejado sem ter que passar por um diálogo extenso. Suporte a desfazer e refazer.',
  },
  goal: {
    en: 'You accidentally deleted an important email. Try to get it back.',
    pt: 'Você apagou acidentalmente um e-mail importante. Tente recuperá-lo.',
  },
  scenarios: [
    {
      kind: 'bad',
      component: BadScenario,
      narratorBefore: {
        en: 'Click the delete button on the email — pretend it was accidental. Then try to recover it.',
        pt: 'Clique no botão de excluir do e-mail — finja que foi acidental. Depois tente recuperá-lo.',
      },
      narratorAfter: {
        en: "There was no way back. No undo, no trash folder, no warning before deletion. Once gone, it's gone. The user is trapped with no emergency exit.",
        pt: 'Não havia como voltar. Sem desfazer, sem lixeira, sem aviso antes de excluir. Uma vez apagado, não volta. O usuário fica preso sem saída de emergência.',
      },
    },
    {
      kind: 'good',
      component: GoodScenario,
      narratorBefore: {
        en: 'Delete the email again — but watch what happens this time.',
        pt: 'Exclua o e-mail novamente — mas observe o que acontece desta vez.',
      },
      narratorAfter: {
        en: 'A timed "Undo" toast appeared immediately after the action. The user has a 10-second window to reverse the mistake. This is the emergency exit that every destructive action needs.',
        pt: 'Uma notificação de "Desfazer" com temporizador apareceu imediatamente após a ação. O usuário tem uma janela de 10 segundos para reverter o erro. Esta é a saída de emergência que toda ação destrutiva precisa.',
      },
    },
  ],
  revealText: {
    en: 'Heuristic #3 is User Control and Freedom. Every destructive action should have an escape hatch — undo, cancel, go back. Users make mistakes; the system should make recovering from them easy, not punishing.',
    pt: 'A Heurística #3 é o Controle e Liberdade do Usuário. Toda ação destrutiva deve ter uma válvula de escape — desfazer, cancelar, voltar. Os usuários cometem erros; o sistema deve tornar a recuperação fácil, não punitiva.',
  },
};
