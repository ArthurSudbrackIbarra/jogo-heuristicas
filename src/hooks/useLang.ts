import { useGame } from '../context/GameContext';
import type { Lang } from '../types/game';

export function useLang() {
  const { state, dispatch } = useGame();

  function pick<T>(obj: Record<Lang, T>): T {
    return obj[state.lang];
  }

  function setLang(lang: Lang) {
    dispatch({ type: 'SET_LANG', lang });
  }

  return { lang: state.lang, pick, setLang };
}
