import type { HeuristicConfig } from '../../types/game';
import { BadScenario } from './BadScenario';
import { GoodScenario } from './GoodScenario';

export const h10: HeuristicConfig = {
  id: 10,
  name: {
    en: 'Help and Documentation',
    pt: 'Ajuda e Documentação',
  },
  tagline: {
    en: 'Even though it is better if the system can be used without documentation...',
    pt: 'Embora seja melhor se o sistema puder ser usado sem documentação...',
  },
  description: {
    en: "Even though it is better if the system can be used without documentation, it may be necessary to provide help and documentation. Any such information should be easy to search, focused on the user's task, list concrete steps to be carried out, and not be too large.",
    pt: 'Embora seja melhor se o sistema puder ser usado sem documentação, pode ser necessário fornecer ajuda e documentação. Qualquer informação desse tipo deve ser fácil de pesquisar, focada na tarefa do usuário, listar etapas concretas a serem realizadas e não ser muito extensa.',
  },
  goal: {
    en: 'Enable Two-Factor Authentication (2FA) in Security Settings.',
    pt: 'Ative a Autenticação de Dois Fatores (2FA) nas Configurações de Segurança.',
  },
  scenarios: [
    {
      kind: 'bad',
      component: BadScenario,
      narratorBefore: {
        en: 'Enable Two-Factor Authentication on this settings page.',
        pt: 'Ative a Autenticação de Dois Fatores nesta página de configurações.',
      },
      narratorAfter: {
        en: '"2FA", "TOTP", "FIDO2" — what do these mean? The page offers no explanations, no tooltips, no "Learn more" links. Unfamiliar users are left guessing what each option does and which to choose.',
        pt: '"2FA", "TOTP", "FIDO2" — o que esses termos significam? A página não oferece explicações, dicas de ferramentas, nem links de "Saiba mais". Usuários não familiarizados ficam adivinhando o que cada opção faz e qual escolher.',
      },
    },
    {
      kind: 'good',
      component: GoodScenario,
      narratorBefore: {
        en: 'Enable 2FA again — notice how much clearer this version is.',
        pt: 'Ative o 2FA novamente — observe o quanto esta versão é mais clara.',
      },
      narratorAfter: {
        en: 'Each option has a clear name, a plain-language description, and an info tooltip with extra context. The recommended option is labeled. Users can make informed decisions without leaving the page.',
        pt: 'Cada opção tem um nome claro, uma descrição em linguagem simples e uma dica de informação com contexto adicional. A opção recomendada está indicada. Os usuários podem tomar decisões informadas sem sair da página.',
      },
    },
  ],
  revealText: {
    en: 'Heuristic #10 is Help and Documentation. Well-designed systems are self-explanatory — but when complexity is unavoidable, inline help (descriptions, tooltips, "Learn more" links) removes friction without requiring users to consult external documentation.',
    pt: 'A Heurística #10 é Ajuda e Documentação. Sistemas bem projetados são autoexplicativos — mas quando a complexidade é inevitável, a ajuda inline (descrições, dicas de ferramentas, links de "Saiba mais") remove o atrito sem exigir que os usuários consultem documentação externa.',
  },
};
