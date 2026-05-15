/**
 * Question bank for the post-game feedback form.
 *
 * Each question is defined ONCE with both Portuguese and English copy. The
 * form builder emits it into both language sections of the same Google Form
 * so responses can be aggregated across languages.
 *
 * Cross-language matching is enabled by the `code` field, which is rendered
 * as a `[CODE]` prefix in every question title. After exporting responses
 * (e.g. to Sheets/CSV), grouping columns by their `[CODE]` prefix merges the
 * PT and EN variants of the same question.
 *
 * Codes:
 *   D# = Demographics
 *   L# = Learning & comprehension
 *   N# = Narrative / narrator engagement
 *   G# = Gamification
 *   U# = Usability of the game itself
 *   E# = Educational value
 *   S# = Specific feedback (choice)
 *   T# = Open text
 *   F  = Final overall rating
 */

export type Lang = "en" | "pt";
export type Bilingual = Record<Lang, string>;

export type LikertKind = "agreement" | "familiarity";

export interface LikertItem {
  type: "likert";
  code: string;
  prompt: Bilingual;
  scale: LikertKind;
  required: boolean;
  description?: Bilingual;
}

export interface ChoiceItem {
  type: "choice";
  code: string;
  prompt: Bilingual;
  options: Bilingual[];
  required: boolean;
  multiple?: boolean;
  description?: Bilingual;
  /** When true, marks this as the final question of the section and routes
   *  to form submission after answering. Used to terminate the EN section
   *  cleanly so it doesn't fall through into the PT section. */
  submitAfter?: boolean;
}

export interface TextItem {
  type: "text";
  code: string;
  prompt: Bilingual;
  required: boolean;
  paragraph: boolean;
  description?: Bilingual;
}

export interface SectionBreak {
  type: "section";
  title: Bilingual;
  description?: Bilingual;
}

export type FormItem = LikertItem | ChoiceItem | TextItem | SectionBreak;

// ─── Form-level metadata ─────────────────────────────────────────────────────

export const formMeta = {
  title: {
    en: "Nielsen Heuristics Game — Post-Game Survey",
    pt: "Jogo das Heurísticas de Nielsen — Pesquisa Pós-Jogo",
  } satisfies Bilingual,
  description: {
    en: "Thank you for playing! This short survey helps us understand how the game affected your learning and your experience. Your answers will inform a scientific paper on teaching HCI through gamification. It should take about 5–7 minutes. Open-ended questions are optional — feel free to elaborate if you'd like to.",
    pt: "Obrigado por jogar! Esta breve pesquisa nos ajuda a entender como o jogo afetou seu aprendizado e sua experiência. Suas respostas serão usadas em um artigo científico sobre o ensino de IHC por meio de gamificação. Leva cerca de 5 a 7 minutos. As perguntas abertas são opcionais — fique à vontade para detalhar se quiser.",
  } satisfies Bilingual,
};

// ─── Likert scales (5-point) ─────────────────────────────────────────────────

export const likertScales: Record<LikertKind, { en: string[]; pt: string[] }> =
  {
    agreement: {
      en: [
        "Strongly disagree",
        "Disagree",
        "Neither agree nor disagree",
        "Agree",
        "Strongly agree",
      ],
      pt: [
        "Discordo totalmente",
        "Discordo",
        "Não concordo nem discordo",
        "Concordo",
        "Concordo totalmente",
      ],
    },
    familiarity: {
      en: [
        "Not familiar at all",
        "Slightly familiar",
        "Moderately familiar",
        "Very familiar",
        "Expert",
      ],
      pt: [
        "Nada familiar",
        "Pouco familiar",
        "Moderadamente familiar",
        "Muito familiar",
        "Especialista",
      ],
    },
  };

// ─── The 10 heuristic names (used in choice options) ─────────────────────────

