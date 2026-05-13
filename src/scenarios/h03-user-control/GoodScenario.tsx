import { useState, useEffect } from 'react';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

type State = 'inbox' | 'deleted-toast' | 'recovered' | 'gone';

// GOOD: undo toast after deletion with a 10-second window
export function GoodScenario({ onTaskComplete }: ScenarioProps) {
  const [state, setState] = useState<State>('inbox');
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (state !== 'deleted-toast') return;
    if (countdown <= 0) {
      setState('gone');
      return;
    }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [state, countdown]);

  function handleDelete() {
    setState('deleted-toast');
    setCountdown(10);
  }

  function handleUndo() {
    setState('recovered');
    setTimeout(onTaskComplete, 900);
  }

  return (
    <div className={s.app}>
      <div className={s.toolbar}>
        <span>📧</span>
        <span className={s.toolbarTitle}>Inbox</span>
      </div>
      <div className={s.body}>
        {state === 'inbox' && (
          <>
            <div className={s.card}>
              <div className={`${s.row} ${s.spaceBetween}`}>
                <div>
                  <p className={s.subheading}>HR Team</p>
                  <p className={s.muted}>Your contract renewal — please review</p>
                </div>
                <button
                  className={`${s.btn} ${s.btnDanger}`}
                  style={{ fontSize: 12, padding: '6px 12px' }}
                  onClick={handleDelete}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
            <p className={s.muted} style={{ textAlign: 'center' }}>
              Oops! You just deleted that email by accident. Can you get it back?
            </p>
          </>
        )}

        {state === 'deleted-toast' && (
          <div className={s.centered}>
            <span style={{ fontSize: 40 }}>📭</span>
            <p className={s.heading}>Inbox empty</p>
            <p className={s.muted}>Email moved to Trash.</p>
          </div>
        )}

        {state === 'recovered' && (
          <div className={s.centered}>
            <div className={s.alertSuccess} style={{ justifyContent: 'center' }}>
              ✅ Email recovered! It's back in your inbox.
            </div>
            <div className={s.card}>
              <p className={s.subheading}>HR Team</p>
              <p className={s.muted}>Your contract renewal — please review</p>
            </div>
          </div>
        )}

        {state === 'gone' && (
          <div className={s.centered}>
            <span style={{ fontSize: 40 }}>📭</span>
            <p className={s.heading}>Email permanently deleted</p>
            <p className={s.muted}>
              The undo window (10s) expired. The email was deleted permanently.
            </p>
            <button
              className={`${s.btn} ${s.btnSecondary}`}
              style={{ marginTop: 12 }}
              onClick={onTaskComplete}
            >
              Continue →
            </button>
          </div>
        )}
      </div>

      {state === 'deleted-toast' && (
        <div className={s.toast}>
          Email deleted
          <button className={s.toastAction} onClick={handleUndo}>
            Undo ({countdown}s)
          </button>
        </div>
      )}
    </div>
  );
}
