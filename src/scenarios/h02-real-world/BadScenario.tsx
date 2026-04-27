import { useState } from 'react';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

// BAD: buttons use technical jargon instead of real-world language
export function BadScenario({ onTaskComplete }: ScenarioProps) {
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(onTaskComplete, 800);
  }

  return (
    <div className={s.app}>
      <div className={s.toolbar}>
        <span>📝</span>
        <span className={s.toolbarTitle}>Document Editor</span>
        <span className={s.muted} style={{ fontSize:11 }}>
          {saved ? 'Persistent state: SYNCED' : 'Volatile state: PENDING COMMIT'}
        </span>
      </div>
      <div className={s.body}>
        <div className={s.card}>
          <p className={s.subheading}>Q3 Strategy Report</p>
          <p className={s.muted} style={{ marginTop:6, lineHeight:1.6 }}>
            This document contains our strategic objectives for the upcoming quarter.
            Key initiatives include market expansion and operational efficiency improvements…
          </p>
        </div>

        {/* Jargon-filled action buttons */}
        <div className={s.card}>
          <p className={s.label} style={{ marginBottom:12 }}>
            Persistence operations:
          </p>
          <div className={s.col} style={{ gap:8 }}>
            <button className={`${s.btn} ${s.btnPrimary}`} onClick={handleSave}>
              Serialize &amp; commit to persistent storage layer
            </button>
            <button className={`${s.btn} ${s.btnSecondary}`} style={{ opacity:0.6 }}>
              Synchronize blob to distributed cloud repository
            </button>
            <button className={`${s.btn} ${s.btnDanger}`} style={{ opacity:0.6 }}>
              Discard volatile in-memory state &amp; abort process
            </button>
          </div>
        </div>

        {saved && (
          <div className={s.alertInfo}>
            ℹ️ Entity object serialized. Persistence layer mutation: COMMITTED.
          </div>
        )}
      </div>
    </div>
  );
}
