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
  coinsAfterThis: number;
  onNext: () => void;
}

export function HeuristicReveal({
  heuristic,
  isLast,
  coinsAfterThis,
  onNext,
}: HeuristicRevealProps) {
  const { t } = useTranslation();
  const { pick } = useLang();
  const remaining = 100 - coinsAfterThis;
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

        {/* Coin progress */}
        <div className={styles.coinSection}>
          <div className={styles.coinHeader}>
            <span className={styles.coinEarned}>{t("reveal.coinsEarned")}</span>
            <span className={styles.coinCount}>
              {t("reveal.coinsProgress", { coins: coinsAfterThis })}
            </span>
          </div>
          <div className={styles.coinTrack}>
            <div
              className={styles.coinFill}
              style={{ width: `${coinsAfterThis}%` }}
              role="progressbar"
              aria-valuenow={coinsAfterThis}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <p className={styles.coinMessage}>
            {remaining > 0
              ? t("reveal.coinsRemaining", { remaining })
              : t("reveal.coinsReady")}
          </p>
        </div>

        <Button size="lg" onClick={onNext} className={styles.nextBtn}>
          {isLast ? t("reveal.seeResults") : t("reveal.nextHeuristic")}
        </Button>
      </div>
    </div>
  );
}
