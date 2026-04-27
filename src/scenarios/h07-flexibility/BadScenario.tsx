import { useState } from 'react';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

const MESSAGES = [
  { from: 'Alice', preview: 'Are you free this weekend?' },
  { from: 'Bob', preview: 'The meeting notes are ready' },
  { from: 'Carol', preview: 'Thanks for the presentation!' },
];

// BAD: must open each notification individually, no bulk actions
export function BadScenario({ onTaskComplete }: ScenarioProps) {
  const [read, setRead] = useState<boolean[]>([false, false, false]);

  function markRead(i: number) {
    const next = [...read];
    next[i] = true;
    setRead(next);
    if (next.every(Boolean)) setTimeout(onTaskComplete, 500);
  }

  return (
    <div className={s.app}>
      <div className={s.toolbar}>
        <span>🔔</span>
        <span className={s.toolbarTitle}>Notifications ({read.filter(r => !r).length} unread)</span>
        {/* No "mark all as read" button */}
      </div>
      <div className={s.body}>
        <p className={s.muted} style={{ fontSize:12 }}>
          Open each notification to mark it as read.
        </p>
        <div className={s.list}>
          {MESSAGES.map((m, i) => (
            <div
              key={i}
              className={s.listRow}
              style={{
                background: read[i] ? '#f8fafc' : '#fff',
                borderColor: read[i] ? '#e2e8f0' : '#6c63ff',
                opacity: read[i] ? 0.6 : 1,
              }}
            >
              <div style={{
                width:8, height:8, borderRadius:'50%',
                background: read[i] ? 'transparent' : '#6c63ff',
                flexShrink:0,
              }} />
              <div style={{ flex:1 }}>
                <p style={{ fontSize:13, fontWeight:600 }}>{m.from}</p>
                <p className={s.muted}>{m.preview}</p>
              </div>
              {!read[i] ? (
                <button
                  className={`${s.btn} ${s.btnSecondary}`}
                  style={{ fontSize:11, padding:'4px 10px' }}
                  onClick={() => markRead(i)}
                >
                  Open &amp; Mark read
                </button>
              ) : (
                <span style={{ fontSize:12, color:'#22c55e' }}>✓ Read</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
