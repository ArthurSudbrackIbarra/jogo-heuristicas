import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../components/Button";
import { useGame } from "../../context/GameContext";
import { useAudio } from "../../hooks/useAudio";
import styles from "./ExpertScreen.module.css";

const STAR_COUNT = 10;

export function ExpertScreen() {
  const { dispatch } = useGame();
  const { t } = useTranslation();
  const { play } = useAudio();

  useEffect(() => {
    play("audios/sound-effects/level-complete-2.mp3");
  }, [play]);

  const stars = Array.from({ length: STAR_COUNT }, (_, i) => i);

  return (
    <div className={styles.wrapper}>
      <div className={styles.starField} aria-hidden="true">
        {stars.map((i) => (
          <span
            key={i}
            className={styles.floatingStar}
            style={{
              left: `${(i * 97) % 100}%`,
              animationDelay: `${(i * 250) % 2500}ms`,
              animationDuration: `${4 + (i % 4)}s`,
            }}
          >
            ⭐
          </span>
        ))}
      </div>

      <div className={styles.content}>
        <div className={styles.crown} aria-hidden="true">
          👑
        </div>

        <div className={styles.starRing} aria-hidden="true">
          {stars.map((i) => (
            <span
              key={i}
              className={styles.ringStar}
              style={{
                transform: `rotate(${(i * 360) / STAR_COUNT}deg) translateY(-110px)`,
                animationDelay: `${i * 90}ms`,
              }}
            >
              ⭐
            </span>
          ))}
        </div>

        <div className={styles.starBadge}>{t("expert.stars")}</div>

        <div className={styles.header}>
          <h1 className={styles.title}>{t("expert.title")}</h1>
          <p className={styles.subtitle}>{t("expert.subtitle")}</p>
        </div>

        <div className={styles.card}>
          <p className={styles.description}>{t("expert.description")}</p>
          <p className={styles.note}>{t("expert.note")}</p>
        </div>

        <Button size="lg" onClick={() => dispatch({ type: "FINISH_EXPERT" })}>
          {t("expert.cta")}
        </Button>
      </div>

      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />
    </div>
  );
}