export const heuristicNames: Bilingual[] = [
  {
    en: "1. Visibility of System Status",
    pt: "1. Visibilidade do Status do Sistema",
  },
  {
    en: "2. Match Between System and the Real World",
    pt: "2. Correspondência entre o Sistema e o Mundo Real",
  },
  {
    en: "3. User Control and Freedom",
    pt: "3. Controle e Liberdade do Usuário",
  },
  { en: "4. Consistency and Standards", pt: "4. Consistência e Padrões" },
  { en: "5. Error Prevention", pt: "5. Prevenção de Erros" },
  {
    en: "6. Recognition Rather Than Recall",
    pt: "6. Reconhecimento em Vez de Memorização",
  },
  {
    en: "7. Flexibility and Efficiency of Use",
    pt: "7. Flexibilidade e Eficiência de Uso",
  },
  {
    en: "8. Aesthetic and Minimalist Design",
    pt: "8. Estética e Design Minimalista",
  },
  {
    en: "9. Help Users Recognize, Diagnose, and Recover from Errors",
    pt: "9. Ajudar os Usuários a Reconhecer, Diagnosticar e Recuperar-se de Erros",
  },
  {
    en: "10. Help and Documentation",
    pt: "10. Ajuda e Documentação",
  },
];

// ─── The actual question bank (in display order) ─────────────────────────────

