import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

type View = 'settings' | 'step1' | 'step2' | 'step3' | 'upgraded';

export function BadScenario({ onTaskComplete }: ScenarioProps) {
  const { t } = useTranslation();
  const [view, setView] = useState<View>('settings');

  const stepNum = view === 'step1' ? 1 : view === 'step2' ? 2 : 3;

  return (
    <div className={s.app} style={{ position: 'relative' }}>
      <div className={s.toolbar}>
        <span className={s.toolbarTitle}>{t('scenarios.h03.toolbarTitle')}</span>
      </div>

      <div className={s.body}>
        <div className={s.card}>
          <p className={s.subheading}>{t('scenarios.h03.currentPlan')}</p>
          <button
            className={`${s.btn} ${s.btnPrimary}`}
            style={{ marginTop: 12 }}
            onClick={() => setView('step1')}
            disabled={view !== 'settings'}
          >
            {t('scenarios.h03.btnUpgrade')}
          </button>
        </div>
        <p className={s.muted} style={{ textAlign: 'center' }}>
          {t('scenarios.h03.oopsMsg')}
        </p>
      </div>

      {/* Wizard overlay — no escape controls */}
      {(view === 'step1' || view === 'step2' || view === 'step3') && (
        <div className={s.modalOverlay}>
          <div className={s.modal}>
            <p className={s.muted}>{t('scenarios.h03.stepOf', { step: stepNum })}</p>

            {view === 'step1' && (
              <>
                <h3 className={s.modalTitle}>{t('scenarios.h03.step1Title')}</h3>
                <div className={s.col}>
                  <label className={s.label} style={{ display: 'flex', gap: 8, cursor: 'pointer' }}>
                    <input type="radio" name="plan" defaultChecked readOnly /> {t('scenarios.h03.planPro')}
                  </label>
                  <label className={s.label} style={{ display: 'flex', gap: 8, cursor: 'pointer' }}>
                    <input type="radio" name="plan" readOnly /> {t('scenarios.h03.planBusiness')}
                  </label>
                </div>
                <div className={s.flexEnd}>
                  <button className={`${s.btn} ${s.btnPrimary}`} onClick={() => setView('step2')}>
                    {t('scenarios.h03.btnNext')}
                  </button>
                </div>
              </>
            )}

            {view === 'step2' && (
              <>
                <h3 className={s.modalTitle}>{t('scenarios.h03.step2Title')}</h3>
                <div className={s.col}>
                  <div className={s.formGroup}>
                    <label className={s.label}>{t('scenarios.h03.labelName')}</label>
                    <input className={s.input} placeholder={t('scenarios.h03.namePlaceholder')} />
                  </div>
                  <div className={s.formGroup}>
                    <label className={s.label}>{t('scenarios.h03.labelCard')}</label>
                    <input className={s.input} placeholder={t('scenarios.h03.cardPlaceholder')} />
                  </div>
                </div>
                <div className={s.flexEnd}>
                  <button className={`${s.btn} ${s.btnPrimary}`} onClick={() => setView('step3')}>
                    {t('scenarios.h03.btnNext')}
                  </button>
                </div>
              </>
            )}

            {view === 'step3' && (
              <>
                <h3 className={s.modalTitle}>{t('scenarios.h03.step3Title')}</h3>
                <div className={s.modalBody}>{t('scenarios.h03.bad.step3Summary')}</div>
                <div className={`${s.row} ${s.spaceBetween}`}>
                  <button
                    className={`${s.btn} ${s.btnSecondary}`}
                    style={{ fontSize: 12 }}
                    onClick={onTaskComplete}
                  >
                    {t('scenarios.h03.bad.btnGiveUp')}
                  </button>
                  <button className={`${s.btn} ${s.btnPrimary}`} onClick={() => setView('upgraded')}>
                    {t('scenarios.h03.bad.btnConfirm')}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {view === 'upgraded' && (
        <div className={s.modalOverlay}>
          <div className={s.modal}>
            <div className={s.alertError}>{t('scenarios.h03.bad.upgradedMsg')}</div>
            <div className={s.flexEnd}>
              <button className={`${s.btn} ${s.btnSecondary}`} onClick={onTaskComplete}>
                {t('scenarios.h03.bad.btnContinue')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
