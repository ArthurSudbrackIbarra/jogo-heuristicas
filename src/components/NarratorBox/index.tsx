import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAudio } from '../../hooks/useAudio';
import { useLang } from '../../hooks/useLang';
import type { Lang } from '../../types/game';
import styles from './NarratorBox.module.css';

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
  className = '',
}: NarratorBoxProps) {
  const { play, stop } = useAudio();
  const { lang } = useLang();
  const { t } = useTranslation();

  const resolvedAudio = audioSrc?.[lang];

  useEffect(() => {
    if (resolvedAudio) {
      play(resolvedAudio);
    }
    return () => stop();
  }, [resolvedAudio, play, stop]);

  return (
    <div className={`${styles.box} ${className}`}>
      <div className={styles.avatar} aria-hidden="true">
        🎙
      </div>
      <div className={styles.content}>
        <span className={styles.label}>{t('narrator.label')}</span>
        <p className={styles.text}>{text}</p>
        {showContinue && (
          <button className={styles.continueBtn} onClick={onContinue}>
            {continueLabel ?? t('narrator.continue')}
          </button>
        )}
      </div>
    </div>
  );
}
