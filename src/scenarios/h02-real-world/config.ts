import type { HeuristicConfig } from '../../types/game';
import { BadScenario } from './BadScenario';
import { GoodScenario } from './GoodScenario';

export const h02: HeuristicConfig = {
  id: 2,
  name: {
    en: 'Match Between System and the Real World',
    pt: 'Correspondência entre o Sistema e o Mundo Real',
  },
  tagline: {
    en: "Speak the users' language, not the computer's.",
    pt: 'Fale a língua do usuário, não a do computador.',
  },
  description: {
    en: "The system should speak the users' language, with words, phrases and concepts familiar to the user, rather than system-oriented terms. Follow real-world conventions, making information appear in a natural and logical order.",
    pt: 'O sistema deve falar a língua dos usuários, usando palavras, frases e conceitos familiares a eles, em vez de termos orientados ao sistema. Siga as convenções do mundo real, fazendo com que as informações apareçam em uma ordem natural e lógica.',
  },
  goal: {
    en: 'Save your document before closing.',
    pt: 'Salve seu documento antes de fechar.',
  },
  scenarios: [
    {
      kind: 'bad',
      component: BadScenario,
      narratorBefore: {
        en: 'You need to save your document. Find the right option in the menu below.',
        pt: 'Você precisa salvar seu documento. Encontre a opção correta no menu abaixo.',
      },
      narratorAfter: {
        en: 'Frustrating, right? "Serialize & commit to persistent storage layer" means Save. "Discard volatile in-memory state" means Cancel. Technical jargon creates a wall between the user and the system.',
        pt: 'Frustrante, não é? "Serializar e confirmar na camada de armazenamento persistente" significa Salvar. "Descartar estado volátil em memória" significa Cancelar. O jargão técnico cria uma barreira entre o usuário e o sistema.',
      },
    },
    {
      kind: 'good',
      component: GoodScenario,
      narratorBefore: {
        en: 'Same task — save the document. Notice how the language has changed.',
        pt: 'Mesma tarefa — salvar o documento. Observe como a linguagem mudou.',
      },
      narratorAfter: {
        en: 'Instantly clear! "💾 Save", "☁️ Save to Cloud", "✕ Discard changes" — these match how people think about documents in the real world. No translation needed.',
        pt: 'Imediatamente claro! "💾 Salvar", "☁️ Salvar na Nuvem", "✕ Descartar alterações" — esses termos correspondem à forma como as pessoas pensam sobre documentos no mundo real. Sem necessidade de tradução.',
      },
    },
  ],
  revealText: {
    en: "Heuristic #2 is Match Between System and the Real World. Interfaces should use the vocabulary, metaphors, and logic of the user's domain — not internal system terminology. When users understand the language, they feel confident and make fewer mistakes.",
    pt: 'A Heurística #2 é a Correspondência entre o Sistema e o Mundo Real. As interfaces devem usar o vocabulário, as metáforas e a lógica do domínio do usuário — não a terminologia interna do sistema. Quando os usuários entendem a linguagem, sentem-se confiantes e cometem menos erros.',
  },
};
