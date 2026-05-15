import { useTranslation } from "react-i18next";
import { useGame } from "../../context/GameContext";
import { useLang } from "../../hooks/useLang";
import { Button } from "../../components/Button";
import { heuristics } from "../../scenarios";
import styles from "./ResultsScreen.module.css";

export function ResultsScreen() {
  const { state, dispatch } = useGame();
  const { t } = useTranslation();
  const { pick } = useLang();

  const totalTime = state.completedEntries.reduce(
    (sum, e) => sum + e.timeMs,
    0,
  );
  const avgTime = Math.round(totalTime / state.completedEntries.length / 1000);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.trophy} aria-hidden="true">
          🏆
        </div>

        <div className={styles.header}>
          <h1 className={styles.title}>{t("results.title")}</h1>
          <p className={styles.subtitle}>{t("results.subtitle")}</p>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>10</span>
            <span className={styles.statLabel}>
              {t("results.stats.heuristics")}
            </span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>20</span>
            <span className={styles.statLabel}>
              {t("results.stats.scenarios")}
            </span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>{avgTime}s</span>
            <span className={styles.statLabel}>
              {t("results.stats.avgTime")}
            </span>
          </div>
        </div>

        <div className={styles.heuristicList}>
          <h2 className={styles.listTitle}>{t("results.learned")}</h2>
          <div className={styles.list}>
            {heuristics.map((h) => (
              <div key={h.id} className={styles.listItem}>
                <span className={styles.listNum}>{h.id}</span>
                <div className={styles.listInfo}>
                  <strong className={styles.listName}>{pick(h.name)}</strong>
                  <span className={styles.listTagline}>{pick(h.tagline)}</span>
                </div>
                <span
                  className={styles.checkmark}
                  aria-label={t("heuristic.completed")}
                >
                  ✓
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Research questionnaire link */}
        <div className={styles.feedbackSection}>
          <p className={styles.feedbackTitle}>{t("results.feedbackTitle")}</p>
          <p className={styles.feedbackSubtitle}>
            {t("results.feedbackSubtitle")}
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdx1xGikbVJamz3N4_9chJYY4GNHjcVUyo-FTCqWOFFuVsdWw/viewform?usp=dialog"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.feedbackLink}
          >
            {t("results.feedbackCta")}
          </a>
        </div>

        <div className={styles.actions}>
          <Button size="lg" onClick={() => dispatch({ type: "RESTART" })}>
            {t("results.playAgain")}
          </Button>
        </div>
      </div>
    </div>
  );
}
