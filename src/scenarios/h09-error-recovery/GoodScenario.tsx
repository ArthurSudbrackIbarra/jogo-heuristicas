import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { ScenarioProps } from "../../types/game";
import s from "../scenario.module.css";

// GOOD: clear inline errors that explain exactly what's wrong and how to fix it
export function GoodScenario({ onTaskComplete }: ScenarioProps) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("john.doe@example.com");
  const [password, setPassword] = useState("pass123");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [success, setSuccess] = useState(false);

  function validate() {
    const e: { email?: string; password?: string } = {};
    if (!email.includes("@") || !email.includes(".")) {
      e.email = t("scenarios.h09.good.errorEmail");
    }
    if (password.length < 8) {
      e.password = t("scenarios.h09.good.errorPassword", {
        length: password.length,
      });
    }
    return e;
  }

  function handleSubmit() {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setSuccess(true);
      setTimeout(onTaskComplete, 800);
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
              className={`${s.input} ${errors.email ? s.error : ""}`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((err) => ({ ...err, email: undefined }));
              }}
              placeholder={t("scenarios.h09.emailPlaceholder")}
            />
            {errors.email && <p className={s.inputError}>⚠️ {errors.email}</p>}
          </div>
          <div className={s.formGroup} style={{ marginTop: 10 }}>
            <label className={s.label}>
              {t("scenarios.h09.labelPassword")}
            </label>
            <input
              className={`${s.input} ${errors.password ? s.error : ""}`}
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((err) => ({ ...err, password: undefined }));
              }}
            />
            <p className={s.inputHelper}>{t("scenarios.h09.passwordHelper")}</p>
            {errors.password && (
              <p className={s.inputError}>⚠️ {errors.password}</p>
            )}
          </div>
          <button
            className={`${s.btn} ${s.btnPrimary}`}
            style={{ marginTop: 14 }}
            onClick={handleSubmit}
          >
            {t("scenarios.h09.btnRegister")}
          </button>

          {success && (
            <div className={s.alertSuccess} style={{ marginTop: 12 }}>
              {t("scenarios.h09.good.alertSuccess")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
