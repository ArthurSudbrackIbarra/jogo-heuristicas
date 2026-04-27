import { useEffect } from 'react';
import { useAudio } from '../../hooks/useAudio';
import styles from './NarratorBox.module.css';

interface NarratorBoxProps {
  text: string;
  audioSrc?: string;
  /** Show 'Continue' button and call onContinue when clicked */
  showContinue?: boolean;
  continueLabel?: string;
  onContinue?: () => void;
  className?: string;
}

export function NarratorBox({
  text,
  audioSrc,
  showContinue = false,
  continueLabel = 'Continue →',
  onContinue,
  className = '',
}: NarratorBoxProps) {
  const { play, stop } = useAudio();

  useEffect(() => {
    if (audioSrc) {
      play(audioSrc);
    }
    return () => stop();
  }, [audioSrc, play, stop]);

  return (
    <div className={`${styles.box} ${className}`}>
      <div className={styles.avatar} aria-hidden="true">
        🎙
      </div>
      <div className={styles.content}>
        <span className={styles.label}>Narrator</span>
        <p className={styles.text}>{text}</p>
        {showContinue && (
          <button className={styles.continueBtn} onClick={onContinue}>
            {continueLabel}
          </button>
        )}
      </div>
    </div>
  );
}
