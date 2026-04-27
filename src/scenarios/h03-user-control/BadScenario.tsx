import { useState } from 'react';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

type EmailState = 'inbox' | 'deleted';

// BAD: accidental deletion with no undo or escape
export function BadScenario({ onTaskComplete }: ScenarioProps) {
  const [emailState, setEmailState] = useState<EmailState>('inbox');
  const [attempts, setAttempts] = useState(0);

  function handleDelete() {
    setEmailState('deleted');
  }

  function handleGiveUp() {
    setAttempts(a => a + 1);
    if (attempts >= 1) onTaskComplete();
  }

  return (
    <div className={s.app}>
      <div className={s.toolbar}>
        <span>📧</span>
        <span className={s.toolbarTitle}>Inbox</span>
      </div>
      <div className={s.body}>
        {emailState === 'inbox' ? (
          <>
            <div className={s.card}>
              <div className={`${s.row} ${s.spaceBetween}`}>
                <div>
                  <p className={s.subheading}>HR Team</p>
                  <p className={s.muted}>Your contract renewal — please review</p>
                </div>
                {/* Delete immediately, no warning */}
                <button
                  className={`${s.btn} ${s.btnDanger}`}
                  style={{ fontSize:12, padding:'6px 12px' }}
                  onClick={handleDelete}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
            <p className={s.muted} style={{ textAlign:'center' }}>
              Oops! You just deleted that email by accident. Can you get it back?
            </p>
          </>
        ) : (
          <div className={s.centered}>
            <span style={{ fontSize:40 }}>📭</span>
            <p className={s.heading}>Inbox empty</p>
            <p className={s.muted}>No emails found.</p>
            {/* No trash, no undo, no recovery */}
            <button
              className={`${s.btn} ${s.btnSecondary}`}
              onClick={handleGiveUp}
            >
              {attempts === 0 ? "I can't get it back..." : "I give up — continue →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
