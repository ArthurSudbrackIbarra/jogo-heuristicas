import { useState } from 'react';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

// BAD: one-click permanent deletion, no confirmation
export function BadScenario({ onTaskComplete }: ScenarioProps) {
  const [deleted, setDeleted] = useState(false);

  function handleDelete() {
    setDeleted(true);
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
          <div style={{ marginTop:16 }}>
            {!deleted ? (
              <button className={`${s.btn} ${s.btnDanger}`} onClick={handleDelete}>
                Delete Account
              </button>
            ) : (
              <div className={s.alertError}>
                ❌ Account deleted. All data has been permanently removed.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
