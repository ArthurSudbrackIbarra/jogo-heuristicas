import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ScenarioProps } from '../../types/game';
import s from '../scenario.module.css';

type Phase = 'idle' | 'confirming' | 'deleted';

// GOOD: multiple confirmation layers before destructive action
export function GoodScenario({ onTaskComplete }: ScenarioProps) {
  const { t } = useTranslation();
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
        <span className={s.toolbarTitle}>{t('scenarios.h05.toolbarTitle')}</span>
      </div>
      <div className={s.body}>
        <div className={s.card}>
          <p className={s.subheading}>{t('scenarios.h05.dangerZone')}</p>
          <p className={s.muted} style={{ marginTop: 6 }}>
            {t('scenarios.h05.deleteDesc')}
          </p>
          {phase === 'idle' && (
            <button
              className={`${s.btn} ${s.btnSecondary}`}
              style={{ marginTop: 16, borderColor: '#fca5a5', color: '#ef4444' }}
              onClick={() => setPhase('confirming')}
            >
              {t('scenarios.h05.good.btnDeleteEllipsis')}
            </button>
          )}
        </div>

        {phase === 'confirming' && (
          <div className={s.card} style={{ borderColor: '#fca5a5' }}>
            <p className={s.subheading} style={{ color: '#ef4444' }}>
              {t('scenarios.h05.good.dialogTitle')}
            </p>
            <p className={s.muted} style={{ marginTop: 6 }}>
              {t('scenarios.h05.good.dialogDesc')}
            </p>

            <div className={s.formGroup} style={{ marginTop: 16 }}>
              <label className={s.label}>
                {t('scenarios.h05.good.confirmLabelPre')}{' '}
                <code style={{ background: '#f1f5f9', padding: '1px 5px', borderRadius: 4, color: '#ef4444' }}>DELETE</code>
                {' '}{t('scenarios.h05.good.confirmLabelPost')}
              </label>
              <input
                className={s.input}
                value={typed}
                onChange={e => setTyped(e.target.value)}
                placeholder={t('scenarios.h05.good.confirmPlaceholder')}
              />
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, cursor: 'pointer', fontSize: 13 }}>
              <input
                type="checkbox"
                checked={checked}
                onChange={e => setChecked(e.target.checked)}
              />
              {t('scenarios.h05.good.checkboxLabel')}
            </label>

            <div className={s.row} style={{ marginTop: 16, gap: 8 }}>
              <button
                className={`${s.btn} ${s.btnSecondary}`}
                onClick={() => { setPhase('idle'); setTyped(''); setChecked(false); }}
              >
                {t('scenarios.h05.good.btnCancel')}
              </button>
              <button
                className={`${s.btn} ${s.btnDanger}`}
                onClick={handleConfirm}
                disabled={!canConfirm}
              >
                {t('scenarios.h05.good.btnConfirm')}
              </button>
            </div>
          </div>
        )}

        {phase === 'deleted' && (
          <div className={s.alertError}>
            {t('scenarios.h05.good.alertDeleted')}
          </div>
        )}
      </div>
    </div>
  );
}
