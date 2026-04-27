import { useState } from 'react';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

type Phase = 'idle' | 'sending' | 'done';

export function BadScenario({ onTaskComplete }: ScenarioProps) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [message, setMessage] = useState('Hey Ana! Are we still on for dinner tonight?');

  function handleSend() {
    if (phase !== 'idle') return;
    setPhase('sending');
    // After 2 seconds, "silently" complete — no visible confirmation
    setTimeout(() => {
      setPhase('done');
      setTimeout(onTaskComplete, 800);
    }, 2000);
  }

  return (
    <div className={s.app}>
      <div className={s.toolbar}>
        <span>💬</span>
        <span className={s.toolbarTitle}>Messages — Ana</span>
      </div>
      <div className={s.body}>
        {/* Chat history */}
        <div className={s.card}>
          <div className={s.col} style={{ gap: 10 }}>
            <div style={{ display:'flex', justifyContent:'flex-start' }}>
              <span style={{ background:'#f1f5f9', borderRadius:12, padding:'8px 14px', fontSize:13, maxWidth:220 }}>
                Hey! Yeah, dinner sounds great 😊
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
            onChange={e => setMessage(e.target.value)}
            disabled={phase !== 'idle'}
            style={{ width:'100%', resize:'none' }}
          />
          <div className={`${s.row} ${s.flexEnd}`} style={{ marginTop: 10 }}>
            {/* Send button — goes back to normal with NO feedback */}
            <button
              className={`${s.btn} ${s.btnPrimary}`}
              onClick={handleSend}
              disabled={phase === 'sending'}
            >
              {phase === 'sending' ? 'Send' : 'Send'}
            </button>
          </div>
          {/* No loading indicator, no confirmation, nothing */}
          {phase === 'done' && (
            <p className={s.muted} style={{ marginTop: 6 }}>
              {/* Intentionally empty — user sees nothing */}
            </p>
          )}
        </div>

        {phase === 'sending' && (
          <p className={s.muted} style={{ textAlign:'center' }}>
            {/* Intentionally blank — no loading feedback */}
          </p>
        )}
      </div>
    </div>
  );
}
