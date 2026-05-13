import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { ScenarioProps } from "../../types/game";
import s from "../scenario.module.css";

// GOOD: clear labels, descriptions, tooltips, and "Learn more" links
export function GoodScenario({ onTaskComplete }: ScenarioProps) {
  const { t } = useTranslation();
  const [twoFa, setTwoFa] = useState(false);
  const [method, setMethod] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function handleToggle() {
    setTwoFa(true);
  }

  function handleMethod(m: string) {
    setMethod(m);
    setDone(true);
    setTimeout(onTaskComplete, 800);
  }

  const METHODS = [
    {
      id: "app",
      name: t("scenarios.h10.good.method1Name"),
      desc: t("scenarios.h10.good.method1Desc"),
      tooltip: t("scenarios.h10.good.method1Tooltip"),
    },
    {
      id: "sms",
      name: t("scenarios.h10.good.method2Name"),
      desc: t("scenarios.h10.good.method2Desc"),
      tooltip: t("scenarios.h10.good.method2Tooltip"),
    },
    {
      id: "key",
      name: t("scenarios.h10.good.method3Name"),
      desc: t("scenarios.h10.good.method3Desc"),
      tooltip: t("scenarios.h10.good.method3Tooltip"),
    },
  ];

  return (
    <div className={s.app}>
      <div className={s.toolbar}>
        <span>🔐</span>
        <span className={s.toolbarTitle}>
          {t("scenarios.h10.toolbarTitle")}
        </span>
      </div>
      <div className={s.body}>
        <div className={s.card}>
          <div className={`${s.row} ${s.spaceBetween}`}>
            <div>
              <p className={s.label}>{t("scenarios.h10.good.label2FA")}</p>
              <p className={s.muted} style={{ marginTop: 2 }}>
                {t("scenarios.h10.good.descPre")}{" "}
                <a
                  href="https://www.microsoft.com/en-us/security/business/security-101/what-is-two-factor-authentication-2fa"
                  target="__blank"
                  style={{
                    color: "#6c63ff",
                    cursor: "pointer",
                    textDecoration: "underline",
                    fontSize: 12,
                  }}
                >
                  {t("scenarios.h10.good.descLink")}
                </a>
              </p>
            </div>
            <button
              onClick={handleToggle}
              style={{
                width: 44,
                height: 24,
                borderRadius: 12,
                background: twoFa ? "#6c63ff" : "#e2e8f0",
                border: "none",
                cursor: "pointer",
                transition: "background 200ms",
                position: "relative",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 2,
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: "#fff",
                  transition: "left 200ms",
                  left: twoFa ? 22 : 2,
                }}
              />
            </button>
          </div>
        </div>

        {twoFa && !done && (
          <div className={s.card}>
            <p className={s.subheading}>
              {t("scenarios.h10.good.chooseMethod")}
            </p>
            <div className={s.col} style={{ gap: 8, marginTop: 12 }}>
              {METHODS.map((m) => (
                <div
                  key={m.id}
                  style={{
                    border: `1.5px solid ${method === m.id ? "#6c63ff" : "#e2e8f0"}`,
                    borderRadius: 8,
                    padding: "10px 14px",
                    cursor: "pointer",
                    background: method === m.id ? "#f5f3ff" : "#fff",
                    transition: "all 150ms",
                    position: "relative",
                  }}
                  onClick={() => handleMethod(m.id)}
                >
                  <div className={s.row}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: 600 }}>{m.name}</p>
                      <p className={s.muted}>{m.desc}</p>
                    </div>
                    <span
                      style={{ fontSize: 16, cursor: "help", color: "#94a3b8" }}
                      title={m.tooltip}
                      onMouseEnter={() => setTooltip(m.tooltip)}
                      onMouseLeave={() => setTooltip(null)}
                    >
                      ℹ️
                    </span>
                  </div>
                  {tooltip === m.tooltip && (
                    <div
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "100%",
                        zIndex: 10,
                        background: "#1e293b",
                        color: "#f8fafc",
                        padding: "8px 12px",
                        borderRadius: 8,
                        fontSize: 12,
                        maxWidth: 220,
                        marginTop: 4,
                        lineHeight: 1.5,
                      }}
                    >
                      {m.tooltip}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {done && (
          <div className={s.alertSuccess}>
            {t("scenarios.h10.good.alertEnabled")}
          </div>
        )}
      </div>
    </div>
  );
}
