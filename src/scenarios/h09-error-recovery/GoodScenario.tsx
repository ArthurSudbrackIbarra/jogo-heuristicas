import { useState } from 'react';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

// GOOD: clear inline errors that explain exactly what's wrong and how to fix it
export function GoodScenario({ onTaskComplete }: ScenarioProps) {
  const [email, setEmail] = useState('john.doe@');
  const [password, setPassword] = useState('pass123');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [success, setSuccess] = useState(false);

  function validate() {
    const e: { email?: string; password?: string } = {};
    if (!email.includes('@') || !email.includes('.')) {
      e.email = 'Please use a valid format: name@example.com';
    }
    if (password.length < 8) {
      e.password = `Password must be at least 8 characters (currently ${password.length})`;
    }
    return e;
  }

  function handleSubmit() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setSuccess(true);
      setTimeout(onTaskComplete, 800);
    }
  }

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
              className={`${s.input} ${errors.email ? s.error : ''}`}
              value={email}
              onChange={e => { setEmail(e.target.value); setErrors(err => ({ ...err, email: undefined })); }}
              placeholder="you@example.com"
            />
            {errors.email && <p className={s.inputError}>⚠️ {errors.email}</p>}
          </div>
          <div className={s.formGroup} style={{ marginTop:10 }}>
            <label className={s.label}>Password</label>
            <input
              className={`${s.input} ${errors.password ? s.error : ''}`}
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setErrors(err => ({ ...err, password: undefined })); }}
            />
            {errors.password && <p className={s.inputError}>⚠️ {errors.password}</p>}
          </div>
          <button
            className={`${s.btn} ${s.btnPrimary}`}
            style={{ marginTop:14 }}
            onClick={handleSubmit}
          >
            Register
          </button>

          {success && (
            <div className={s.alertSuccess} style={{ marginTop:12 }}>
              ✅ Account created successfully! Welcome aboard.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
