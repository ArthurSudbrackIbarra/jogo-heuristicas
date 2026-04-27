import { useState } from 'react';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

// BAD: cryptic error message, user can't figure out how to fix it
export function BadScenario({ onTaskComplete }: ScenarioProps) {
  const [email, setEmail] = useState('john.doe@');
  const [submitted, setSubmitted] = useState(false);
  const [giveUpShown, setGiveUpShown] = useState(false);
  const [attempts, setAttempts] = useState(0);

  function handleSubmit() {
    setSubmitted(true);
    setAttempts(a => a + 1);
    if (attempts >= 1) setGiveUpShown(true);
  }

  function handleGiveUp() { onTaskComplete(); }

  return (
    <div className={s.app}>
      <div className={s.toolbar}>
        <span>📋</span>
        <span className={s.toolbarTitle}>Registration</span>
      </div>
      <div className={s.body}>
        <div className={s.card}>
          <p className={s.subheading}>Create an account</p>
          <div className={s.formGroup} style={{ marginTop:12 }}>
            <label className={s.label}>Email address</label>
            <input
              className={s.input}
              value={email}
              onChange={e => { setEmail(e.target.value); setSubmitted(false); }}
              placeholder="you@example.com"
            />
          </div>
          <div className={s.formGroup} style={{ marginTop:10 }}>
            <label className={s.label}>Password</label>
            <input className={s.input} type="password" defaultValue="pass123" />
          </div>
          <button
            className={`${s.btn} ${s.btnPrimary}`}
            style={{ marginTop:14 }}
            onClick={handleSubmit}
          >
            Register
          </button>

          {/* Cryptic error */}
          {submitted && (
            <div className={s.alertError} style={{ marginTop:12 }}>
              ❌ Error 422: Unprocessable Entity. Request body validation failed.
              <br/>
              <span style={{ fontSize:11, opacity:0.7 }}>FORM_VALIDATION_ERROR · field[1].format</span>
            </div>
          )}
        </div>

        {giveUpShown && (
          <button className={`${s.btn} ${s.btnSecondary}`} onClick={handleGiveUp}>
            I can't figure out what's wrong → continue
          </button>
        )}
      </div>
    </div>
  );
}
