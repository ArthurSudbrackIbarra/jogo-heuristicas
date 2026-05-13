import { useState } from 'react';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

// GOOD: click a word to select it, contextual toolbar appears — recognize, don't recall
export function GoodScenario({ onTaskComplete }: ScenarioProps) {
  const [selected, setSelected] = useState(false);
  const [bold, setBold] = useState(false);

  function handleSelectWord() {
    setSelected(true);
  }

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
        <span className={s.toolbarTitle}>Text Editor</span>
      </div>
      <div className={s.body}>
        <div className={s.card}>
          <p className={s.subheading} style={{ marginBottom: 8 }}>Document:</p>
          <p style={{ fontSize: 14, lineHeight: 1.8, fontFamily: 'Georgia, serif' }}>
            Today's project update includes an{' '}
            <span style={{ position: 'relative', display: 'inline-block' }}>
              {selected && (
                <span style={toolbarStyle}>
                  <button
                    style={{ ...toolBtnStyle, fontWeight: 800 }}
                    onClick={handleBold}
                    title="Bold"
                  >
                    B
                  </button>
                  <button style={{ ...toolBtnStyle, fontStyle: 'italic' }} title="Italic">I</button>
                  <button style={{ ...toolBtnStyle, textDecoration: 'underline' }} title="Underline">U</button>
                </span>
              )}
              <span
                onClick={handleSelectWord}
                style={{
                  fontWeight: bold ? 700 : 400,
                  background: selected ? '#bfdbfe' : 'transparent',
                  color: selected ? '#1e40af' : 'inherit',
                  borderRadius: 2,
                  padding: '0 2px',
                  cursor: bold ? 'default' : 'pointer',
                  transition: 'background 150ms, color 150ms, font-weight 150ms',
                  userSelect: 'none',
                }}
              >
                important
              </span>
            </span>{' '}
            milestone for the team.
          </p>
        </div>

        {!bold && !selected && (
          <div className={s.alertInfo}>
            ℹ️ Click the word <strong>important</strong> in the document to select it.
          </div>
        )}

        {selected && (
          <div className={s.alertInfo}>
            ✨ Word selected! A formatting toolbar appeared — click <strong>B</strong> to make it bold.
          </div>
        )}

        {bold && (
          <div className={s.alertSuccess}>
            ✅ Bold applied! You clicked the word, saw the toolbar appear, and recognized the action — no memorization needed.
          </div>
        )}
      </div>
    </div>
  );
}
