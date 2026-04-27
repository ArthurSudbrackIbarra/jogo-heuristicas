import { useState } from 'react';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

// BAD: inconsistent button labels and placement across steps
const STEPS = [
  { title: 'Personal Info', back: null,       forward: 'Proceed ›'  },
  { title: 'Address',       back: '‹ Return',  forward: 'Go on ›'   },
  { title: 'Payment',       back: '‹ Go Back', forward: 'Continue →' },
  { title: 'Confirm',       back: '‹ Previous',forward: 'Submit Now' },
];

export function BadScenario({ onTaskComplete }: ScenarioProps) {
  const [step, setStep] = useState(0);

  function next() {
    if (step >= STEPS.length - 1) { onTaskComplete(); return; }
    setStep(s => s + 1);
  }
  function back() { setStep(s => Math.max(0, s - 1)); }

  const current = STEPS[step];

  return (
    <div className={s.app}>
      <div className={s.toolbar}>
        <span>🛒</span>
        <span className={s.toolbarTitle}>Checkout — Step {step + 1} of {STEPS.length}</span>
      </div>
      <div className={s.body}>
        {/* Step indicator */}
        <div className={s.row} style={{ gap:4 }}>
          {STEPS.map((_st, i) => (
            <div key={i} style={{
              flex:1, height:4, borderRadius:99,
              background: i <= step ? '#6c63ff' : '#e2e8f0',
              transition:'background 200ms'
            }} />
          ))}
        </div>

        <div className={s.card}>
          <p className={s.subheading}>{current.title}</p>
          <p className={s.muted} style={{ marginTop:6 }}>
            Fill in your {current.title.toLowerCase()} details here.
          </p>
          <div className={s.formGroup} style={{ marginTop:12 }}>
            <input className={s.input} placeholder="Sample field" defaultValue="" />
          </div>
        </div>

        {/* Buttons: inconsistent labels AND placement changes each step */}
        <div style={{
          display:'flex',
          flexDirection: step % 2 === 0 ? 'row' : 'row-reverse',
          justifyContent:'space-between',
          gap:8
        }}>
          {current.back ? (
            <button className={`${s.btn} ${s.btnSecondary}`} onClick={back}>
              {current.back}
            </button>
          ) : <span />}
          <button className={`${s.btn} ${s.btnPrimary}`} onClick={next}>
            {current.forward}
          </button>
        </div>
      </div>
    </div>
  );
}
