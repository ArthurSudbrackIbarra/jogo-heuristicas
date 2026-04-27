import { useGame } from '../../context/GameContext';
import { Button } from '../../components/Button';
import { heuristics } from '../../scenarios';
import styles from './ResultsScreen.module.css';

export function ResultsScreen() {
  const { state, dispatch } = useGame();

  const totalTime = state.completedEntries.reduce((sum, e) => sum + e.timeMs, 0);
  const avgTime = Math.round(totalTime / state.completedEntries.length / 1000);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.trophy} aria-hidden="true">🏆</div>

        <div className={styles.header}>
          <h1 className={styles.title}>Congratulations!</h1>
          <p className={styles.subtitle}>
            You've experienced all 10 Nielsen Heuristics — both how they should
            and shouldn't be applied.
          </p>
        </div>

        {/* Summary stats */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>10</span>
            <span className={styles.statLabel}>Heuristics learned</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>20</span>
            <span className={styles.statLabel}>Scenarios completed</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{avgTime}s</span>
            <span className={styles.statLabel}>Avg. task time</span>
          </div>
        </div>

        {/* Heuristic list recap */}
        <div className={styles.heuristicList}>
          <h2 className={styles.listTitle}>What you learned</h2>
          <div className={styles.list}>
            {heuristics.map((h) => (
              <div key={h.id} className={styles.listItem}>
                <span className={styles.listNum}>{h.id}</span>
                <div className={styles.listInfo}>
                  <strong className={styles.listName}>{h.name}</strong>
                  <span className={styles.listTagline}>{h.tagline}</span>
                </div>
                <span className={styles.checkmark} aria-label="Completed">✓</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <Button size="lg" onClick={() => dispatch({ type: 'RESTART' })}>
            Play again
          </Button>
        </div>
      </div>
    </div>
  );
}
