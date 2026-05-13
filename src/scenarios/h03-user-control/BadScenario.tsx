import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

type View = 'inbox' | 'deleted';

// BAD: email deleted permanently with no undo and no recovery options
export function BadScenario({ onTaskComplete }: ScenarioProps) {
  const { t } = useTranslation();
  const [view, setView] = useState<View>('inbox');

  return (
    <div className={s.app}>
      <div className={s.toolbar}>
        <span>📧</span>
        <span className={s.toolbarTitle}>{t('scenarios.h03.toolbarTitle')}</span>
      </div>
      <div className={s.body}>
        {view === 'inbox' && (
          <>
            <div className={s.card}>
              <div className={`${s.row} ${s.spaceBetween}`}>
                <div>
                  <p className={s.subheading}>{t('scenarios.h03.emailSender')}</p>
                  <p className={s.muted}>{t('scenarios.h03.emailPreview')}</p>
                </div>
                {/* Delete immediately, no warning */}
                <button
                  className={`${s.btn} ${s.btnDanger}`}
                  style={{ fontSize: 12, padding: '6px 12px' }}
                  onClick={() => setView('deleted')}
                >
                  {t('scenarios.h03.btnDelete')}
                </button>
              </div>
            </div>
            <p className={s.muted} style={{ textAlign: 'center' }}>
              {t('scenarios.h03.oopsMsg')}
            </p>
          </>
        )}

        {view === 'deleted' && (
          <div className={s.centered}>
            <span style={{ fontSize: 40 }}>📭</span>
            <p className={s.heading}>{t('scenarios.h03.bad.inboxEmpty')}</p>
            <p className={s.muted}>{t('scenarios.h03.bad.permanentlyDeleted')}</p>
            <button
              className={`${s.btn} ${s.btnSecondary}`}
              style={{ marginTop: 12 }}
              onClick={onTaskComplete}
            >
              {t('scenarios.h03.bad.btnGiveUp')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
