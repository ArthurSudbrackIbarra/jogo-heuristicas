import type { ComponentType } from 'react';

// ─── Localisation ─────────────────────────────────────────────────────────────
export type Lang = 'en' | 'pt';
export type Bilingual = Record<Lang, string>;

// ─── Scenario props passed to every scenario component ───────────────────────
export interface ScenarioProps {
  onTaskComplete: () => void;
}

// ─── Scenario descriptor ─────────────────────────────────────────────────────
export type ScenarioKind = 'good' | 'bad';

export interface ScenarioConfig {
  kind: ScenarioKind;
  component: ComponentType<ScenarioProps>;
  narratorBefore: Bilingual;
  narratorAfter: Bilingual;
  /** Audio file paths keyed by language — missing file = silent fail */
  audioBefore?: Partial<Record<Lang, string>>;
  audioAfter?: Partial<Record<Lang, string>>;
}

// ─── Heuristic descriptor ─────────────────────────────────────────────────────
export interface HeuristicConfig {
  id: number;
  name: Bilingual;
  tagline: Bilingual;
  description: Bilingual;
  goal: Bilingual;
  scenarios: [ScenarioConfig, ScenarioConfig];
  revealText: Bilingual;
  revealAudio?: Partial<Record<Lang, string>>;
}

// ─── Game state machine ───────────────────────────────────────────────────────
export type GamePhase =
  | 'welcome'
  | 'playing'
  | 'feedback'
  | 'reveal'
  | 'shop'
  | 'results';

export interface CompletedEntry {
  heuristicId: number;
  kind: ScenarioKind;
  timeMs: number;
}

export interface GameState {
  phase: GamePhase;
  heuristicIndex: number;
  scenarioIndex: 0 | 1;
  scenarioStartTime: number;
  completedEntries: CompletedEntry[];
  coins: number;
  lang: Lang;
}

// ─── Dispatcher actions ───────────────────────────────────────────────────────
export type GameAction =
  | { type: 'START_GAME' }
  | { type: 'TASK_COMPLETE' }
  | { type: 'DISMISS_FEEDBACK' }
  | { type: 'DISMISS_REVEAL' }
  | { type: 'BUY_ITEM' }
  | { type: 'RESTART' }
  | { type: 'SET_LANG'; lang: Lang };
