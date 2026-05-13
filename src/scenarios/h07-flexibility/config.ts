import type { HeuristicConfig } from '../../types/game';
import { BadScenario } from './BadScenario';
import { GoodScenario } from './GoodScenario';

export const h07: HeuristicConfig = {
  id: 7,
  name: {
    en: 'Flexibility and Efficiency of Use',
    pt: 'Flexibilidade e Eficiência de Uso',
  },
  tagline: {
    en: 'Accelerators — unseen by the novice — let experts speed up interaction.',
    pt: 'Aceleradores — invisíveis para o novato — permitem que especialistas agilizem a interação.',
  },
  description: {
    en: 'Accelerators — unseen by the novice user — may often speed up the interaction for the expert user such that the system can cater to both inexperienced and experienced users. Allow users to tailor frequent actions.',
    pt: 'Aceleradores — invisíveis para o usuário novato — podem frequentemente agilizar a interação para o usuário experiente, de modo que o sistema possa atender tanto usuários inexperientes quanto experientes. Permita que os usuários personalizem ações frequentes.',
  },
  goal: {
    en: 'Mark all 3 unread notifications as read.',
    pt: 'Marque as 3 notificações não lidas como lidas.',
  },
  scenarios: [
    {
      kind: 'bad',
      component: BadScenario,
      narratorBefore: {
        en: 'You have 3 unread notifications. Mark all of them as read.',
        pt: 'Você tem 3 notificações não lidas. Marque todas como lidas.',
      },
      narratorAfter: {
        en: "You had to open each notification individually and mark it as read — multiple clicks per notification. Imagine having 50. There's no shortcut, no bulk action. Efficiency is zero for power users.",
        pt: 'Você teve que abrir cada notificação individualmente e marcá-la como lida — vários cliques por notificação. Imagine ter 50. Não há atalho, nenhuma ação em lote. A eficiência é zero para usuários avançados.',
      },
    },
    {
      kind: 'good',
      component: GoodScenario,
      narratorBefore: {
        en: 'Same task — 3 notifications to mark as read. Notice any shortcuts?',
        pt: 'Mesma tarefa — 3 notificações para marcar como lidas. Notou algum atalho?',
      },
      narratorAfter: {
        en: 'One click — "Mark all as read" — handles everything instantly. Individual dismiss still works for granular control. Both novices and power users are served efficiently.',
        pt: 'Um clique — "Marcar todas como lidas" — resolve tudo instantaneamente. A opção de dispensar individualmente ainda funciona para controle granular. Tanto iniciantes quanto usuários avançados são atendidos de forma eficiente.',
      },
    },
  ],
  revealText: {
    en: 'Heuristic #7 is Flexibility and Efficiency of Use. Designs should serve both beginners (clear individual steps) and experts (bulk actions, shortcuts, keyboard commands). Power users should never be forced to do manually what could be automated.',
    pt: 'A Heurística #7 é Flexibilidade e Eficiência de Uso. Os designs devem atender tanto iniciantes (etapas individuais claras) quanto especialistas (ações em lote, atalhos, comandos de teclado). Usuários avançados nunca devem ser forçados a fazer manualmente o que poderia ser automatizado.',
  },
};
