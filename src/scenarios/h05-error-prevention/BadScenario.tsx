import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

// BAD: one-click permanent deletion, no confirmation
export function BadScenario({ onTaskComplete }: ScenarioProps) {
  const { t } = useTranslation();
  const [deleted, setDeleted] = useState(false);

  function handleDelete() {
    setDeleted(true);
    setTimeout(onTaskComplete, 1000);
  }

  return (
    <div className={s.app}>
      <div className={s.toolbar}>
        <span>⚙️</span>
        <span className={s.toolbarTitle}>{t('scenarios.h05.toolbarTitle')}</span>
      </div>
      <div className={s.body}>
        <div className={s.card}>
          <p className={s.subheading}>{t('scenarios.h05.dangerZone')}</p>
          <p className={s.muted} style={{ marginTop: 6 }}>
            {t('scenarios.h05.deleteDesc')}
          </p>
          <div style={{ marginTop: 16 }}>
            {!deleted ? (
              <button className={`${s.btn} ${s.btnDanger}`} onClick={handleDelete}>
                {t('scenarios.h05.btnDelete')}
              </button>
            ) : (
              <div className={s.alertError}>
                {t('scenarios.h05.bad.alertDeleted')}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
