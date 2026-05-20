import type { HeuristicConfig } from "../../types/game";
import { BadScenario } from "./BadScenario";
import { GoodScenario } from "./GoodScenario";

export const h06: HeuristicConfig = {
  id: 6,
  name: {
    en: "Recognition Rather Than Recall",
    pt: "Reconhecimento em vez de Memorização",
  },
  tagline: {
    en: "Minimize the user's memory load by making elements visible.",
    pt: "Minimize a carga de memória do usuário tornando os elementos visíveis.",
  },
  description: {
    en: "Minimize the user's memory load by making objects, actions, and options visible. The user should not have to remember information from one part of the interface to another. Instructions should be visible or easily retrievable whenever appropriate.",
    pt: "Minimize a carga de memória do usuário tornando objetos, ações e opções visíveis. O usuário não deve precisar lembrar informações de uma parte da interface para outra. As instruções devem ser visíveis ou facilmente recuperáveis quando necessário.",
  },
  goal: {
    en: "Make the word 'important' bold in the document.",
    pt: "Deixe a palavra 'importante' em negrito no documento.",
  },
  scenarios: [
    {
      kind: "bad",
      component: BadScenario,
      narratorBefore: {
        en: "Select the word 'important' to get the formatting toolbar. The toolbar will appear — but can you figure out which button makes it bold?",
        pt: "Selecione a palavra 'importante' para ver a barra de formatação. A barra vai aparecer — mas você consegue descobrir qual botão a deixa em negrito?",
      },
      audioBefore: { pt: "audios/pt/H6BBPT.mp3", en: "audios/en/H6BBEN.mp3" },
      narratorAfter: {
        en: "The toolbar appeared, but the options were simply labeled '1', '2', and '3'. How were you supposed to know which one was for bold? You had to guess or use trial and error for each button. That's the opposite of recognition.",
        pt: "A barra apareceu, mas as opções estavam rotuladas apenas como '1', '2' e '3'. Como saber qual delas aplicaria o negrito? Você teve que adivinhar ou testar cada botão por tentativa e erro. Isso é o oposto de reconhecimento.",
      },
      audioAfter: { pt: "audios/pt/H6BAPT.mp3", en: "audios/en/H6BAEN.mp3" },
    },
    {
      kind: "good",
      component: GoodScenario,
      narratorBefore: {
        en: "Same task — make 'important' bold. Select the word and notice what changes.",
        pt: "Mesma tarefa — deixe 'importante' em negrito. Selecione a palavra e observe o que muda.",
      },
      audioBefore: { pt: "audios/pt/H6GBPT.mp3", en: "audios/en/H6GBEN.mp3" },
      narratorAfter: {
        en: "You selected the word, saw your options appear, and recognized what to do. No memorization, no guessing. Visible, familiar choices eliminate cognitive load.",
        pt: "Você selecionou a palavra, viu as opções aparecerem e reconheceu o que fazer. Sem memorização, sem adivinhação. Escolhas visíveis e familiares eliminam a carga cognitiva.",
      },
      audioAfter: { pt: "audios/pt/H6GAPT.mp3", en: "audios/en/H6GAEN.mp3" },
    },
  ],
  revealText: {
    en: "Heuristic #6 is Recognition Rather Than Recall. Visible options, menus, and labels reduce cognitive load. Users should never have to guess what a symbol means — they should be able to recognize the right action when they see it.",
    pt: "A Heurística #6 é Reconhecimento em vez de Memorização. Opções, menus e rótulos visíveis reduzem a carga cognitiva. Os usuários nunca devem precisar adivinhar o que um símbolo significa — eles devem ser capazes de reconhecer a ação correta quando a veem.",
  },
};
