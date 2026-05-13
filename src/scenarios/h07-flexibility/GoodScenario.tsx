import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

// GOOD: "Mark all as read" bulk action + individual option
export function GoodScenario({ onTaskComplete }: ScenarioProps) {
  const { t } = useTranslation();
  const [read, setRead] = useState<boolean[]>([false, false, false]);
  const allRead = read.every(Boolean);

  const MESSAGES = [
    { from: t('scenarios.h07.msg1From'), preview: t('scenarios.h07.msg1Preview') },
    { from: t('scenarios.h07.msg2From'), preview: t('scenarios.h07.msg2Preview') },
    { from: t('scenarios.h07.msg3From'), preview: t('scenarios.h07.msg3Preview') },
  ];

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
          {t('scenarios.h07.toolbarTitle', { unread: read.filter(r => !r).length })}
        </span>
        {/* Power-user shortcut: mark all */}
        {!allRead && (
          <button
            className={`${s.btn} ${s.btnSecondary}`}
            style={{ fontSize: 12, padding: '4px 12px' }}
            onClick={markAllRead}
          >
            {t('scenarios.h07.good.btnMarkAll')}
          </button>
        )}
      </div>
      <div className={s.body}>
        <p className={s.muted} style={{ fontSize: 12 }}>
          {t('scenarios.h07.good.instruction')}
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
                  onClick={() => markRead(i)}
                >
                  {t('scenarios.h07.good.btnDismiss')}
                </button>
              ) : (
                <span style={{ fontSize: 12, color: '#22c55e' }}>✓</span>
              )}
            </div>
          ))}
        </div>

        {allRead && (
          <div className={s.alertSuccess}>
            {t('scenarios.h07.good.alertDone')}
          </div>
        )}
      </div>
    </div>
  );
}
