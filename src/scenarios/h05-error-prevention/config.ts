import type { HeuristicConfig } from "../../types/game";
import { BadScenario } from "./BadScenario";
import { GoodScenario } from "./GoodScenario";

export const h05: HeuristicConfig = {
  id: 5,
  name: {
    en: "Error Prevention",
    pt: "Prevenção de Erros",
  },
  tagline: {
    en: "Design carefully to prevent problems from occurring in the first place.",
    pt: "Projete com cuidado para evitar que problemas ocorram logo de início.",
  },
  description: {
    en: "Even better than good error messages is a careful design which prevents a problem from occurring in the first place. Either eliminate error-prone conditions or check for them and present users with a confirmation option before they commit to the action.",
    pt: "Ainda melhor do que boas mensagens de erro é um design cuidadoso que evita que o problema ocorra em primeiro lugar. Elimine condições propensas a erros ou verifique-as e apresente aos usuários uma opção de confirmação antes de comprometer a ação.",
  },
  goal: {
    en: "Delete your account from the settings page.",
    pt: "Exclua sua conta na página de configurações.",
  },
  scenarios: [
    {
      kind: "bad",
      component: BadScenario,
      narratorBefore: {
        en: "Find and click the option to delete your account.",
        pt: "Encontre e clique na opção para excluir sua conta.",
      },
      audioBefore: { pt: "audios/pt/H5BBPT.mp3" },
      narratorAfter: {
        en: "One click and it's gone — no warning, no confirmation, no second chance. A single misclick permanently destroys an account. This is catastrophic error design.",
        pt: "Um clique e foi-se — sem aviso, sem confirmação, sem segunda chance. Um único clique equivocado destrói permanentemente uma conta. Este é um design catastrófico de erros.",
      },
      audioAfter: { pt: "audios/pt/H5BAPT.mp3" },
    },
    {
      kind: "good",
      component: GoodScenario,
      narratorBefore: {
        en: "Try to delete your account again — follow all the steps.",
        pt: "Tente excluir sua conta novamente — siga todas as etapas.",
      },
      audioBefore: { pt: "audios/pt/H5GBPT.mp3" },
      narratorAfter: {
        en: "Three layers of protection: a less prominent button, a clear warning dialog, a type-to-confirm field, and a checkbox acknowledging the consequences. Errors are prevented before they happen.",
        pt: "Três camadas de proteção: um botão menos proeminente, um diálogo de aviso claro, um campo de confirmação por digitação e uma caixa de seleção reconhecendo as consequências. Os erros são prevenidos antes de acontecerem.",
      },
      audioAfter: { pt: "audios/pt/H5GAPT.mp3" },
    },
  ],
  revealText: {
    en: "Heuristic #5 is Error Prevention. The best error message is the one that never has to appear. For high-stakes or irreversible actions, good design adds friction — confirmations, warnings, and type-to-confirm fields — to prevent accidental disasters.",
    pt: "A Heurística #5 é Prevenção de Erros. A melhor mensagem de erro é aquela que nunca precisa aparecer. Para ações de alto risco ou irreversíveis, um bom design adiciona atrito — confirmações, avisos e campos de confirmação por digitação — para evitar desastres acidentais.",
  },
};
