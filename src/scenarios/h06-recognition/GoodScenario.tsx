import { useState } from 'react';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

type Format = { bold: boolean; italic: boolean };

// GOOD: visible toolbar buttons — recognize, don't recall
export function GoodScenario({ onTaskComplete }: ScenarioProps) {
  const [fmt, setFmt] = useState<Format>({ bold: false, italic: false });
  const [done, setDone] = useState(false);

  function toggle(key: keyof Format) {
    const next = { ...fmt, [key]: !fmt[key] };
    setFmt(next);
    if (next.bold) {
      setDone(true);
      setTimeout(onTaskComplete, 800);
    }
  }

  const btnBase: React.CSSProperties = {
    padding:'4px 10px', borderRadius:6, border:'1px solid #e2e8f0',
    background:'#fff', cursor:'pointer', fontSize:14, fontWeight:600,
    transition:'all 120ms'
  };

  return (
    <div className={s.app}>
      {/* Visible formatting toolbar */}
      <div className={s.toolbar}>
        <span>✏️</span>
        <span className={s.toolbarTitle}>Text Editor</span>
        <div style={{ display:'flex', gap:4 }}>
          <button
            style={{
              ...btnBase,
              fontWeight:700,
              background: fmt.bold ? '#6c63ff' : '#fff',
              color: fmt.bold ? '#fff' : '#374151',
              borderColor: fmt.bold ? '#6c63ff' : '#e2e8f0',
            }}
            onClick={() => toggle('bold')}
            title="Bold (Ctrl+B)"
          >
            B
          </button>
          <button
            style={{
              ...btnBase,
              fontStyle:'italic',
              background: fmt.italic ? '#6c63ff' : '#fff',
              color: fmt.italic ? '#fff' : '#374151',
              borderColor: fmt.italic ? '#6c63ff' : '#e2e8f0',
            }}
            onClick={() => toggle('italic')}
            title="Italic (Ctrl+I)"
          >
            I
          </button>
          <button style={{ ...btnBase, textDecoration:'underline' }} title="Underline (Ctrl+U)">U</button>
          <button style={{ ...btnBase, textDecoration:'line-through' }} title="Strikethrough">S</button>
        </div>
      </div>

      <div className={s.body}>
        <div className={s.card}>
          <p className={s.subheading} style={{ marginBottom:8 }}>Your document:</p>
          <p style={{
            fontSize:14, lineHeight:1.7, fontFamily:'Georgia, serif',
            fontWeight: fmt.bold ? 700 : 400,
            fontStyle: fmt.italic ? 'italic' : 'normal',
          }}>
            The quick brown fox jumps over the lazy dog.
          </p>
        </div>

        {!done ? (
          <div className={s.alertInfo}>
            ℹ️ Click the <strong>B</strong> button in the toolbar above to make the text bold.
          </div>
        ) : (
          <div className={s.alertSuccess}>
            ✅ Bold applied! You just clicked a button you could see — no memorization needed.
          </div>
        )}
      </div>
    </div>
  );
}
