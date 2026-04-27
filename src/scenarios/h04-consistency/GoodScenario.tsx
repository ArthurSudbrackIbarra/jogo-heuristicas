import { useState } from 'react';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

// GOOD: same button labels and positions on every step
const STEPS = ['Personal Info', 'Address', 'Payment', 'Confirm'];

export function GoodScenario({ onTaskComplete }: ScenarioProps) {
  const [step, setStep] = useState(0);

  function next() {
    if (step >= STEPS.length - 1) { onTaskComplete(); return; }
    setStep(s => s + 1);
  }
  function back() { setStep(s => Math.max(0, s - 1)); }

  return (
    <div className={s.app}>
      <div className={s.toolbar}>
        <span>🛒</span>
        <span className={s.toolbarTitle}>Checkout — Step {step + 1} of {STEPS.length}</span>
      </div>
      <div className={s.body}>
        {/* Step indicator */}
        <div className={s.row} style={{ gap:4 }}>
          {STEPS.map((_, i) => (
            <div key={i} style={{
              flex:1, height:4, borderRadius:99,
              background: i <= step ? '#6c63ff' : '#e2e8f0',
              transition:'background 200ms'
            }} />
          ))}
        </div>

        <div className={s.card}>
          <p className={s.subheading}>{STEPS[step]}</p>
          <p className={s.muted} style={{ marginTop:6 }}>
            Fill in your {STEPS[step].toLowerCase()} details here.
          </p>
          <div className={s.formGroup} style={{ marginTop:12 }}>
            <input className={s.input} placeholder="Sample field" defaultValue="" />
          </div>
        </div>

        {/* Buttons: ALWAYS same labels, ALWAYS same layout */}
        <div className={`${s.row} ${s.spaceBetween}`}>
          {step > 0 ? (
            <button className={`${s.btn} ${s.btnSecondary}`} onClick={back}>
              ← Back
            </button>
          ) : <span />}
          <button className={`${s.btn} ${s.btnPrimary}`} onClick={next}>
            {step === STEPS.length - 1 ? 'Confirm order →' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  );
}
