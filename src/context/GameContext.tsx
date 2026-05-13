import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { GameState, GameAction, CompletedEntry } from '../types/game';
import { heuristics } from '../scenarios';
import i18n from '../i18n';

// ─── Initial state ────────────────────────────────────────────────────────────
const INITIAL_STATE: GameState = {
  phase: 'welcome',
  heuristicIndex: 0,
  scenarioIndex: 0,
  scenarioStartTime: 0,
  completedEntries: [],
  coins: 0,
  lang: 'en',
};

// ─── Reducer ──────────────────────────────────────────────────────────────────
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...INITIAL_STATE,
        lang: state.lang,
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
      if (state.scenarioIndex === 0) {
        return {
          ...state,
          phase: 'playing',
          scenarioIndex: 1,
          scenarioStartTime: Date.now(),
        };
      }
      return { ...state, phase: 'reveal' };

    case 'DISMISS_REVEAL': {
      const isLast = state.heuristicIndex >= heuristics.length - 1;
      const newCoins = state.coins + 10;
      if (isLast) {
        return { ...state, coins: newCoins, phase: 'shop' };
      }
      return {
        ...state,
        coins: newCoins,
        phase: 'playing',
        heuristicIndex: state.heuristicIndex + 1,
        scenarioIndex: 0,
        scenarioStartTime: Date.now(),
      };
    }

    case 'BUY_ITEM':
      return { ...state, phase: 'results' };

    case 'RESTART':
      return { ...INITIAL_STATE, lang: state.lang };

    case 'SET_LANG':
      i18n.changeLanguage(action.lang);
      return { ...state, lang: action.lang };

    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  currentHeuristic: typeof heuristics[number];
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
