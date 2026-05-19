import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../Button";
import { useLang } from "../../hooks/useLang";
import { useAudio } from "../../hooks/useAudio";
import styles from "./HeuristicReveal.module.css";
import type { HeuristicConfig } from "../../types/game";

interface HeuristicRevealProps {
  heuristic: HeuristicConfig;
  isLast: boolean;
  starsAfterThis: number;
  onNext: () => void;
}

const TOTAL_STARS = 10;

export function HeuristicReveal({
  heuristic,
  isLast,
  starsAfterThis,
  onNext,
}: HeuristicRevealProps) {
  const { t } = useTranslation();
  const { pick } = useLang();
  const remaining = TOTAL_STARS - starsAfterThis;
  const { play } = useAudio();

  useEffect(() => {
    play("audios/sound-effects/level-complete.mp3");
  }, [play]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.badge}>
          <span className={styles.number}>{heuristic.id}</span>
          <span className={styles.badgeLabel}>{t("reveal.badge")}</span>
        </div>

        <h2 className={styles.name}>{pick(heuristic.name)}</h2>
        <p className={styles.tagline}>{pick(heuristic.tagline)}</p>

        <hr className={styles.divider} />

        <p className={styles.description}>{pick(heuristic.description)}</p>

        <div className={styles.comparison}>
          <div className={`${styles.compItem} ${styles.compBad}`}>
            <span className={styles.compIcon}>✗</span>
            <span className={styles.compLabel}>
              {t("reveal.withoutHeuristic")}
            </span>
            <p className={styles.compText}>
              {pick(heuristic.scenarios[0].narratorAfter)}
            </p>
          </div>
          <div className={`${styles.compItem} ${styles.compGood}`}>
            <span className={styles.compIcon}>✓</span>
            <span className={styles.compLabel}>
              {t("reveal.withHeuristic")}
            </span>
            <p className={styles.compText}>
              {pick(heuristic.scenarios[1].narratorAfter)}
            </p>
          </div>
        </div>

        {/* Star progress */}
        <div className={styles.starSection}>
          <div className={styles.starHeader}>
            <span className={styles.starEarned}>{t("reveal.starsEarned")}</span>
            <span className={styles.starCount}>
              {t("reveal.starsProgress", { stars: starsAfterThis })}
            </span>
          </div>
          <div className={styles.starTrack}>
            <div
              className={styles.starFill}
              style={{ width: `${(starsAfterThis / TOTAL_STARS) * 100}%` }}
              role="progressbar"
              aria-valuenow={starsAfterThis}
              aria-valuemin={0}
              aria-valuemax={TOTAL_STARS}
            />
          </div>
          <p className={styles.starMessage}>
            {remaining > 0
              ? t("reveal.starsRemaining", { remaining })
              : t("reveal.starsReady")}
          </p>
        </div>

        <Button size="lg" onClick={onNext} className={styles.nextBtn}>
          {isLast ? t("reveal.seeResults") : t("reveal.nextHeuristic")}
        </Button>
      </div>
    </div>
  );
}
