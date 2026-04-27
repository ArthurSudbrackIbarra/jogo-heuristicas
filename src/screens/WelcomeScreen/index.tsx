import { Button } from '../../components/Button';
import styles from './WelcomeScreen.module.css';
import { useGame } from '../../context/GameContext';

export function WelcomeScreen() {
  const { dispatch } = useGame();

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {/* Logo/icon */}
        <div className={styles.icon} aria-hidden="true">🧠</div>

        <div className={styles.header}>
          <span className={styles.eyebrow}>Interactive Learning Game</span>
          <h1 className={styles.title}>Nielsen's 10 Heuristics</h1>
          <p className={styles.subtitle}>
            Experience what good and bad UI design feels like — hands on. You'll
            complete 10 pairs of tasks, each designed to show one heuristic being
            respected and violated. A narrator will guide you through every step.
          </p>
        </div>

        {/* What to expect */}
        <div className={styles.features}>
          {[
            { icon: '🎯', text: 'Complete real-feeling UI tasks' },
            { icon: '⚡', text: 'Feel the difference between good and bad UX' },
            { icon: '🎙', text: 'Narrator commentary after each scenario' },
            { icon: '📚', text: 'Learn all 10 Nielsen Heuristics' },
          ].map(({ icon, text }) => (
            <div key={text} className={styles.feature}>
              <span className={styles.featureIcon}>{icon}</span>
              <span className={styles.featureText}>{text}</span>
            </div>
          ))}
        </div>

        <Button size="lg" onClick={() => dispatch({ type: 'START_GAME' })}>
          Start the game →
        </Button>

        <p className={styles.hint}>~15 minutes · 10 heuristics · 20 scenarios</p>
      </div>

      {/* Decorative background blobs */}
      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />
    </div>
  );
}
