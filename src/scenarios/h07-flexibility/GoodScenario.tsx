import { useState } from 'react';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

const MESSAGES = [
  { from: 'Alice', preview: 'Are you free this weekend?' },
  { from: 'Bob', preview: 'The meeting notes are ready' },
  { from: 'Carol', preview: 'Thanks for the presentation!' },
];

// GOOD: "Mark all as read" bulk action + individual option
export function GoodScenario({ onTaskComplete }: ScenarioProps) {
  const [read, setRead] = useState<boolean[]>([false, false, false]);
  const allRead = read.every(Boolean);

  function markAllRead() {
    setRead([true, true, true]);
    setTimeout(onTaskComplete, 600);
  }

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
        <span className={s.toolbarTitle}>
          Notifications ({read.filter(r => !r).length} unread)
        </span>
        {/* Power-user shortcut: mark all */}
        {!allRead && (
          <button
            className={`${s.btn} ${s.btnSecondary}`}
            style={{ fontSize:12, padding:'4px 12px' }}
            onClick={markAllRead}
          >
            ✓ Mark all as read
          </button>
        )}
      </div>
      <div className={s.body}>
        <p className={s.muted} style={{ fontSize:12 }}>
          Click "Mark all as read" above, or dismiss each one individually.
        </p>
        <div className={s.list}>
          {MESSAGES.map((m, i) => (
            <div
              key={i}
              className={s.listRow}
              style={{
                background: read[i] ? '#f8fafc' : '#fff',
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
                  Dismiss
                </button>
              ) : (
                <span style={{ fontSize:12, color:'#22c55e' }}>✓</span>
              )}
            </div>
          ))}
        </div>

        {allRead && (
          <div className={s.alertSuccess}>
            ✅ All notifications marked as read!
          </div>
        )}
      </div>
    </div>
  );
}
