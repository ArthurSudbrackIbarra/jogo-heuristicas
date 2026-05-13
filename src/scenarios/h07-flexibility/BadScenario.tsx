import { useState } from 'react';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

const MESSAGES = [
  { from: 'Alice', preview: 'Are you free this weekend?', body: 'Hey! I was wondering if you are free this weekend. We were thinking about going to the park — let me know! 😊' },
  { from: 'Bob', preview: 'The meeting notes are ready', body: 'Hi team, I just finished writing up the meeting notes from yesterday. You can find them in the shared folder under "Q3 Planning". Let me know if anything is missing.' },
  { from: 'Carol', preview: 'Thanks for the presentation!', body: 'Just wanted to say — your presentation today was fantastic! Really clear and well-prepared. The team was very impressed. Great job! 🎉' },
];

// BAD: must open each notification individually (2 clicks each) — no bulk action
export function BadScenario({ onTaskComplete }: ScenarioProps) {
  const [read, setRead] = useState<boolean[]>([false, false, false]);
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);

  function openNotification(i: number) {
    setOpenedIndex(i);
  }

  function markRead(i: number) {
    const next = [...read];
    next[i] = true;
    setRead(next);
    setOpenedIndex(null);
    if (next.every(Boolean)) setTimeout(onTaskComplete, 500);
  }

  const openMsg = openedIndex !== null ? MESSAGES[openedIndex] : null;

  return (
    <div className={s.app} style={{ position: 'relative' }}>
      <div className={s.toolbar}>
        <span>🔔</span>
        <span className={s.toolbarTitle}>
          Notifications ({read.filter(r => !r).length} unread)
        </span>
        {/* No "mark all as read" button */}
      </div>
      <div className={s.body}>
        <p className={s.muted} style={{ fontSize: 12 }}>
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
                width: 8, height: 8, borderRadius: '50%',
                background: read[i] ? 'transparent' : '#6c63ff',
                flexShrink: 0,
              }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600 }}>{m.from}</p>
                <p className={s.muted}>{m.preview}</p>
              </div>
              {!read[i] ? (
                <button
                  className={`${s.btn} ${s.btnSecondary}`}
                  style={{ fontSize: 11, padding: '4px 10px' }}
                  onClick={() => openNotification(i)}
                >
                  Open
                </button>
              ) : (
                <span style={{ fontSize: 12, color: '#22c55e' }}>✓ Read</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal for opened notification */}
      {openMsg !== null && openedIndex !== null && (
        <div className={s.modalOverlay}>
          <div className={s.modal}>
            <p className={s.modalTitle}>📩 {openMsg.from}</p>
            <p className={s.modalBody}>{openMsg.body}</p>
            <div className={`${s.row} ${s.flexEnd}`}>
              <button
                className={`${s.btn} ${s.btnPrimary}`}
                style={{ fontSize: 13 }}
                onClick={() => markRead(openedIndex)}
              >
                ✓ Mark as read
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
