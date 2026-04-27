import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { GameState, GameAction, CompletedEntry } from '../types/game';
import { heuristics } from '../scenarios';

// ─── Initial state ────────────────────────────────────────────────────────────
const INITIAL_STATE: GameState = {
  phase: 'welcome',
  heuristicIndex: 0,
  scenarioIndex: 0,
  scenarioStartTime: 0,
  completedEntries: [],
};

// ─── Reducer ──────────────────────────────────────────────────────────────────
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...INITIAL_STATE,
        phase: 'playing',
        scenarioStartTime: Date.now(),
      };

    case 'TASK_COMPLETE': {
      const elapsed = Date.now() - state.scenarioStartTime;
      const heuristic = heuristics[state.heuristicIndex];
      const scenario = heuristic.scenarios[state.scenarioIndex];
      const entry: CompletedEntry = {
        heuristicId: heuristic.id,
        kind: scenario.kind,
        timeMs: elapsed,
      };
      return {
        ...state,
        phase: 'feedback',
        completedEntries: [...state.completedEntries, entry],
      };
    }

    case 'DISMISS_FEEDBACK':
      // After first scenario → go to second scenario
      if (state.scenarioIndex === 0) {
        return {
          ...state,
          phase: 'playing',
          scenarioIndex: 1,
          scenarioStartTime: Date.now(),
        };
      }
      // After second scenario → show reveal
      return { ...state, phase: 'reveal' };

    case 'DISMISS_REVEAL': {
      const isLast = state.heuristicIndex >= heuristics.length - 1;
      if (isLast) {
        return { ...state, phase: 'results' };
      }
      return {
        ...state,
        phase: 'playing',
        heuristicIndex: state.heuristicIndex + 1,
        scenarioIndex: 0,
        scenarioStartTime: Date.now(),
      };
    }

    case 'RESTART':
      return { ...INITIAL_STATE };

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  /** Convenience: current heuristic config */
  currentHeuristic: typeof heuristics[number];
  /** Convenience: current scenario config */
  currentScenario: typeof heuristics[number]['scenarios'][number];
  totalHeuristics: number;
}

const GameContext = createContext<GameContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

  const currentHeuristic = heuristics[state.heuristicIndex];
  const currentScenario = currentHeuristic.scenarios[state.scenarioIndex];

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch,
        currentHeuristic,
        currentScenario,
        totalHeuristics: heuristics.length,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used inside <GameProvider>');
  return ctx;
}