export const questions: FormItem[] = [
  // ───── Demographics ───────────────────────────────────────────────────────
  {
    type: "section",
    title: { en: "About you", pt: "Sobre você" },
    description: {
      en: "A few quick questions to help us interpret your answers in aggregate. No personally identifying information is collected.",
      pt: "Algumas perguntas rápidas para nos ajudar a interpretar suas respostas em conjunto. Nenhuma informação pessoal identificável é coletada.",
    },
  },
  {
    type: "choice",
    code: "D1",
    required: true,
    prompt: {
      en: "Which best describes your current role?",
      pt: "Qual opção melhor descreve seu papel atual?",
    },
    options: [
      {
        en: "Undergraduate student",
        pt: "Estudante de graduação",
      },
      {
        en: "Master's student",
        pt: "Estudante de mestrado",
      },
      {
        en: "PhD / doctoral student",
        pt: "Estudante de doutorado",
      },
      {
        en: "Industry professional (designer, developer, researcher, etc.)",
        pt: "Profissional do mercado (designer, desenvolvedor(a), pesquisador(a), etc.)",
      },
      {
        en: "Professor / instructor",
        pt: "Professor(a) / instrutor(a)",
      },
      {
        en: "Other",
        pt: "Outro",
      },
    ],
  },
  {
    type: "text",
    code: "D2",
    required: false,
    paragraph: false,
    prompt: {
      en: "What is your field of study or area of work? (optional)",
      pt: "Qual é a sua área de estudo ou de atuação? (opcional)",
    },
    description: {
      en: "For example: Computer Science, Design, Information Systems, Education, etc.",
      pt: "Por exemplo: Ciência da Computação, Design, Sistemas de Informação, Educação, etc.",
    },
  },
  {
    type: "likert",
    code: "D3",
    scale: "familiarity",
    required: true,
    prompt: {
      en: "Before playing, how familiar were you with Nielsen's 10 Usability Heuristics?",
      pt: "Antes de jogar, qual era sua familiaridade com as 10 Heurísticas de Usabilidade de Nielsen?",
    },
  },
  {
    type: "choice",
    code: "D4",
    required: true,
    prompt: {
      en: "How much practical HCI / usability evaluation experience do you have?",
      pt: "Quanta experiência prática você tem com IHC ou avaliação de usabilidade?",
    },
    options: [
      { en: "None", pt: "Nenhuma" },
      {
        en: "A little (coursework only)",
        pt: "Pouca (apenas em disciplinas)",
      },
      {
        en: "Some (a few academic projects)",
        pt: "Alguma (alguns projetos acadêmicos)",
      },
      {
        en: "A lot (regular professional or research practice)",
        pt: "Bastante (prática profissional ou de pesquisa regular)",
      },
    ],
  },

  // ───── Learning & comprehension ───────────────────────────────────────────
  {
    type: "section",
    title: {
      en: "Learning and understanding",
      pt: "Aprendizado e compreensão",
    },
    description: {
      en: "Tell us what you took away from the game's content.",
      pt: "Conte-nos o que você levou do conteúdo do jogo.",
    },
  },
  {
    type: "likert",
    code: "L1",
    scale: "agreement",
    required: true,
    prompt: {
      en: "After playing, I better understand what Nielsen's heuristics are and what they are for.",
      pt: "Depois de jogar, entendo melhor o que são as heurísticas de Nielsen e para que servem.",
    },
  },
  {
    type: "likert",
    code: "L2",
    scale: "agreement",
    required: true,
    prompt: {
      en: 'Seeing a "bad" version and a "good" version side by side made the heuristic clearer than reading a definition would.',
      pt: 'Ver uma versão "ruim" e uma versão "boa" lado a lado deixou a heurística mais clara do que ler uma definição.',
    },
  },
  {
    type: "likert",
    code: "L3",
    scale: "agreement",
    required: true,
    prompt: {
      en: "I feel more confident identifying similar usability problems in real interfaces now.",
      pt: "Eu me sinto mais confiante para identificar problemas de usabilidade parecidos em interfaces reais agora.",
    },
  },
  {
    type: "likert",
    code: "L4",
    scale: "agreement",
    required: true,
    prompt: {
      en: "Experiencing the violations hands-on made the heuristic more memorable than just being told what it is.",
      pt: "Vivenciar as violações na prática tornou a heurística mais memorável do que apenas ouvir uma explicação sobre ela.",
    },
  },
  {
    type: "likert",
    code: "L5",
    scale: "agreement",
    required: true,
    prompt: {
      en: "The reveal screen after each pair (which named and explained the heuristic) helped consolidate the lesson.",
      pt: "A tela de revelação após cada par (que nomeava e explicava a heurística) ajudou a consolidar a lição.",
    },
  },
  {
    type: "likert",
    code: "L6",
    scale: "agreement",
    required: true,
    prompt: {
      en: "After playing, I could explain at least a few of the heuristics to someone who hasn't played.",
      pt: "Depois de jogar, eu conseguiria explicar pelo menos algumas das heurísticas para alguém que não jogou.",
    },
  },

  // ───── Narrative / narrator ───────────────────────────────────────────────
  {
    type: "section",
    title: {
      en: "Narrator and narrative",
      pt: "Narrador e narrativa",
    },
    description: {
      en: "How the narrator's commentary and the flow between scenarios shaped your experience.",
      pt: "Como o comentário do narrador e o fluxo entre cenários moldaram sua experiência.",
    },
  },
  {
    type: "likert",
    code: "N1",
    scale: "agreement",
    required: true,
    prompt: {
      en: "The narrator's commentary helped me stay focused on the learning goal of each scenario.",
      pt: "Os comentários do narrador me ajudaram a manter o foco no objetivo de aprendizado de cada cenário.",
    },
  },
  {
    type: "likert",
    code: "N2",
    scale: "agreement",
    required: true,
    prompt: {
      en: "The narrator's explanations were clear and easy to follow.",
      pt: "As explicações do narrador eram claras e fáceis de acompanhar.",
    },
  },
  {
    type: "likert",
    code: "N3",
    scale: "agreement",
    required: true,
    prompt: {
      en: "The narrative framing (mission, narrator comments before/after, reveal) made the experience more engaging than a textbook would be.",
      pt: "A narrativa em volta (missão, comentários do narrador antes/depois, revelação) deixou a experiência mais envolvente do que um livro-texto.",
    },
  },
  {
    type: "likert",
    code: "N4",
    scale: "agreement",
    required: true,
    prompt: {
      en: "The pacing of the scenarios felt right — neither rushed nor too long.",
      pt: "O ritmo dos cenários pareceu adequado — nem corrido demais, nem longo demais.",
    },
  },

  // ───── Gamification ───────────────────────────────────────────────────────
  {
    type: "section",
    title: {
      en: "Gamification",
      pt: "Gamificação",
    },
    description: {
      en: "About the coins, the progress sidebar, and the mystery reward.",
      pt: "Sobre as moedas, a barra lateral de progresso e a recompensa misteriosa.",
    },
  },
  {
    type: "likert",
    code: "G1",
    scale: "agreement",
    required: true,
    prompt: {
      en: "Earning coins for each completed heuristic motivated me to keep playing.",
      pt: "Ganhar moedas a cada heurística concluída me motivou a continuar jogando.",
    },
  },
  {
    type: "likert",
    code: "G2",
    scale: "agreement",
    required: true,
    prompt: {
      en: "The promise of a mystery reward at the end added a sense of intrigue or curiosity.",
      pt: "A promessa de uma recompensa misteriosa no final trouxe uma sensação de intriga ou curiosidade.",
    },
  },
  {
    type: "likert",
    code: "G3",
    scale: "agreement",
    required: true,
    prompt: {
      en: "The progress sidebar (showing completed heuristics) helped me feel a sense of progress.",
      pt: "A barra lateral de progresso (mostrando as heurísticas concluídas) me deu uma sensação de progresso.",
    },
  },
  {
    type: "likert",
    code: "G4",
    scale: "agreement",
    required: true,
    prompt: {
      en: "The game-like presentation made me more willing to go through all 10 heuristics than a slide deck or article would have.",
      pt: "O formato de jogo me deixou mais disposto(a) a percorrer todas as 10 heurísticas do que slides ou um artigo teriam feito.",
    },
  },
  {
    type: "likert",
    code: "G5",
    scale: "agreement",
    required: true,
    prompt: {
      en: "The gamification elements (coins, reward, progress) distracted me from the actual learning content.",
      pt: "Os elementos de gamificação (moedas, recompensa, progresso) me distraíram do conteúdo de aprendizado em si.",
    },
    description: {
      en: "Note: this question is intentionally phrased in the opposite direction.",
      pt: "Observação: esta pergunta foi formulada propositalmente no sentido oposto.",
    },
  },

  // ───── Usability of the game itself ───────────────────────────────────────
  {
    type: "section",
    title: {
      en: "The game itself",
      pt: "O jogo em si",
    },
    description: {
      en: "How easy was the game to use as a piece of software?",
      pt: "O quão fácil foi usar o jogo como software?",
    },
  },
  {
    type: "likert",
    code: "U1",
    scale: "agreement",
    required: true,
    prompt: {
      en: "The game itself was easy to navigate and use.",
      pt: "O jogo em si foi fácil de navegar e usar.",
    },
  },
  {
    type: "likert",
    code: "U2",
    scale: "agreement",
    required: true,
    prompt: {
      en: "The instructions for each scenario (mission card, narrator) made it clear what I needed to do.",
      pt: "As instruções de cada cenário (cartão de missão, narrador) deixaram claro o que eu precisava fazer.",
    },
  },
  {
    type: "likert",
    code: "U3",
    scale: "agreement",
    required: true,
    prompt: {
      en: "The visual design of the game (typography, colors, layout) felt polished and appropriate.",
      pt: "O design visual do jogo (tipografia, cores, layout) pareceu cuidado e apropriado.",
    },
  },
  {
    type: "likert",
    code: "U4",
    scale: "agreement",
    required: true,
    prompt: {
      en: "I encountered no technical issues that disrupted my experience.",
      pt: "Não encontrei problemas técnicos que atrapalhassem minha experiência.",
    },
  },

  // ───── Educational value ──────────────────────────────────────────────────
  {
    type: "section",
    title: {
      en: "Educational value",
      pt: "Valor educacional",
    },
  },
  {
    type: "likert",
    code: "E1",
    scale: "agreement",
    required: true,
    prompt: {
      en: "I would recommend this game to other students learning HCI or usability.",
      pt: "Eu recomendaria este jogo a outros estudantes que estão aprendendo IHC ou usabilidade.",
    },
  },
  {
    type: "likert",
    code: "E2",
    scale: "agreement",
    required: true,
    prompt: {
      en: "This game would work well as a complement to a traditional lecture or reading on Nielsen heuristics.",
      pt: "Este jogo funcionaria bem como complemento a uma aula tradicional ou leitura sobre as heurísticas de Nielsen.",
    },
  },
  {
    type: "likert",
    code: "E3",
    scale: "agreement",
    required: true,
    prompt: {
      en: "Compared to just reading about the heuristics, this game was a more effective way to learn them.",
      pt: "Em comparação com apenas ler sobre as heurísticas, este jogo foi uma forma mais eficaz de aprendê-las.",
    },
  },

  // ───── Specific reflection ────────────────────────────────────────────────
  {
    type: "section",
    title: {
      en: "Looking back at the heuristics",
      pt: "Olhando para as heurísticas",
    },
  },
  {
    type: "choice",
    code: "S1",
    required: true,
    prompt: {
      en: "Which heuristic was the MOST memorable for you?",
      pt: "Qual heurística foi a MAIS memorável para você?",
    },
    options: heuristicNames,
  },
  {
    type: "choice",
    code: "S2",
    required: false,
    multiple: true,
    prompt: {
      en: "Which heuristics, if any, did you find HARDER to grasp from the scenarios? (select any that apply)",
      pt: "Quais heurísticas, se houver, você achou MAIS DIFÍCEIS de entender a partir dos cenários? (marque todas que se aplicam)",
    },
    options: [
      ...heuristicNames,
      { en: "None — all were clear", pt: "Nenhuma — todas ficaram claras" },
    ],
  },
  {
    type: "choice",
    code: "S3",
    required: true,
    prompt: {
      en: "How would you rate the difficulty of the scenarios overall?",
      pt: "Como você avalia a dificuldade geral dos cenários?",
    },
    options: [
      { en: "Too easy", pt: "Muito fáceis" },
      { en: "Easy", pt: "Fáceis" },
      { en: "Just right", pt: "Na medida" },
      { en: "Hard", pt: "Difíceis" },
      { en: "Too hard", pt: "Muito difíceis" },
    ],
  },

  // ───── Open feedback ──────────────────────────────────────────────────────
  {
    type: "section",
    title: {
      en: "Open feedback (optional)",
      pt: "Feedback aberto (opcional)",
    },
    description: {
      en: "All questions in this section are optional. Feel free to skip any of them.",
      pt: "Todas as perguntas desta seção são opcionais. Sinta-se à vontade para pular qualquer uma.",
    },
  },
  {
    type: "text",
    code: "T1",
    required: false,
    paragraph: true,
    prompt: {
      en: "What was the most valuable part of the experience for you?",
      pt: "Qual foi a parte mais valiosa da experiência para você?",
    },
  },
  {
    type: "text",
    code: "T2",
    required: false,
    paragraph: true,
    prompt: {
      en: "What would you improve, change, or add to the game?",
      pt: "O que você melhoraria, mudaria ou adicionaria ao jogo?",
    },
  },
  {
    type: "text",
    code: "T3",
    required: false,
    paragraph: true,
    prompt: {
      en: "Is there a heuristic you wish had been explored in more depth or with a different example?",
      pt: "Há alguma heurística que você gostaria que tivesse sido explorada com mais profundidade ou com outro exemplo?",
    },
  },
  {
    type: "text",
    code: "T4",
    required: false,
    paragraph: true,
    prompt: {
      en: "Anything else you would like to share about the game, the narrative, the gamification, or your learning?",
      pt: "Mais alguma coisa que você queira compartilhar sobre o jogo, a narrativa, a gamificação ou seu aprendizado?",
    },
  },

  // ───── Final overall rating (also acts as section terminator) ─────────────
  {
    type: "choice",
    code: "F",
    required: true,
    submitAfter: true,
    prompt: {
      en: "Overall, how would you rate the game?",
      pt: "No geral, como você avalia o jogo?",
    },
    options: [
      { en: "★ — Poor", pt: "★ — Ruim" },
      { en: "★★ — Below average", pt: "★★ — Abaixo da média" },
      { en: "★★★ — Average", pt: "★★★ — Mediano" },
      { en: "★★★★ — Good", pt: "★★★★ — Bom" },
      { en: "★★★★★ — Excellent", pt: "★★★★★ — Excelente" },
    ],
  },
];
