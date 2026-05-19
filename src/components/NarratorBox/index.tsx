import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useAudio } from "../../hooks/useAudio";
import { useLang } from "../../hooks/useLang";
import type { Lang } from "../../types/game";
import styles from "./NarratorBox.module.css";

interface NarratorBoxProps {
  text: string;
  audioSrc?: Partial<Record<Lang, string>>;
  showContinue?: boolean;
  continueLabel?: string;
  onContinue?: () => void;
  className?: string;
}

export function NarratorBox({
  text,
  audioSrc,
  showContinue = false,
  continueLabel,
  onContinue,
  className = "",
}: NarratorBoxProps) {
  const { lang } = useLang();
  const { t } = useTranslation();
  const pausedRef = useRef(false);

  const resolvedAudio = audioSrc?.[lang];
  const { play, stop, pause, resume, isPlaying } = useAudio({
    startPlaying: !!resolvedAudio,
  });

  useEffect(() => {
    pausedRef.current = false;
    if (resolvedAudio) {
      play(resolvedAudio);
    }
    return () => stop();
  }, [resolvedAudio, play, stop]);

  const handleToggle = () => {
    if (isPlaying) {
      pause();
      pausedRef.current = true;
    } else if (pausedRef.current) {
      resume();
      pausedRef.current = false;
    } else if (resolvedAudio) {
      play(resolvedAudio);
      pausedRef.current = false;
    }
  };

  const handleRestart = () => {
    if (resolvedAudio) {
      play(resolvedAudio);
      pausedRef.current = false;
    }
  };

  return (
    <div className={`${styles.box} ${className}`}>
      <div className={styles.avatar} aria-hidden="true">
        🎙
      </div>
      <div className={styles.content}>
        <span className={styles.label}>{t("narrator.label")}</span>
        <p className={styles.text}>{text}</p>
        {showContinue && (
          <button className={styles.continueBtn} onClick={onContinue}>
            {continueLabel ?? t("narrator.continue")}
          </button>
        )}
      </div>
      {resolvedAudio && (
        <div className={styles.audioControls}>
          <button
            className={styles.audioBtn}
            onClick={handleRestart}
            title={t("narrator.restart")}
            aria-label={t("narrator.restart")}
          >
            ↺
          </button>
          <button
            className={styles.audioBtn}
            onClick={handleToggle}
            title={isPlaying ? t("narrator.pause") : t("narrator.play")}
            aria-label={isPlaying ? t("narrator.pause") : t("narrator.play")}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
        </div>
      )}
    </div>
  );
}
