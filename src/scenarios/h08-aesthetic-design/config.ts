import type { HeuristicConfig } from '../../types/game';
import { BadScenario } from './BadScenario';
import { GoodScenario } from './GoodScenario';

export const h08: HeuristicConfig = {
  id: 8,
  name: {
    en: 'Aesthetic and Minimalist Design',
    pt: 'Design Estético e Minimalista',
  },
  tagline: {
    en: 'Every extra unit of information competes with relevant information.',
    pt: 'Cada unidade extra de informação compete com as informações relevantes.',
  },
  description: {
    en: 'Dialogues should not contain irrelevant or rarely needed information. Every extra unit of information in a dialogue competes with the relevant units of information and diminishes their relative visibility.',
    pt: 'Os diálogos não devem conter informações irrelevantes ou raramente necessárias. Cada unidade extra de informação em um diálogo compete com as unidades relevantes e diminui sua visibilidade relativa.',
  },
  goal: {
    en: 'Find and click the "Buy Now" button for the Laptop XZ Pro.',
    pt: 'Encontre e clique no botão "Comprar Agora" do Laptop XZ Pro.',
  },
  scenarios: [
    {
      kind: 'bad',
      component: BadScenario,
      narratorBefore: {
        en: 'You want to buy a laptop. Find the "Buy Now" button on this page.',
        pt: 'Você quer comprar um laptop. Encontre o botão "Comprar Agora" nesta página.',
      },
      narratorAfter: {
        en: 'Popups, banners, newsletter forms, recommendation carousels — all competing for your attention. The actual purpose of the page — buying the product — was buried. Every distraction is a design failure.',
        pt: 'Pop-ups, banners, formulários de newsletter, carrosséis de recomendações — tudo competindo pela sua atenção. O objetivo real da página — comprar o produto — estava enterrado. Cada distração é uma falha de design.',
      },
    },
    {
      kind: 'good',
      component: GoodScenario,
      narratorBefore: {
        en: 'Same product, same goal. Find and click "Buy Now".',
        pt: 'Mesmo produto, mesmo objetivo. Encontre e clique em "Comprar Agora".',
      },
      narratorAfter: {
        en: 'Instantly obvious. Product info, price, and a single clear call-to-action. No noise, no distractions. The design serves one goal — helping you buy the laptop — and does only that.',
        pt: 'Imediatamente óbvio. Informações do produto, preço e uma única chamada para ação clara. Sem ruído, sem distrações. O design serve a um objetivo — ajudá-lo a comprar o laptop — e faz apenas isso.',
      },
    },
  ],
  revealText: {
    en: "Heuristic #8 is Aesthetic and Minimalist Design. Every element on a page competes for attention. Irrelevant information doesn't just fail to help — it actively harms by diluting the signal-to-noise ratio. Remove the unnecessary to highlight the essential.",
    pt: 'A Heurística #8 é Design Estético e Minimalista. Cada elemento em uma página compete por atenção. Informações irrelevantes não apenas deixam de ajudar — elas prejudicam ativamente ao diluir a relação sinal-ruído. Remova o desnecessário para destacar o essencial.',
  },
};
