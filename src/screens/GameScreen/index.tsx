import { useGame } from '../../context/GameContext';
import { GoalCard } from '../../components/GoalCard';
import { NarratorBox } from '../../components/NarratorBox';
import { ProgressBar } from '../../components/ProgressBar';
import { ScenarioFrame } from '../../components/ScenarioFrame';
import { HeuristicReveal } from '../../components/HeuristicReveal';
import { heuristics } from '../../scenarios';
import styles from './GameScreen.module.css';

export function GameScreen() {
  const { state, dispatch, currentHeuristic, currentScenario, totalHeuristics } = useGame();
  const { phase, heuristicIndex, scenarioIndex } = state;

  const ScenarioComponent = currentScenario.component;

  if (phase === 'reveal') {
    return (
      <div className={styles.wrapper}>
        <HeuristicReveal
          heuristic={currentHeuristic}
          isLast={heuristicIndex >= heuristics.length - 1}
          onNext={() => dispatch({ type: 'DISMISS_REVEAL' })}
        />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {/* ── Top bar ──────────────────────────────────────────── */}
      <header className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <span className={styles.heuristicLabel}>
            Heuristic {heuristicIndex + 1}/{totalHeuristics}
          </span>
          <span className={styles.heuristicName}>{currentHeuristic.name}</span>
        </div>
        <div className={styles.progressWrapper}>
          <ProgressBar
            current={heuristicIndex + 1}
            total={totalHeuristics}
            scenarioIndex={scenarioIndex}
          />
        </div>
      </header>

      {/* ── Main content ─────────────────────────────────────── */}
      <main className={styles.main}>
        {/* Goal card */}
        <GoalCard
          goal={currentHeuristic.goal}
          heuristicNumber={heuristicIndex + 1}
        />

        {/* Scenario frame */}
        <ScenarioFrame
          title={currentHeuristic.name}
          disabled={phase === 'feedback'}
        >
          <ScenarioComponent
            key={`h${heuristicIndex}-s${scenarioIndex}`}
            onTaskComplete={() => dispatch({ type: 'TASK_COMPLETE' })}
          />
        </ScenarioFrame>

        {/* Narrator */}
        {phase === 'playing' && (
          <NarratorBox
            key={`narrator-before-h${heuristicIndex}-s${scenarioIndex}`}
            text={currentScenario.narratorBefore}
            audioSrc={currentScenario.audioBefore}
          />
        )}

        {phase === 'feedback' && (
          <NarratorBox
            key={`narrator-after-h${heuristicIndex}-s${scenarioIndex}`}
            text={currentScenario.narratorAfter}
            audioSrc={currentScenario.audioAfter}
            showContinue
            continueLabel={
              scenarioIndex === 0 ? 'Try the other version →' : 'See the reveal →'
            }
            onContinue={() => dispatch({ type: 'DISMISS_FEEDBACK' })}
          />
        )}
      </main>
    </div>
  );
}
