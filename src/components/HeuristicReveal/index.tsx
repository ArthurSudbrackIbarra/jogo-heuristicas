import { Button } from '../Button';
import styles from './HeuristicReveal.module.css';
import type { HeuristicConfig } from '../../types/game';

interface HeuristicRevealProps {
  heuristic: HeuristicConfig;
  isLast: boolean;
  onNext: () => void;
}

export function HeuristicReveal({ heuristic, isLast, onNext }: HeuristicRevealProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {/* Badge */}
        <div className={styles.badge}>
          <span className={styles.number}>{heuristic.id}</span>
          <span className={styles.badgeLabel}>Nielsen Heuristic</span>
        </div>

        {/* Heuristic info */}
        <h2 className={styles.name}>{heuristic.name}</h2>
        <p className={styles.tagline}>{heuristic.tagline}</p>

        <hr className={styles.divider} />

        <p className={styles.description}>{heuristic.description}</p>

        {/* Good vs Bad comparison */}
        <div className={styles.comparison}>
          <div className={`${styles.compItem} ${styles.compBad}`}>
            <span className={styles.compIcon}>✗</span>
            <span className={styles.compLabel}>Without this heuristic</span>
            <p className={styles.compText}>{heuristic.scenarios[0].narratorAfter}</p>
          </div>
          <div className={`${styles.compItem} ${styles.compGood}`}>
            <span className={styles.compIcon}>✓</span>
            <span className={styles.compLabel}>With this heuristic</span>
            <p className={styles.compText}>{heuristic.scenarios[1].narratorAfter}</p>
          </div>
        </div>

        <Button size="lg" onClick={onNext} className={styles.nextBtn}>
          {isLast ? '🏁 See your results' : 'Next heuristic →'}
        </Button>
      </div>
    </div>
  );
}
