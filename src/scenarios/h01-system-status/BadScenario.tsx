import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

type Phase = 'idle' | 'sending' | 'done';

export function BadScenario({ onTaskComplete }: ScenarioProps) {
  const { t } = useTranslation();
  const [phase, setPhase] = useState<Phase>('idle');
  const [message, setMessage] = useState(t('scenarios.h01.replyText'));

  function handleSend() {
    if (phase !== 'idle') return;
    setPhase('sending');
    // After 3 seconds, "silently" complete — no visible confirmation
    setTimeout(() => {
      setPhase('done');
      setTimeout(onTaskComplete, 800);
    }, 3000);
  }

  return (
    <div className={s.app}>
      <div className={s.toolbar}>
        <span>💬</span>
        <span className={s.toolbarTitle}>{t('scenarios.h01.toolbarTitle')}</span>
      </div>
      <div className={s.body}>
        {/* Chat history */}
        <div className={s.card}>
          <div className={s.col} style={{ gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <span style={{ background: '#f1f5f9', borderRadius: 12, padding: '8px 14px', fontSize: 13, maxWidth: 220 }}>
                {t('scenarios.h01.msgText')}
              </span>
            </div>
          </div>
        </div>

        {/* Compose */}
        <div className={s.card}>
          <textarea
            className={s.input}
            rows={3}
            value={message}
            placeholder={t('scenarios.h01.replyPlaceholder')}
            onChange={e => setMessage(e.target.value)}
            disabled={phase !== 'idle'}
            style={{ width: '100%', resize: 'none' }}
          />
          <div className={`${s.row} ${s.flexEnd}`} style={{ marginTop: 10 }}>
            {/* Send button — goes back to normal with NO feedback */}
            <button
              className={`${s.btn} ${s.btnPrimary}`}
              onClick={handleSend}
              disabled={phase === 'sending'}
            >
              {t('scenarios.h01.btnSend')}
            </button>
          </div>
          {/* No loading indicator, no confirmation, nothing */}
        </div>
      </div>
    </div>
  );
}
