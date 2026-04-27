import { useState } from 'react';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

// BAD: no visible toolbar, user must know keyboard shortcuts or commands
export function BadScenario({ onTaskComplete }: ScenarioProps) {
  const [typed, setTyped] = useState('');
  const [applied, setApplied] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempts, setAttempts] = useState(0);

  function handleApply() {
    const trimmed = typed.trim().toLowerCase();
    if (trimmed === '/bold' || trimmed === 'bold') {
      setApplied(true);
      setTimeout(onTaskComplete, 800);
    } else {
      setFailed(true);
      setAttempts(a => a + 1);
    }
  }

  function handleGiveUp() {
    onTaskComplete();
  }

  return (
    <div className={s.app}>
      <div className={s.toolbar}>
        <span>✏️</span>
        <span className={s.toolbarTitle}>Text Editor</span>
        {/* No formatting buttons — intentionally empty toolbar */}
      </div>
      <div className={s.body}>
        <div className={s.card}>
          <p className={s.subheading} style={{ marginBottom:8 }}>Your document:</p>
          <p style={{ fontSize:14, lineHeight:1.7, fontFamily:'Georgia, serif' }}>
            The quick brown fox jumps over the lazy dog.
          </p>
        </div>

        {!applied ? (
          <div className={s.card}>
            <p className={s.label}>Enter a formatting command:</p>
            <p className={s.muted} style={{ marginBottom:8 }}>
              (Hint: you need to make the text bold, but there are no buttons…)
            </p>
            <div className={s.row}>
              <input
                className={s.input}
                style={{ flex:1, fontFamily:'monospace' }}
                placeholder="Type a command..."
                value={typed}
                onChange={e => { setTyped(e.target.value); setFailed(false); }}
              />
              <button className={`${s.btn} ${s.btnPrimary}`} onClick={handleApply}>
                Apply
              </button>
            </div>
            {failed && (
              <p style={{ color:'#ef4444', fontSize:13, marginTop:6 }}>
                Unknown command. Try again. (Attempts: {attempts})
              </p>
            )}
            {attempts >= 2 && (
              <button
                className={`${s.btn} ${s.btnSecondary}`}
                style={{ marginTop:10 }}
                onClick={handleGiveUp}
              >
                I can't figure this out → give up
              </button>
            )}
          </div>
        ) : (
          <div className={s.alertSuccess}>
            ✅ Bold applied! (You had to know the command "/bold" by heart.)
          </div>
        )}
      </div>
    </div>
  );
}
