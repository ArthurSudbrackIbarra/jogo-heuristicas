import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGame } from '../../context/GameContext';
import { useLang } from '../../hooks/useLang';
import { GoalCard } from '../../components/GoalCard';
import { NarratorBox } from '../../components/NarratorBox';
import { ScenarioFrame } from '../../components/ScenarioFrame';
import { HeuristicReveal } from '../../components/HeuristicReveal';
import { ProgressSidebar } from '../../components/ProgressSidebar';
import { heuristics } from '../../scenarios';
import styles from './GameScreen.module.css';

export function GameScreen() {
  const { state, dispatch, currentHeuristic, currentScenario, totalHeuristics } = useGame();
  const { phase, heuristicIndex, scenarioIndex, coins, completedHeuristicIds } = state;
  const { t } = useTranslation();
  const { lang, pick, setLang } = useLang();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const ScenarioComponent = currentScenario.component;

  const alreadyCounted = completedHeuristicIds.includes(currentHeuristic.id);
  const coinsAfterThis = alreadyCounted ? coins : coins + 10;
  const futureCompletedCount = alreadyCounted
    ? completedHeuristicIds.length
    : completedHeuristicIds.length + 1;
  const isLast = futureCompletedCount >= heuristics.length;

  return (
    <div className={styles.gameLayout}>
      <ProgressSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className={styles.contentArea}>
        {phase === 'reveal' ? (
          <div className={styles.wrapper}>
            <HeuristicReveal
              heuristic={currentHeuristic}
              isLast={isLast}
              coinsAfterThis={coinsAfterThis}
              onNext={() => dispatch({ type: 'DISMISS_REVEAL' })}
            />
          </div>
        ) : (
          <div className={styles.wrapper}>
            <header className={styles.topBar}>
              <div className={styles.topBarLeft}>
                <button
                  className={styles.menuBtn}
                  onClick={() => setSidebarOpen(o => !o)}
                  aria-label={t('sidebar.toggle')}
                  title={t('sidebar.toggle')}
                >
                  ☰
                </button>
                <div className={styles.heuristicInfo}>
                  <span className={styles.heuristicLabel}>
                    {t('game.heuristicLabel', { current: heuristicIndex + 1, total: totalHeuristics })}
                  </span>
                  <span className={styles.heuristicName}>{pick(currentHeuristic.name)}</span>
                </div>
              </div>
              <div className={styles.topBarRight}>
                <span className={styles.coinDisplay}>🪙 {coins} / 100</span>
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
        )}
      </div>
    </div>
  );
}
