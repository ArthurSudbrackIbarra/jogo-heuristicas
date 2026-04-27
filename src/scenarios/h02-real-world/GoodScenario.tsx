import { useState } from 'react';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

// GOOD: language and metaphors match the user's mental model
export function GoodScenario({ onTaskComplete }: ScenarioProps) {
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(onTaskComplete, 900);
  }

  return (
    <div className={s.app}>
      <div className={s.toolbar}>
        <span>📝</span>
        <span className={s.toolbarTitle}>Document Editor</span>
        <span className={s.muted} style={{ fontSize:11 }}>
          {saved ? '✓ All changes saved' : 'Unsaved changes'}
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

        {/* Familiar, friendly actions */}
        <div className={s.card}>
          <p className={s.label} style={{ marginBottom:12 }}>
            What would you like to do?
          </p>
          <div className={s.col} style={{ gap:8 }}>
            <button className={`${s.btn} ${s.btnPrimary}`} onClick={handleSave}>
              💾 Save
            </button>
            <button className={`${s.btn} ${s.btnSecondary}`} style={{ opacity:0.6 }}>
              ☁️ Save to Cloud
            </button>
            <button className={`${s.btn} ${s.btnDanger}`} style={{ opacity:0.6 }}>
              ✕ Discard changes
            </button>
          </div>
        </div>

        {saved && (
          <div className={s.alertSuccess}>
            ✅ Document saved! Your changes are safe.
          </div>
        )}
      </div>
    </div>
  );
}
