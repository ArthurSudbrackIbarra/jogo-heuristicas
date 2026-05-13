import type { HeuristicConfig } from '../../types/game';
import { BadScenario } from './BadScenario';
import { GoodScenario } from './GoodScenario';

export const h09: HeuristicConfig = {
  id: 9,
  name: {
    en: 'Help Users Recognize, Diagnose, and Recover from Errors',
    pt: 'Ajude os Usuários a Reconhecer, Diagnosticar e Recuperar de Erros',
  },
  tagline: {
    en: 'Error messages should express the problem in plain language and suggest a solution.',
    pt: 'As mensagens de erro devem expressar o problema em linguagem simples e sugerir uma solução.',
  },
  description: {
    en: 'Error messages should be expressed in plain language (no codes), precisely indicate the problem, and constructively suggest a solution. Users should never be left wondering what went wrong or what to do next.',
    pt: 'As mensagens de erro devem ser expressas em linguagem simples (sem códigos), indicar precisamente o problema e sugerir construtivamente uma solução. Os usuários nunca devem ficar sem saber o que deu errado ou o que fazer a seguir.',
  },
  goal: {
    en: 'Fix the form errors and complete your registration.',
    pt: 'Corrija os erros do formulário e conclua seu cadastro.',
  },
  scenarios: [
    {
      kind: 'bad',
      component: BadScenario,
      narratorBefore: {
        en: 'Fill in the form and try to register. The email has a problem — see if you can fix it.',
        pt: 'Preencha o formulário e tente se cadastrar. O e-mail tem um problema — veja se você consegue corrigir.',
      },
      narratorAfter: {
        en: '"Error 422: Unprocessable Entity" tells you nothing actionable. What field is wrong? What rule did it break? How do you fix it? The user is stuck without a map.',
        pt: '"Erro 422: Entidade não processável" não diz nada acionável. Qual campo está errado? Qual regra foi violada? Como você corrige? O usuário fica preso sem um mapa.',
      },
    },
    {
      kind: 'good',
      component: GoodScenario,
      narratorBefore: {
        en: 'Same form, same error — but now try to fix it and register successfully.',
        pt: 'Mesmo formulário, mesmo erro — mas agora tente corrigi-lo e cadastrar-se com sucesso.',
      },
      narratorAfter: {
        en: "The inline error highlighted the exact field, explained the specific problem (\"needs @domain format\"), and let you fix and resubmit immediately. That's a recoverable error experience.",
        pt: 'O erro inline destacou o campo exato, explicou o problema específico ("precisa do formato @domínio") e permitiu que você corrigisse e reenviasse imediatamente. Isso é uma experiência de erro recuperável.',
      },
    },
  ],
  revealText: {
    en: 'Heuristic #9 is Help Users Recognize, Diagnose, and Recover from Errors. Error messages must be human-readable, field-specific, and solution-oriented. "Error 422" is useless; "Email must include @domain.com" is helpful. Give users a path forward, not a dead end.',
    pt: 'A Heurística #9 é Ajudar os Usuários a Reconhecer, Diagnosticar e Recuperar de Erros. As mensagens de erro devem ser legíveis por humanos, específicas para o campo e orientadas para a solução. "Erro 422" é inútil; "O e-mail deve incluir @dominio.com" é útil. Dê aos usuários um caminho a seguir, não um beco sem saída.',
  },
};
