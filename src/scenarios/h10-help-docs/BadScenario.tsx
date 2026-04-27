import { useState } from 'react';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

// BAD: settings with no explanations, no tooltips, no help
export function BadScenario({ onTaskComplete }: ScenarioProps) {
  const [twoFa, setTwoFa] = useState(false);
  const [done, setDone] = useState(false);

  function handleToggle() {
    setTwoFa(true);
    setDone(true);
    setTimeout(onTaskComplete, 700);
  }

  return (
    <div className={s.app}>
      <div className={s.toolbar}>
        <span>🔐</span>
        <span className={s.toolbarTitle}>Security Settings</span>
      </div>
      <div className={s.body}>
        <div className={s.card}>
          {/* No explanation of what 2FA is or why it matters */}
          <div className={`${s.row} ${s.spaceBetween}`}>
            <span className={s.label}>2FA</span>
            <button
              onClick={handleToggle}
              style={{
                width:44, height:24, borderRadius:12,
                background: twoFa ? '#6c63ff' : '#e2e8f0',
                border:'none', cursor:'pointer', transition:'background 200ms',
                position:'relative',
              }}
            >
              <span style={{
                position:'absolute', top:2, width:20, height:20,
                borderRadius:'50%', background:'#fff',
                transition:'left 200ms',
                left: twoFa ? 22 : 2,
              }} />
            </button>
          </div>
        </div>

        <div className={s.card}>
          {/* Cryptic options, no help */}
          <div className={`${s.row} ${s.spaceBetween}`} style={{ marginBottom:10 }}>
            <span className={s.label}>TOTP</span>
            <button style={{ ...toggleBase(false) }} />
          </div>
          <div className={`${s.row} ${s.spaceBetween}`} style={{ marginBottom:10 }}>
            <span className={s.label}>FIDO2</span>
            <button style={{ ...toggleBase(false) }} />
          </div>
          <div className={`${s.row} ${s.spaceBetween}`}>
            <span className={s.label}>OTP via SMS</span>
            <button style={{ ...toggleBase(false) }} />
          </div>
        </div>

        {done && (
          <div className={s.alertSuccess}>✅ Setting updated.</div>
        )}
      </div>
    </div>
  );
}

function toggleBase(active: boolean): React.CSSProperties {
  return {
    width:44, height:24, borderRadius:12,
    background: active ? '#6c63ff' : '#e2e8f0',
    border:'none', cursor:'pointer', position:'relative' as const,
  };
}
