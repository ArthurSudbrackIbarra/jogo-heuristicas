import { createContext, useContext, useReducer, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { GameState, GameAction, CompletedEntry, Lang, GamePhase } from '../types/game';
import { heuristics } from '../scenarios';
import i18n from '../i18n';

// ─── localStorage ─────────────────────────────────────────────────────────────
const STORAGE_KEY = 'jogo-heuristicas-save';

interface SavedProgress {
  completedEntries: CompletedEntry[];
  completedHeuristicIds: number[];
  coins: number;
  lang: Lang;
}

function loadSavedProgress(): Partial<GameState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const saved: SavedProgress = JSON.parse(raw);
    return {
      completedEntries: Array.isArray(saved.completedEntries) ? saved.completedEntries : [],
      completedHeuristicIds: Array.isArray(saved.completedHeuristicIds) ? saved.completedHeuristicIds : [],
      coins: typeof saved.coins === 'number' ? saved.coins : 0,
      lang: saved.lang === 'pt' ? 'pt' : 'en',
    };
  } catch {
    return {};
  }
}

function persistProgress(state: GameState) {
  const saved: SavedProgress = {
    completedEntries: state.completedEntries,
    completedHeuristicIds: state.completedHeuristicIds,
    coins: state.coins,
    lang: state.lang,
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  } catch {
    // storage quota exceeded or unavailable — fail silently
  }
}

function clearProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function findFirstIncompleteIndex(completedHeuristicIds: number[]): number {
  const idx = heuristics.findIndex(h => !completedHeuristicIds.includes(h.id));
  return idx >= 0 ? idx : 0;
}

function findNextIncompleteIndex(
  currentIndex: number,
  completedHeuristicIds: number[],
): number | null {
  // Search after current first, then wrap around
  for (let i = currentIndex + 1; i < heuristics.length; i++) {
    if (!completedHeuristicIds.includes(heuristics[i].id)) return i;
  }
  for (let i = 0; i < currentIndex; i++) {
    if (!completedHeuristicIds.includes(heuristics[i].id)) return i;
  }
  return null;
}

// ─── Initial state (loaded from localStorage) ─────────────────────────────────
function buildInitialState(): GameState {
  const saved = loadSavedProgress();
  const lang = saved.lang ?? 'en';
  i18n.changeLanguage(lang);
  return {
    phase: 'welcome' as GamePhase,
    heuristicIndex: 0,
    scenarioIndex: 0,
    scenarioStartTime: 0,
    completedEntries: saved.completedEntries ?? [],
    completedHeuristicIds: saved.completedHeuristicIds ?? [],
    coins: saved.coins ?? 0,
    lang,
  };
}

// ─── Reducer ──────────────────────────────────────────────────────────────────
function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME': {
      const allDone = state.completedHeuristicIds.length >= heuristics.length;
      if (allDone) {
        return { ...state, phase: 'shop' };
      }
      const targetIdx = findFirstIncompleteIndex(state.completedHeuristicIds);
      const heuristic = heuristics[targetIdx];
      const badDone = state.completedEntries.some(
        e => e.heuristicId === heuristic.id && e.kind === 'bad',
      );
      const scenarioIdx: 0 | 1 = badDone ? 1 : 0;
      return {
        ...state,
        phase: 'playing',
        heuristicIndex: targetIdx,
        scenarioIndex: scenarioIdx,
        scenarioStartTime: Date.now(),
      };
    }

    case 'TASK_COMPLETE': {
      const elapsed = Date.now() - state.scenarioStartTime;
      const heuristic = heuristics[state.heuristicIndex];
      const scenario = heuristic.scenarios[state.scenarioIndex];
      const alreadyDone = state.completedEntries.some(
        e => e.heuristicId === heuristic.id && e.kind === scenario.kind,
      );
      const entry: CompletedEntry = {
        heuristicId: heuristic.id,
        kind: scenario.kind,
        timeMs: elapsed,
      };
      return {
        ...state,
        phase: 'feedback',
        completedEntries: alreadyDone
          ? state.completedEntries
          : [...state.completedEntries, entry],
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
      const heuristic = heuristics[state.heuristicIndex];
      const alreadyCounted = state.completedHeuristicIds.includes(heuristic.id);
      const newCoins = alreadyCounted ? state.coins : state.coins + 10;
      const newCompletedIds = alreadyCounted
        ? state.completedHeuristicIds
        : [...state.completedHeuristicIds, heuristic.id];

      const allDone = newCompletedIds.length >= heuristics.length;
      if (allDone) {
        return { ...state, coins: newCoins, completedHeuristicIds: newCompletedIds, phase: 'shop' };
      }

      const nextIdx = findNextIncompleteIndex(state.heuristicIndex, newCompletedIds);
      if (nextIdx === null) {
        return { ...state, coins: newCoins, completedHeuristicIds: newCompletedIds, phase: 'shop' };
      }

      return {
        ...state,
        coins: newCoins,
        completedHeuristicIds: newCompletedIds,
        phase: 'playing',
        heuristicIndex: nextIdx,
        scenarioIndex: 0,
        scenarioStartTime: Date.now(),
      };
    }

    case 'BUY_ITEM':
      return { ...state, phase: 'results' };

    case 'FINISH_GAME':
      return { ...state, phase: 'shop' };

    case 'NAVIGATE_TO':
      return {
        ...state,
        phase: 'playing',
        heuristicIndex: action.heuristicIndex,
        scenarioIndex: action.scenarioIndex,
        scenarioStartTime: Date.now(),
      };

    case 'RESTART': {
      clearProgress();
      const base: GameState = {
        phase: 'welcome',
        heuristicIndex: 0,
        scenarioIndex: 0,
        scenarioStartTime: 0,
        completedEntries: [],
        completedHeuristicIds: [],
        coins: 0,
        lang: state.lang,
      };
      return base;
    }

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
  const [state, dispatch] = useReducer(gameReducer, undefined, buildInitialState);

  const currentHeuristic = heuristics[state.heuristicIndex];
  const currentScenario = currentHeuristic.scenarios[state.scenarioIndex];

  // Persist progress whenever relevant state changes
  useEffect(() => {
    persistProgress(state);
  }, [state.completedEntries, state.completedHeuristicIds, state.coins, state.lang]);

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
