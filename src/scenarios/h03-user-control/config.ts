import type { HeuristicConfig } from "../../types/game";
import { BadScenario } from "./BadScenario";
import { GoodScenario } from "./GoodScenario";

export const h03: HeuristicConfig = {
  id: 3,
  name: {
    en: "User Control and Freedom",
    pt: "Controle e Liberdade do Usuário",
  },
  tagline: {
    en: "Always provide a clearly marked emergency exit.",
    pt: "Sempre forneça uma saída de emergência claramente marcada.",
  },
  description: {
    en: 'Users often choose system functions by mistake and need a clearly marked "emergency exit" to leave the unwanted state without having to go through an extended dialogue. Support undo and redo.',
    pt: 'Os usuários frequentemente escolhem funções do sistema por engano e precisam de uma "saída de emergência" claramente marcada para sair do estado indesejado sem ter que passar por um diálogo extenso. Suporte a desfazer e refazer.',
  },
  goal: {
    en: "You accidentally opened a plan upgrade wizard. Try to exit it without completing the upgrade.",
    pt: "Você abriu um assistente de upgrade de plano sem querer. Tente sair sem concluir o upgrade.",
  },
  scenarios: [
    {
      kind: "bad",
      component: BadScenario,
      narratorBefore: {
        en: 'You\'re on an account settings page. Click "Upgrade Plan" — pretend it was accidental. Now try to get out of the wizard.',
        pt: 'Você está na página de configurações da conta. Clique em "Fazer Upgrade" — finja que foi acidental. Agora tente sair do assistente.',
      },
      audioBefore: { pt: "audios/pt/H3BBPT.mp3" },
      narratorAfter: {
        en: "There was no way out. No Cancel button, no ✕ to close the modal, no Back on the first step. You were forced to finish the upgrade — or give up entirely. That's a user trapped with no emergency exit.",
        pt: "Não havia saída. Sem botão Cancelar, sem ✕ para fechar o modal, sem Voltar na primeira etapa. Você foi forçado a concluir o upgrade ou desistir completamente. Isso é um usuário preso sem saída de emergência.",
      },
      audioAfter: { pt: "audios/pt/H3BAPT.mp3" },
    },
    {
      kind: "good",
      component: GoodScenario,
      narratorBefore: {
        en: 'Same scenario — click "Upgrade Plan" as if by accident. Now find a way to exit without upgrading.',
        pt: 'Mesmo cenário — clique em "Fazer Upgrade" como se fosse acidental. Agora encontre uma forma de sair sem fazer o upgrade.',
      },
      audioBefore: { pt: "audios/pt/H3GBPT.mp3" },
      narratorAfter: {
        en: "A ✕ button, a Cancel link on every step, and a confirmation dialog before exiting — three layers of clearly marked emergency exits. At any point, the user can leave freely. This is user control and freedom in action.",
        pt: "Um botão ✕, um link Cancelar em cada etapa e uma caixa de diálogo de confirmação antes de sair — três camadas de saídas de emergência claramente marcadas. A qualquer momento, o usuário pode sair livremente. Isso é controle e liberdade do usuário em ação.",
      },
      audioAfter: { pt: "audios/pt/H3GAPT.mp3" },
    },
  ],
  revealText: {
    en: "Heuristic #3 is User Control and Freedom. Every process should have a visible, labeled exit — a Cancel button, a close ✕, or a Back option. Without them, users feel trapped and lose trust in the product.",
    pt: "A Heurística #3 é o Controle e Liberdade do Usuário. Todo processo deve ter uma saída visível e identificada — um botão Cancelar, um ✕ para fechar ou uma opção Voltar. Sem elas, os usuários se sentem presos e perdem a confiança no produto.",
  },
};
