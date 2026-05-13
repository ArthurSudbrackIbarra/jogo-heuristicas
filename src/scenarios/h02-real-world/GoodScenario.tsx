import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

// GOOD: language and metaphors match the user's mental model
export function GoodScenario({ onTaskComplete }: ScenarioProps) {
  const { t } = useTranslation();
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(onTaskComplete, 900);
  }

  return (
    <div className={s.app}>
      <div className={s.toolbar}>
        <span>📝</span>
        <span className={s.toolbarTitle}>{t('scenarios.h02.toolbarTitle')}</span>
        <span className={s.muted} style={{ fontSize: 11 }}>
          {saved ? t('scenarios.h02.good.statusSaved') : t('scenarios.h02.good.statusUnsaved')}
        </span>
      </div>
      <div className={s.body}>
        <div className={s.card}>
          <p className={s.subheading}>{t('scenarios.h02.docTitle')}</p>
          <p className={s.muted} style={{ marginTop: 6, lineHeight: 1.6 }}>
            {t('scenarios.h02.docBody')}
          </p>
        </div>

        {/* Familiar, friendly actions */}
        <div className={s.card}>
          <p className={s.label} style={{ marginBottom: 12 }}>
            {t('scenarios.h02.good.actionsLabel')}
          </p>
          <div className={s.col} style={{ gap: 8 }}>
            <button className={`${s.btn} ${s.btnPrimary}`} onClick={handleSave}>
              {t('scenarios.h02.good.btnSave')}
            </button>
            <button className={`${s.btn} ${s.btnSecondary}`} style={{ opacity: 0.6 }}>
              {t('scenarios.h02.good.btnCloud')}
            </button>
            <button className={`${s.btn} ${s.btnDanger}`} style={{ opacity: 0.6 }}>
              {t('scenarios.h02.good.btnDiscard')}
            </button>
          </div>
        </div>

        {saved && (
          <div className={s.alertSuccess}>
            {t('scenarios.h02.good.alertSaved')}
          </div>
        )}
      </div>
    </div>
  );
}
