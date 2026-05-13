import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

// BAD: settings with no explanations, no tooltips, no help
export function BadScenario({ onTaskComplete }: ScenarioProps) {
  const { t } = useTranslation();
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
        <span className={s.toolbarTitle}>{t('scenarios.h10.toolbarTitle')}</span>
      </div>
      <div className={s.body}>
        <div className={s.card}>
          {/* No explanation of what 2FA is or why it matters */}
          <div className={`${s.row} ${s.spaceBetween}`}>
            <span className={s.label}>{t('scenarios.h10.bad.label2FA')}</span>
            <button
              onClick={handleToggle}
              style={{
                width: 44, height: 24, borderRadius: 12,
                background: twoFa ? '#6c63ff' : '#e2e8f0',
                border: 'none', cursor: 'pointer', transition: 'background 200ms',
                position: 'relative',
              }}
            >
              <span style={{
                position: 'absolute', top: 2, width: 20, height: 20,
                borderRadius: '50%', background: '#fff',
                transition: 'left 200ms',
                left: twoFa ? 22 : 2,
              }} />
            </button>
          </div>
        </div>

        <div className={s.card}>
          {/* Cryptic options, no help */}
          <div className={`${s.row} ${s.spaceBetween}`} style={{ marginBottom: 10 }}>
            <span className={s.label}>{t('scenarios.h10.bad.labelTOTP')}</span>
            <button style={{ ...toggleBase(false) }} />
          </div>
          <div className={`${s.row} ${s.spaceBetween}`} style={{ marginBottom: 10 }}>
            <span className={s.label}>{t('scenarios.h10.bad.labelFIDO')}</span>
            <button style={{ ...toggleBase(false) }} />
          </div>
          <div className={`${s.row} ${s.spaceBetween}`}>
            <span className={s.label}>{t('scenarios.h10.bad.labelOTP')}</span>
            <button style={{ ...toggleBase(false) }} />
          </div>
        </div>

        {done && (
          <div className={s.alertSuccess}>{t('scenarios.h10.bad.alertUpdated')}</div>
        )}
      </div>
    </div>
  );
}

function toggleBase(active: boolean): React.CSSProperties {
  return {
    width: 44, height: 24, borderRadius: 12,
    background: active ? '#6c63ff' : '#e2e8f0',
    border: 'none', cursor: 'pointer', position: 'relative' as const,
  };
}
