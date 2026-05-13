import type { HeuristicConfig } from '../../types/game';
import { BadScenario } from './BadScenario';
import { GoodScenario } from './GoodScenario';

export const h01: HeuristicConfig = {
  id: 1,
  name: {
    en: 'Visibility of System Status',
    pt: 'Visibilidade do Status do Sistema',
  },
  tagline: {
    en: 'Always keep users informed about what is going on.',
    pt: 'Mantenha sempre os usuários informados sobre o que está acontecendo.',
  },
  description: {
    en: 'The system should always keep users informed about what is going on, through appropriate feedback within a reasonable time. Users should never have to wonder whether their action was registered or if something is happening in the background.',
    pt: 'O sistema deve sempre manter os usuários informados sobre o que está acontecendo, por meio de feedback adequado em um tempo razoável. Os usuários nunca devem se perguntar se sua ação foi registrada ou se algo está acontecendo em segundo plano.',
  },
  goal: {
    en: 'Send a message to your friend Ana about dinner tonight.',
    pt: 'Envie uma mensagem para sua amiga Ana sobre o jantar de hoje à noite.',
  },
  scenarios: [
    {
      kind: 'bad',
      component: BadScenario,
      narratorBefore: {
        en: "Try to send Ana a message. Click the Send button when you're ready.",
        pt: 'Tente enviar uma mensagem para a Ana. Clique no botão Enviar quando estiver pronto.',
      },
      narratorAfter: {
        en: 'Did you notice anything strange? After clicking Send, the interface gave you zero feedback. No spinner, no progress, no confirmation. You had no idea if the message was sent or lost.',
        pt: 'Notou algo estranho? Após clicar em Enviar, a interface não deu nenhum retorno. Sem carregamento, sem progresso, sem confirmação. Você não tinha como saber se a mensagem foi enviada ou perdida.',
      }, 
    },
    {
      kind: 'good',
      component: GoodScenario,
      narratorBefore: {
        en: 'Now try the same task — send Ana a message. See how this version handles it.',
        pt: 'Agora tente a mesma tarefa — envie uma mensagem para a Ana. Veja como esta versão lida com isso.',
      },
      narratorAfter: {
        en: 'Much better! This version showed a progress bar, a "Sending…" status, and a final "✅ Message delivered" confirmation. You always knew exactly what the system was doing.',
        pt: 'Muito melhor! Esta versão exibiu uma barra de progresso, um status "Enviando…" e uma confirmação final "✅ Mensagem entregue". Você sempre soube exatamente o que o sistema estava fazendo.',
      },
    },
  ],
  revealText: {
    en: 'Heuristic #1 is Visibility of System Status. Good design always tells users what is happening — loading states, progress indicators, and confirmations are not optional extras, they are essential communication.',
    pt: 'A Heurística #1 é a Visibilidade do Status do Sistema. Um bom design sempre informa os usuários o que está acontecendo — estados de carregamento, indicadores de progresso e confirmações não são extras opcionais, são comunicação essencial.',
  },
};
