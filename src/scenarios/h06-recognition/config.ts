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
        en: "Select the word 'important' to get the formatting toolbar. The toolbar will appear — but can you figure out which button makes it bold?",
        pt: "Selecione a palavra 'importante' para ver a barra de formatação. A barra vai aparecer — mas você consegue descobrir qual botão a deixa em negrito?",
      },
      narratorAfter: {
        en: "The toolbar appeared, but the bold option was labeled 'β' — a Greek letter that looks like B but isn't the standard icon. You had to guess or try each button. That's the opposite of recognition.",
        pt: "A barra apareceu, mas a opção de negrito estava rotulada como 'β' — uma letra grega que parece um B mas não é o ícone padrão. Você teve que adivinhar ou tentar cada botão. Isso é o oposto de reconhecimento.",
      },
    },
    {
      kind: 'good',
      component: GoodScenario,
      narratorBefore: {
        en: "Same task — make 'important' bold. Select the word and notice what changes.",
        pt: "Mesma tarefa — deixe 'importante' em negrito. Selecione a palavra e observe o que muda.",
      },
      narratorAfter: {
        en: 'You selected the word, saw your options appear, and recognized what to do. No memorization, no guessing. Visible, familiar choices eliminate cognitive load.',
        pt: 'Você selecionou a palavra, viu as opções aparecerem e reconheceu o que fazer. Sem memorização, sem adivinhação. Escolhas visíveis e familiares eliminam a carga cognitiva.',
      },
    },
  ],
  revealText: {
    en: 'Heuristic #6 is Recognition Rather Than Recall. Visible options, menus, and labels reduce cognitive load. Users should never have to guess what a symbol means — they should be able to recognize the right action when they see it.',
    pt: 'A Heurística #6 é Reconhecimento em vez de Memorização. Opções, menus e rótulos visíveis reduzem a carga cognitiva. Os usuários nunca devem precisar adivinhar o que um símbolo significa — eles devem ser capazes de reconhecer a ação correta quando a veem.',
  },
};
