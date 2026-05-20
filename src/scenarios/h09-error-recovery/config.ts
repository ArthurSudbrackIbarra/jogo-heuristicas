import type { HeuristicConfig } from "../../types/game";
import { BadScenario } from "./BadScenario";
import { GoodScenario } from "./GoodScenario";

export const h09: HeuristicConfig = {
  id: 9,
  name: {
    en: "Help Users Recognize, Diagnose, and Recover from Errors",
    pt: "Ajude os Usuários a Reconhecer, Diagnosticar e Recuperar de Erros",
  },
  tagline: {
    en: "Error messages should express the problem in plain language and suggest a solution.",
    pt: "As mensagens de erro devem expressar o problema em linguagem simples e sugerir uma solução.",
  },
  description: {
    en: "Error messages should be expressed in plain language (no codes), precisely indicate the problem, and constructively suggest a solution. Users should never be left wondering what went wrong or what to do next.",
    pt: "As mensagens de erro devem ser expressas em linguagem simples (sem códigos), indicar precisamente o problema e sugerir construtivamente uma solução. Os usuários nunca devem ficar sem saber o que deu errado ou o que fazer a seguir.",
  },
  goal: {
    en: "Fix the form error and complete your registration.",
    pt: "Corrija o erro do formulário e conclua seu cadastro.",
  },
  scenarios: [
    {
      kind: "bad",
      component: BadScenario,
      narratorBefore: {
        en: "Fill in the form and try to register. Something's wrong — see if you can figure out what.",
        pt: "Preencha o formulário e tente se cadastrar. Algo está errado — veja se você consegue descobrir o que é.",
      },
      audioBefore: { pt: "audios/pt/H9BBPT.mp3", en: "audios/en/H9BBEN.mp3" },
      narratorAfter: {
        en: '"Error 422: Unprocessable Entity" tells you nothing actionable. Which field is wrong? What rule did it break? How do you fix it? The user is stuck without a map.',
        pt: '"Erro 422: Entidade não processável" não diz nada acionável. Qual campo está errado? Qual regra foi violada? Como você corrige? O usuário fica preso sem um mapa.',
      },
      audioAfter: { pt: "audios/pt/H9BAPT.mp3", en: "audios/en/H9BAEN.mp3" },
    },
    {
      kind: "good",
      component: GoodScenario,
      narratorBefore: {
        en: "Same form — try to figure out what is wrong and register successfully.",
        pt: "Mesmo formulário — tente descobrir o que está errado e cadastrar-se com sucesso.",
      },
      audioBefore: { pt: "audios/pt/H9GBPT.mp3", en: "audios/en/H9GBEN.mp3" },
      narratorAfter: {
        en: "The inline error highlighted the exact field and explained the specific problem: the password is too short. You knew exactly what to fix, fixed it, and resubmitted. That's a recoverable error experience.",
        pt: "O erro inline destacou o campo exato e explicou o problema específico: a senha é muito curta. Você soube exatamente o que corrigir, corrigiu e reenviou. Isso é uma experiência de erro recuperável.",
      },
      audioAfter: { pt: "audios/pt/H9GAPT.mp3", en: "audios/en/H9GAEN.mp3" },
    },
  ],
  revealText: {
    en: 'Heuristic #9 is Help Users Recognize, Diagnose, and Recover from Errors. Error messages must be human-readable, field-specific, and solution-oriented. "Error 422" is useless; "Password must be at least 8 characters" is helpful. Give users a path forward, not a dead end.',
    pt: 'A Heurística #9 é Ajudar os Usuários a Reconhecer, Diagnosticar e Recuperar de Erros. As mensagens de erro devem ser legíveis por humanos, específicas para o campo e orientadas para a solução. "Erro 422" é inútil; "A senha deve ter pelo menos 8 caracteres" é útil. Dê aos usuários um caminho a seguir, não um beco sem saída.',
  },
};
