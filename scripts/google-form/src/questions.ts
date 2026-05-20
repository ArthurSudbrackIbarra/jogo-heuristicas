/**
 * Question bank for the post-game feedback form.
 *
 * Per the research advisor's guidance, the form is Portuguese-only and uses
 * a small set of multiple-choice demographic questions plus a handful of
 * open-ended (paragraph) questions. Likert / agreement scales were removed
 * because the expected sample size is too small for them to be meaningful
 * and they discourage qualitative depth.
 *
 * Codes (rendered as a `[CODE]` prefix in each question title — useful for
 * spotting questions in the response spreadsheet):
 *   D# = Demographics (multiple choice)
 *   T# = Open text (paragraph)
 *   C# = Consent
 */

export interface ChoiceItem {
  type: "choice";
  code: string;
  prompt: string;
  options: string[];
  required: boolean;
  /** When true, renders as a CHECKBOX (multi-select) instead of a RADIO. */
  multiple?: boolean;
  description?: string;
}

export interface TextItem {
  type: "text";
  code: string;
  prompt: string;
  required: boolean;
  paragraph: boolean;
  description?: string;
}

export interface SectionBreak {
  type: "section";
  title: string;
  description?: string;
}

export type FormItem = ChoiceItem | TextItem | SectionBreak;

// ─── Form-level metadata ─────────────────────────────────────────────────────

export const formMeta = {
  title: "Jogo das Heurísticas de Nielsen — Pesquisa Pós-Jogo",
  description:
    "Obrigado por jogar! Esta breve pesquisa nos ajuda a entender como o jogo afetou seu aprendizado das heurísticas de Nielsen e sua experiência geral. As respostas serão utilizadas em um artigo científico sobre o ensino de Avaliação em IHC. Antes de responder, por favor leia o Termo de Consentimento Livre e Esclarecido abaixo.",
};

// ─── Question bank (in display order) ────────────────────────────────────────

export const questions: FormItem[] = [
  // ───── Consent (same page as TCLE text) ──────────────────────────────────
  {
    type: "choice",
    code: "C1",
    required: true,
    multiple: true,
    prompt: "Confirmação de consentimento",
    description:
      "Marque a opção abaixo para confirmar que leu o Termo de Consentimento Livre e Esclarecido (TCLE) acima e deseja participar. Caso não concorde, por favor não envie o formulário.",
    options: [
      "Diante do exposto expresso minha concordância de espontânea vontade em participar deste estudo, autorizando o uso, compartilhamento e publicação dos meus dados e informações de natureza pessoal para essa finalidade específica.",
    ],
  },

  // ───── Demographics ──────────────────────────────────────────────────────
  {
    type: "section",
    title: "Sobre você",
    description:
      "Algumas perguntas rápidas para nos ajudar a interpretar suas respostas em conjunto. Nenhuma informação pessoal identificável é coletada.",
  },
  {
    type: "choice",
    code: "D1",
    required: true,
    prompt: "Qual opção melhor descreve seu papel atual?",
    options: [
      "Estudante de graduação",
      "Estudante de mestrado",
      "Estudante de doutorado",
      "Professor(a) / pesquisador(a)",
      "Profissional do mercado (designer, desenvolvedor(a), etc.)",
      "Outro",
    ],
  },
  {
    type: "choice",
    code: "D2",
    required: true,
    prompt: "Qual a sua faixa etária?",
    options: [
      "Menos de 18 anos",
      "18 a 24 anos",
      "25 a 34 anos",
      "35 a 44 anos",
      "45 a 54 anos",
      "55 anos ou mais",
    ],
  },
  {
    type: "choice",
    code: "D3",
    required: true,
    prompt: "Qual a sua área principal de estudo ou atuação?",
    options: [
      "Ciência da Computação / Engenharia de Software",
      "Sistemas de Informação",
      "Design / UX",
      "Educação",
      "Outra área de tecnologia",
      "Outra área (fora da tecnologia)",
    ],
  },
  {
    type: "choice",
    code: "D4",
    required: true,
    prompt:
      "Antes de jogar, qual era a sua familiaridade com as heurísticas de Nielsen?",
    options: [
      "Nunca tinha ouvido falar",
      "Já tinha ouvido falar, mas não conhecia o conteúdo",
      "Conhecia superficialmente",
      "Conhecia bem",
      "Já havia usado em projetos ou avaliações",
    ],
  },
  {
    type: "choice",
    code: "D5",
    required: true,
    prompt:
      "Quanta experiência prática você tem com avaliação de IHC / usabilidade?",
    options: [
      "Nenhuma",
      "Pouca (apenas em disciplinas)",
      "Alguma (alguns projetos acadêmicos)",
      "Bastante (prática profissional ou de pesquisa regular)",
    ],
  },

  // ───── Open-ended questions ──────────────────────────────────────────────
  {
    type: "section",
    title: "Sobre o jogo",
    description:
      "Responda com suas próprias palavras. Não há respostas certas ou erradas — queremos entender a sua experiência.",
  },
  {
    type: "text",
    code: "T1",
    required: true,
    paragraph: true,
    prompt: "Você gostou de jogar o jogo? Justifique a sua resposta.",
  },
  {
    type: "text",
    code: "T2",
    required: true,
    paragraph: true,
    prompt:
      "De que maneira o jogo apoiou a sua compreensão das heurísticas de Nielsen? Quais aspectos do jogo (cenários, explicações, exemplos práticos, etc.) mais contribuíram para o seu aprendizado, em comparação à forma tradicional de estudá-las (lendo a definição de cada uma por conta própria)?",
  },
  {
    type: "text",
    code: "T3",
    required: true,
    paragraph: true,
    prompt:
      'Como a gamificação (coleta de estrelas, barra de progresso e tela final de "Especialista em Heurísticas") e a narração afetaram a sua experiência e o seu aprendizado? Elas ajudaram a manter o foco, motivaram, atrapalharam ou não fizeram diferença?',
  },
  {
    type: "text",
    code: "T4",
    required: true,
    paragraph: true,
    prompt:
      "Você identificou pontos negativos no jogo? Quais? Como o jogo poderia ser aperfeiçoado?",
  },
  {
    type: "text",
    code: "T5",
    required: false,
    paragraph: true,
    prompt: "Gostaria de deixar algum comentário ou sugestão geral?",
  },
];
