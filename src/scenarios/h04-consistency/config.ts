import type { HeuristicConfig } from "../../types/game";
import { BadScenario } from "./BadScenario";
import { GoodScenario } from "./GoodScenario";

export const h04: HeuristicConfig = {
  id: 4,
  name: {
    en: "Consistency and Standards",
    pt: "Consistência e Padrões",
  },
  tagline: {
    en: "Users should not have to wonder if different words or actions mean the same thing.",
    pt: "Os usuários não devem se perguntar se palavras ou ações diferentes significam a mesma coisa.",
  },
  description: {
    en: "Users should not have to wonder whether different words, situations, or actions mean the same thing. Follow platform and industry conventions. Maintain visual and behavioral consistency throughout the product.",
    pt: "Os usuários não devem se perguntar se palavras, situações ou ações diferentes significam a mesma coisa. Siga as convenções da plataforma e do setor. Mantenha consistência visual e comportamental em todo o produto.",
  },
  goal: {
    en: "Navigate through all 4 steps of the checkout form.",
    pt: "Navegue por todas as 4 etapas do formulário de checkout.",
  },
  scenarios: [
    {
      kind: "bad",
      component: BadScenario,
      narratorBefore: {
        en: "Navigate through all four checkout steps. Pay attention to the buttons.",
        pt: "Navegue pelas quatro etapas do checkout. Preste atenção nos botões.",
      },
      narratorAfter: {
        en: 'Did the buttons confuse you? "Proceed", "Go on", "Continue", "Return", "Go Back", "Previous" — all meaning the same two actions but with different words and positions on every step. Exhausting!',
        pt: 'Os botões te confundiram? "Prosseguir", "Avançar", "Continuar", "Retornar", "Voltar", "Anterior" — todos com o mesmo significado, mas com palavras e posições diferentes em cada etapa. Exaustivo!',
      },
    },
    {
      kind: "good",
      component: GoodScenario,
      narratorBefore: {
        en: "Go through the same checkout — notice how the navigation feels now.",
        pt: "Percorra o mesmo checkout — observe como a navegação parece agora.",
      },
      narratorAfter: {
        en: '"← Back" and "Next →" on every step, always in the same position. Once you learn the pattern once, you can rely on it forever. Consistency builds confidence.',
        pt: '"← Voltar" e "Avançar →" em cada etapa, sempre na mesma posição. Uma vez que você aprende o padrão, pode contar com ele para sempre. Consistência constrói confiança.',
      },
    },
  ],
  revealText: {
    en: "Heuristic #4 is Consistency and Standards. Every element that behaves the same way should look and be named the same way. When patterns are consistent, users can build mental models and navigate confidently — without having to re-learn each screen.",
    pt: "A Heurística #4 é Consistência e Padrões. Todo elemento que se comporta da mesma forma deve ter aparência e nome iguais. Quando os padrões são consistentes, os usuários podem construir modelos mentais e navegar com confiança — sem precisar reaprender cada tela.",
  },
};
