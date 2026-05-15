import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { ScenarioProps } from "../../types/game";
import s from "../scenario.module.css";

// BAD: cryptic error message, user can't figure out how to fix it
// After 2 failed attempts the scenario auto-completes.
export function BadScenario({ onTaskComplete }: ScenarioProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("john.doe@example.com");
  const [password, setPassword] = useState("pass123");
  const [submitted, setSubmitted] = useState(false);
  const [attempts, setAttempts] = useState(0);

  function handleSubmit() {
    const next = attempts + 1;
    setAttempts(next);
    setSubmitted(true);
    if (next === 2) {
      setTimeout(onTaskComplete, 1500);
    }
  }

  return (
    <div className={s.app}>
      <div className={s.toolbar}>
        <span>📋</span>
        <span className={s.toolbarTitle}>
          {t("scenarios.h09.toolbarTitle")}
        </span>
      </div>
      <div className={s.body}>
        <div className={s.card}>
          <p className={s.subheading}>{t("scenarios.h09.formTitle")}</p>
          <div className={s.formGroup} style={{ marginTop: 12 }}>
            <label className={s.label}>{t("scenarios.h09.labelEmail")}</label>
            <input
              className={s.input}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setSubmitted(false);
              }}
              placeholder={t("scenarios.h09.emailPlaceholder")}
            />
          </div>
          <div className={s.formGroup} style={{ marginTop: 10 }}>
            <label className={s.label}>
              {t("scenarios.h09.labelPassword")}
            </label>
            <input
              className={s.input}
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setSubmitted(false);
              }}
            />
          </div>
          <button
            className={`${s.btn} ${s.btnPrimary}`}
            style={{ marginTop: 14 }}
            onClick={handleSubmit}
            disabled={attempts >= 2}
          >
            {t("scenarios.h09.btnRegister")}
          </button>

          {submitted && (
            <div className={s.alertError} style={{ marginTop: 12 }}>
              {t("scenarios.h09.bad.errorMsg")}
              <br />
              <span style={{ fontSize: 11, opacity: 0.7 }}>
                {t("scenarios.h09.bad.errorCode")}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
