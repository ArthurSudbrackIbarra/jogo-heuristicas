import { useState } from 'react';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

type Phase = 'idle' | 'confirming' | 'deleted';

// GOOD: multiple confirmation layers before destructive action
export function GoodScenario({ onTaskComplete }: ScenarioProps) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [typed, setTyped] = useState('');
  const [checked, setChecked] = useState(false);

  const canConfirm = typed === 'DELETE' && checked;

  function handleConfirm() {
    if (!canConfirm) return;
    setPhase('deleted');
    setTimeout(onTaskComplete, 1000);
  }

  return (
    <div className={s.app}>
      <div className={s.toolbar}>
        <span>⚙️</span>
        <span className={s.toolbarTitle}>Account Settings</span>
      </div>
      <div className={s.body}>
        <div className={s.card}>
          <p className={s.subheading}>Danger Zone</p>
          <p className={s.muted} style={{ marginTop:6 }}>
            Permanently delete your account and all associated data.
          </p>
          {phase === 'idle' && (
            <button
              className={`${s.btn} ${s.btnSecondary}`}
              style={{ marginTop:16, borderColor:'#fca5a5', color:'#ef4444' }}
              onClick={() => setPhase('confirming')}
            >
              Delete Account…
            </button>
          )}
        </div>

        {phase === 'confirming' && (
          <div className={s.card} style={{ borderColor:'#fca5a5' }}>
            <p className={s.subheading} style={{ color:'#ef4444' }}>
              ⚠️ Are you absolutely sure?
            </p>
            <p className={s.muted} style={{ marginTop:6 }}>
              This action is <strong>permanent and irreversible</strong>. All your
              data, projects and history will be deleted immediately.
            </p>

            <div className={s.formGroup} style={{ marginTop:16 }}>
              <label className={s.label}>
                Type <code style={{ background:'#f1f5f9', padding:'1px 5px', borderRadius:4 }}>DELETE</code> to confirm:
              </label>
              <input
                className={s.input}
                value={typed}
                onChange={e => setTyped(e.target.value)}
                placeholder="Type DELETE here"
              />
            </div>

            <label style={{ display:'flex', alignItems:'center', gap:8, marginTop:12, cursor:'pointer', fontSize:13 }}>
              <input
                type="checkbox"
                checked={checked}
                onChange={e => setChecked(e.target.checked)}
              />
              I understand this action cannot be undone
            </label>

            <div className={s.row} style={{ marginTop:16, gap:8 }}>
              <button
                className={`${s.btn} ${s.btnSecondary}`}
                onClick={() => { setPhase('idle'); setTyped(''); setChecked(false); }}
              >
                Cancel
              </button>
              <button
                className={`${s.btn} ${s.btnDanger}`}
                onClick={handleConfirm}
                disabled={!canConfirm}
              >
                Permanently delete account
              </button>
            </div>
          </div>
        )}

        {phase === 'deleted' && (
          <div className={s.alertError}>
            ❌ Account deleted. (In a real app this would be permanent.)
          </div>
        )}
      </div>
    </div>
  );
}
