import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  current: number; // 1-based
  total: number;
  scenarioIndex: 0 | 1;
}

export function ProgressBar({
  current,
  total,
  scenarioIndex,
}: ProgressBarProps) {
  const pct = ((current - 1 + (scenarioIndex === 1 ? 0.5 : 0)) / total) * 100;

  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Heuristic ${current} of ${total}`}
        />
      </div>
      <div className={styles.dots}>
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={[
              styles.dot,
              i < current - 1 ? styles.done : "",
              i === current - 1 ? styles.active : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}
