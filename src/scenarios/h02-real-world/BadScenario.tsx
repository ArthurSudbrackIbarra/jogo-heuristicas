import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { ScenarioProps } from "../../types/game";
import s from "../scenario.module.css";

// BAD: buttons use technical jargon instead of real-world language
export function BadScenario({ onTaskComplete }: ScenarioProps) {
  const { t } = useTranslation();
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(onTaskComplete, 800);
  }

  return (
    <div className={s.app}>
      <div className={s.toolbar}>
        <span>📝</span>
        <span className={s.toolbarTitle}>
          {t("scenarios.h02.toolbarTitle")}
        </span>
        <span className={s.muted} style={{ fontSize: 11 }}>
          {saved
            ? t("scenarios.h02.bad.statusSynced")
            : t("scenarios.h02.bad.statusPending")}
        </span>
      </div>
      <div className={s.body}>
        <div className={s.card}>
          <p className={s.subheading}>{t("scenarios.h02.docTitle")}</p>
          <p className={s.muted} style={{ marginTop: 6, lineHeight: 1.6 }}>
            {t("scenarios.h02.docBody")}
          </p>
        </div>

        {/* Jargon-filled action buttons */}
        <div className={s.card}>
          <p className={s.label} style={{ marginBottom: 12 }}>
            {t("scenarios.h02.bad.actionsLabel")}
          </p>
          <div className={s.col} style={{ gap: 8 }}>
            <button className={`${s.btn} ${s.btnPrimary}`} onClick={handleSave}>
              {t("scenarios.h02.bad.btnSave")}
            </button>
            <button
              className={`${s.btn} ${s.btnDanger}`}
              style={{ opacity: 0.6 }}
            >
              {t("scenarios.h02.bad.btnDiscard")}
            </button>
          </div>
        </div>

        {saved && (
          <div className={s.alertInfo}>{t("scenarios.h02.bad.alertSaved")}</div>
        )}
      </div>
    </div>
  );
}
