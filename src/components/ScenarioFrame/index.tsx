import type { ReactNode } from 'react';
import styles from './ScenarioFrame.module.css';

interface ScenarioFrameProps {
  title: string;
  children: ReactNode;
  /** Blur/disable interaction during feedback phase */
  disabled?: boolean;
}

export function ScenarioFrame({ title, children, disabled = false }: ScenarioFrameProps) {
  return (
    <div className={`${styles.shell} ${disabled ? styles.disabled : ''}`}>
      {/* Fake OS title bar */}
      <div className={styles.titleBar}>
        <div className={styles.trafficLights} aria-hidden="true">
          <span className={styles.red} />
          <span className={styles.yellow} />
          <span className={styles.green} />
        </div>
        <span className={styles.titleText}>{title}</span>
        <div className={styles.spacer} />
      </div>

      {/* Fake address/tab bar */}
      <div className={styles.addressBar} aria-hidden="true">
        <div className={styles.url}>
          <span className={styles.lockIcon}>🔒</span>
          <span>app.example.com</span>
        </div>
      </div>

      {/* Scenario content */}
      <div className={styles.content} aria-busy={disabled}>
        {children}
        {disabled && <div className={styles.overlay} aria-hidden="true" />}
      </div>
    </div>
  );
}
