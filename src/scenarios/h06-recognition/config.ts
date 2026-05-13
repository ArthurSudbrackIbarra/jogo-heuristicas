import type { HeuristicConfig } from '../../types/game';
import { BadScenario } from './BadScenario';
import { GoodScenario } from './GoodScenario';

export const h06: HeuristicConfig = {
  id: 6,
  name: {
    en: 'Recognition Rather Than Recall',
    pt: 'Reconhecimento em vez de Memorização',
  },
  tagline: {
    en: "Minimize the user's memory load by making elements visible.",
    pt: 'Minimize a carga de memória do usuário tornando os elementos visíveis.',
  },
  description: {
    en: "Minimize the user's memory load by making objects, actions, and options visible. The user should not have to remember information from one part of the interface to another. Instructions should be visible or easily retrievable whenever appropriate.",
    pt: 'Minimize a carga de memória do usuário tornando objetos, ações e opções visíveis. O usuário não deve precisar lembrar informações de uma parte da interface para outra. As instruções devem ser visíveis ou facilmente recuperáveis quando necessário.',
  },
  goal: {
    en: "Make the word 'important' bold in the document.",
    pt: "Deixe a palavra 'importante' em negrito no documento.",
  },
  scenarios: [
    {
      kind: 'bad',
      component: BadScenario,
      narratorBefore: {
        en: "Try to make the word 'important' bold. There's a way to do it — but the interface won't show you how.",
        pt: "Tente deixar a palavra 'importante' em negrito. Há uma maneira de fazer isso — mas a interface não vai te mostrar como.",
      },
      narratorAfter: {
        en: 'The system required you to recall a hidden command from memory. With no visible options, you were left guessing. This is the opposite of good design.',
        pt: 'O sistema exigiu que você se lembrasse de um comando oculto da memória. Sem opções visíveis, você ficou adivinhando. Isso é o oposto de um bom design.',
      },
    },
    {
      kind: 'good',
      component: GoodScenario,
      narratorBefore: {
        en: "Same task — make 'important' bold. Notice what changes.",
        pt: "Mesma tarefa — deixe 'importante' em negrito. Observe o que muda.",
      },
      narratorAfter: {
        en: 'You clicked the word, saw your options appear, and recognized what to do. No memorization, no guessing. Visible choices eliminate cognitive load.',
        pt: 'Você clicou na palavra, viu as opções aparecerem e reconheceu o que fazer. Sem memorização, sem adivinhação. Escolhas visíveis eliminam a carga cognitiva.',
      },
    },
  ],
  revealText: {
    en: 'Heuristic #6 is Recognition Rather Than Recall. Visible options, menus, and labels reduce cognitive load. Users should never have to remember what command to type — they should be able to recognize the right action when they see it.',
    pt: 'A Heurística #6 é Reconhecimento em vez de Memorização. Opções, menus e rótulos visíveis reduzem a carga cognitiva. Os usuários nunca devem precisar lembrar qual comando digitar — eles devem ser capazes de reconhecer a ação correta quando a veem.',
  },
};
