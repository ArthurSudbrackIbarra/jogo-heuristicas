import type { ComponentType } from 'react';

// ─── Scenario props passed to every scenario component ───────────────────────
export interface ScenarioProps {
  /** Call this when the user has completed (or attempted) the goal */
  onTaskComplete: () => void;
}

// ─── Scenario descriptor ─────────────────────────────────────────────────────
export type ScenarioKind = 'good' | 'bad';

export interface ScenarioConfig {
  /** Whether this is the "good" or "bad" version of the heuristic */
  kind: ScenarioKind;
  /** The interactive scenario component */
  component: ComponentType<ScenarioProps>;
  /** Narrator text shown BEFORE the user starts */
  narratorBefore: string;
  /** Narrator text shown AFTER the user completes (or fails) the task */
  narratorAfter: string;
  /** Optional audio file paths relative to /public/audio/ */
  audioBefore?: string;
  audioAfter?: string;
}

// ─── Heuristic descriptor ─────────────────────────────────────────────────────
export interface HeuristicConfig {
  /** 1-based heuristic number */
  id: number;
  /** Short name, e.g. "Visibility of System Status" */
  name: string;
  /** One-liner description */
  tagline: string;
  /** Full explanation shown on the reveal screen */
  description: string;
  /** The task instruction displayed to the player during both scenarios */
  goal: string;
  /**
   * Two scenarios: index 0 is shown first, index 1 is shown second.
   * Convention: [bad, good] — player feels the pain, then the solution.
   */
  scenarios: [ScenarioConfig, ScenarioConfig];
  /** Narrator text on the heuristic reveal screen */
  revealText: string;
  revealAudio?: string;
}

// ─── Game state machine ───────────────────────────────────────────────────────
export type GamePhase =
  | 'welcome'       // Landing screen
  | 'playing'       // Active scenario — player interacting
  | 'feedback'      // Narrator comment after task complete
  | 'reveal'        // Heuristic reveal after both scenarios
  | 'results';      // All 10 heuristics done

export interface CompletedEntry {
  heuristicId: number;
  kind: ScenarioKind;
  timeMs: number;
}

export interface GameState {
  phase: GamePhase;
  /** 0-based index into the heuristics array */
  heuristicIndex: number;
  /** 0 = first scenario of this heuristic, 1 = second */
  scenarioIndex: 0 | 1;
  /** Timestamp when the current scenario started */
  scenarioStartTime: number;
  completedEntries: CompletedEntry[];
}

// ─── Dispatcher actions ───────────────────────────────────────────────────────
export type GameAction =
  | { type: 'START_GAME' }
  | { type: 'TASK_COMPLETE' }
  | { type: 'DISMISS_FEEDBACK' }
  | { type: 'DISMISS_REVEAL' }
  | { type: 'RESTART' };
