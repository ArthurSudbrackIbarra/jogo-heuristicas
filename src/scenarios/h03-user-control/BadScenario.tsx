import { useState } from 'react';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

type View = 'inbox' | 'deleted' | 'trash' | 'archived';

// BAD: email deleted with no undo — user tries trash and archived (both empty)
export function BadScenario({ onTaskComplete }: ScenarioProps) {
  const [view, setView] = useState<View>('inbox');

  return (
    <div className={s.app}>
      <div className={s.toolbar}>
        <span>📧</span>
        <span className={s.toolbarTitle}>Inbox</span>
      </div>
      <div className={s.body}>
        {view === 'inbox' && (
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
                  style={{ fontSize: 12, padding: '6px 12px' }}
                  onClick={() => setView('deleted')}
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

        {view === 'deleted' && (
          <div className={s.centered}>
            <span style={{ fontSize: 40 }}>📭</span>
            <p className={s.heading}>Inbox empty</p>
            <p className={s.muted}>No emails found.</p>
            <button
              className={`${s.btn} ${s.btnSecondary}`}
              style={{ marginTop: 12 }}
              onClick={() => setView('trash')}
            >
              🗑 Check Trash
            </button>
          </div>
        )}

        {view === 'trash' && (
          <div className={s.centered}>
            <span style={{ fontSize: 40 }}>🗑️</span>
            <p className={s.heading}>Trash</p>
            <p className={s.muted}>
              No items in trash. Emails are deleted immediately and permanently.
            </p>
            <button
              className={`${s.btn} ${s.btnSecondary}`}
              style={{ marginTop: 12 }}
              onClick={() => setView('archived')}
            >
              📁 Check Archived
            </button>
          </div>
        )}

        {view === 'archived' && (
          <div className={s.centered}>
            <span style={{ fontSize: 40 }}>📁</span>
            <p className={s.heading}>Archived</p>
            <p className={s.muted}>No archived emails found.</p>
            <button
              className={`${s.btn} ${s.btnSecondary}`}
              style={{ marginTop: 12 }}
              onClick={onTaskComplete}
            >
              I give up — there's no way to get it back →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
