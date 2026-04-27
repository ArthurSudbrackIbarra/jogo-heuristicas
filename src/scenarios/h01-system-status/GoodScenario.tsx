import { useState, useEffect } from 'react';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

type Phase = 'idle' | 'sending' | 'done';

export function GoodScenario({ onTaskComplete }: ScenarioProps) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('Hey Ana! Are we still on for dinner tonight?');

  useEffect(() => {
    if (phase !== 'sending') return;
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 8;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (progress >= 100 && phase === 'sending') {
      setTimeout(() => {
        setPhase('done');
        setTimeout(onTaskComplete, 1200);
      }, 200);
    }
  }, [progress, phase, onTaskComplete]);

  function handleSend() {
    if (phase !== 'idle') return;
    setPhase('sending');
    setProgress(0);
  }

  return (
    <div className={s.app}>
      <div className={s.toolbar}>
        <span>💬</span>
        <span className={s.toolbarTitle}>Messages — Ana</span>
        {phase === 'sending' && (
          <span className={s.muted} style={{ fontSize:12, display:'flex', alignItems:'center', gap:6 }}>
            <span className={s.spinner} style={{ width:14, height:14 }} />
            Sending…
          </span>
        )}
        {phase === 'done' && (
          <span style={{ fontSize:12, color:'#22c55e', fontWeight:600 }}>✓ Delivered</span>
        )}
      </div>
      <div className={s.body}>
        {/* Chat history */}
        <div className={s.card}>
          <div className={s.col} style={{ gap:10 }}>
            <div style={{ display:'flex', justifyContent:'flex-start' }}>
              <span style={{ background:'#f1f5f9', borderRadius:12, padding:'8px 14px', fontSize:13, maxWidth:220 }}>
                Hey! Yeah, dinner sounds great 😊
              </span>
            </div>
            {phase === 'done' && (
              <div style={{ display:'flex', justifyContent:'flex-end' }}>
                <span style={{ background:'#6c63ff', color:'#fff', borderRadius:12, padding:'8px 14px', fontSize:13, maxWidth:220 }}>
                  {message}
                </span>
              </div>
            )}
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

          {phase === 'sending' && (
            <div style={{ marginTop:10 }}>
              <div className={`${s.row} ${s.spaceBetween}`} style={{ marginBottom:4 }}>
                <span className={s.muted} style={{ fontSize:12 }}>Sending to Ana…</span>
                <span className={s.muted} style={{ fontSize:12 }}>{progress}%</span>
              </div>
              <div className={s.progressTrack}>
                <div className={s.progressFill} style={{ width:`${progress}%` }} />
              </div>
            </div>
          )}

          <div className={`${s.row} ${s.flexEnd}`} style={{ marginTop:10 }}>
            <button
              className={`${s.btn} ${s.btnPrimary}`}
              onClick={handleSend}
              disabled={phase !== 'idle'}
            >
              {phase === 'idle' ? 'Send' : phase === 'sending' ? 'Sending…' : '✓ Sent!'}
            </button>
          </div>
        </div>

        {phase === 'done' && (
          <div className={s.alertSuccess}>
            ✅ Message delivered to Ana
          </div>
        )}
      </div>
    </div>
  );
}
