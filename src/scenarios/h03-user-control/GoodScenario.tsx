import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

type State = 'inbox' | 'deleted-toast' | 'recovered' | 'gone';

// GOOD: undo toast after deletion with a 10-second window
export function GoodScenario({ onTaskComplete }: ScenarioProps) {
  const { t } = useTranslation();
  const [state, setState] = useState<State>('inbox');
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (state !== 'deleted-toast') return;
    if (countdown <= 0) {
      setState('gone');
      return;
    }
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
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
        <span className={s.toolbarTitle}>{t('scenarios.h03.toolbarTitle')}</span>
      </div>
      <div className={s.body}>
        {state === 'inbox' && (
          <>
            <div className={s.card}>
              <div className={`${s.row} ${s.spaceBetween}`}>
                <div>
                  <p className={s.subheading}>{t('scenarios.h03.emailSender')}</p>
                  <p className={s.muted}>{t('scenarios.h03.emailPreview')}</p>
                </div>
                <button
                  className={`${s.btn} ${s.btnDanger}`}
                  style={{ fontSize: 12, padding: '6px 12px' }}
                  onClick={handleDelete}
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

        {state === 'deleted-toast' && (
          <div className={s.centered}>
            <span style={{ fontSize: 40 }}>📭</span>
            <p className={s.heading}>{t('scenarios.h03.good.inboxEmpty')}</p>
            <p className={s.muted}>{t('scenarios.h03.good.emailMoved')}</p>
          </div>
        )}

        {state === 'recovered' && (
          <div className={s.centered}>
            <div className={s.alertSuccess} style={{ justifyContent: 'center' }}>
              {t('scenarios.h03.good.emailRecovered')}
            </div>
            <div className={s.card}>
              <p className={s.subheading}>{t('scenarios.h03.emailSender')}</p>
              <p className={s.muted}>{t('scenarios.h03.emailPreview')}</p>
            </div>
          </div>
        )}

        {state === 'gone' && (
          <div className={s.centered}>
            <span style={{ fontSize: 40 }}>📭</span>
            <p className={s.heading}>{t('scenarios.h03.good.emailDeleted')}</p>
            <p className={s.muted}>{t('scenarios.h03.good.undoExpired')}</p>
            <button
              className={`${s.btn} ${s.btnSecondary}`}
              style={{ marginTop: 12 }}
              onClick={onTaskComplete}
            >
              {t('scenarios.h03.good.btnContinue')}
            </button>
          </div>
        )}
      </div>

      {state === 'deleted-toast' && (
        <div className={s.toast}>
          {t('scenarios.h03.good.toastMsg')}
          <button className={s.toastAction} onClick={handleUndo}>
            {t('scenarios.h03.good.toastUndo', { countdown })}
          </button>
        </div>
      )}
    </div>
  );
}
