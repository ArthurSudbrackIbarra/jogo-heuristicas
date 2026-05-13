import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

// GOOD: select word to get contextual toolbar — recognize, don't recall
export function GoodScenario({ onTaskComplete }: ScenarioProps) {
  const { t } = useTranslation();
  const [pressing, setPressing] = useState(false);
  const [selected, setSelected] = useState(false);
  const [bold, setBold] = useState(false);

  function handleBold() {
    setBold(true);
    setSelected(false);
    setTimeout(onTaskComplete, 800);
  }

  const toolbarStyle: React.CSSProperties = {
    position: 'absolute',
    top: -44,
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: 8,
    padding: '4px 6px',
    display: 'flex',
    gap: 2,
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    zIndex: 10,
    whiteSpace: 'nowrap',
  };

  const toolBtnStyle: React.CSSProperties = {
    padding: '4px 10px',
    borderRadius: 4,
    border: 'none',
    background: 'transparent',
    color: '#e2e8f0',
    fontSize: 13,
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'background 120ms',
  };

  return (
    <div className={s.app}>
      <div className={s.toolbar}>
        <span>✏️</span>
        <span className={s.toolbarTitle}>{t('scenarios.h06.toolbarTitle')}</span>
      </div>
      <div className={s.body}>
        <div className={s.card}>
          <p className={s.subheading} style={{ marginBottom: 8 }}>{t('scenarios.h06.docLabel')}</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, fontFamily: 'Georgia, serif' }}>
            {t('scenarios.h06.docTextBefore')}{' '}
            <span style={{ position: 'relative', display: 'inline-block' }}>
              {selected && (
                <span style={toolbarStyle}>
                  <button style={{ ...toolBtnStyle, fontStyle: 'italic' }} title="Italic">I</button>
                  <button
                    style={{ ...toolBtnStyle, fontWeight: 800 }}
                    onClick={handleBold}
                    title="Bold"
                  >
                    B
                  </button>
                  <button style={{ ...toolBtnStyle, textDecoration: 'underline' }} title="Underline">U</button>
                </span>
              )}
              <span
                onPointerDown={() => { if (!bold) setPressing(true); }}
                onPointerUp={() => {
                  if (pressing) {
                    setPressing(false);
                    if (!bold) setSelected(true);
                  }
                }}
                onPointerLeave={() => setPressing(false)}
                style={{
                  fontWeight: bold ? 700 : 400,
                  background: pressing ? '#93c5fd' : selected ? '#bfdbfe' : 'transparent',
                  color: (pressing || selected) ? '#1e40af' : 'inherit',
                  borderRadius: 2,
                  padding: '0 2px',
                  cursor: bold ? 'default' : 'pointer',
                  transition: 'background 150ms, color 150ms, font-weight 150ms',
                  userSelect: 'none',
                }}
              >
                {t('scenarios.h06.docTextWord')}
              </span>
            </span>{' '}
            {t('scenarios.h06.docTextAfter')}
          </p>
        </div>

        {!bold && !selected && (
          <div className={s.alertInfo}>
            {t('scenarios.h06.good.alertSelectWord')}
          </div>
        )}

        {selected && (
          <div className={s.alertInfo}>
            {t('scenarios.h06.good.alertSelected')}
          </div>
        )}

        {bold && (
          <div className={s.alertSuccess}>
            {t('scenarios.h06.good.alertDone')}
          </div>
        )}
      </div>
    </div>
  );
}
