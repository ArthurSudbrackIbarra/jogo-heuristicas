import { useTranslation } from 'react-i18next';
import { useGame } from '../../context/GameContext';
import { useLang } from '../../hooks/useLang';
import { GoalCard } from '../../components/GoalCard';
import { NarratorBox } from '../../components/NarratorBox';
import { ProgressBar } from '../../components/ProgressBar';
import { ScenarioFrame } from '../../components/ScenarioFrame';
import { HeuristicReveal } from '../../components/HeuristicReveal';
import { heuristics } from '../../scenarios';
import styles from './GameScreen.module.css';

export function GameScreen() {
  const { state, dispatch, currentHeuristic, currentScenario, totalHeuristics } = useGame();
  const { phase, heuristicIndex, scenarioIndex, coins } = state;
  const { t } = useTranslation();
  const { lang, pick, setLang } = useLang();

  const ScenarioComponent = currentScenario.component;
  const coinsAfterThis = coins + 10;

  if (phase === 'reveal') {
    return (
      <div className={styles.wrapper}>
        <HeuristicReveal
          heuristic={currentHeuristic}
          isLast={heuristicIndex >= heuristics.length - 1}
          coinsAfterThis={coinsAfterThis}
          onNext={() => dispatch({ type: 'DISMISS_REVEAL' })}
        />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <header className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <span className={styles.heuristicLabel}>
            {t('game.heuristicLabel', { current: heuristicIndex + 1, total: totalHeuristics })}
          </span>
          <span className={styles.heuristicName}>{pick(currentHeuristic.name)}</span>
        </div>
        <div className={styles.progressWrapper}>
          <ProgressBar
            current={heuristicIndex + 1}
            total={totalHeuristics}
            scenarioIndex={scenarioIndex}
          />
        </div>
        <div className={styles.topBarRight}>
          <span className={styles.coinDisplay}>🪙 {coins}</span>
          <div className={styles.langSwitcher}>
            <button
              className={`${styles.langBtn} ${lang === 'en' ? styles.langActive : ''}`}
              onClick={() => setLang('en')}
              title={t('lang.en')}
            >
              🇺🇸
            </button>
            <button
              className={`${styles.langBtn} ${lang === 'pt' ? styles.langActive : ''}`}
              onClick={() => setLang('pt')}
              title={t('lang.pt')}
            >
              🇧🇷
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <GoalCard
          goal={pick(currentHeuristic.goal)}
          heuristicNumber={heuristicIndex + 1}
        />

        <ScenarioFrame
          title={pick(currentHeuristic.name)}
          disabled={phase === 'feedback'}
        >
          <ScenarioComponent
            key={`h${heuristicIndex}-s${scenarioIndex}`}
            onTaskComplete={() => dispatch({ type: 'TASK_COMPLETE' })}
          />
        </ScenarioFrame>

        {phase === 'playing' && (
          <NarratorBox
            key={`narrator-before-h${heuristicIndex}-s${scenarioIndex}`}
            text={pick(currentScenario.narratorBefore)}
            audioSrc={currentScenario.audioBefore}
          />
        )}

        {phase === 'feedback' && (
          <NarratorBox
            key={`narrator-after-h${heuristicIndex}-s${scenarioIndex}`}
            text={pick(currentScenario.narratorAfter)}
            audioSrc={currentScenario.audioAfter}
            showContinue
            continueLabel={
              scenarioIndex === 0 ? t('game.tryOtherVersion') : t('game.seeReveal')
            }
            onContinue={() => dispatch({ type: 'DISMISS_FEEDBACK' })}
          />
        )}
      </main>
    </div>
  );
}
