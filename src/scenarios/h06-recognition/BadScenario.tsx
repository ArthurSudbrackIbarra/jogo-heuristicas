import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { ScenarioProps } from "../../types/game";
import s from "../scenario.module.css";

type Format = "none" | "italic" | "underline" | "bold";

// BAD: toolbar appears on selection but bold option uses a cryptic symbol — trial and error required
export function BadScenario({ onTaskComplete }: ScenarioProps) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(false);
  const [format, setFormat] = useState<Format>("none");
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [wrongMsg, setWrongMsg] = useState("");

  function handleSelectWord() {
    if (format === "bold") return;
    setSelected(true);
    setWrongMsg("");
  }

  function handleBold() {
    setFormat("bold");
    setSelected(false);
    setTimeout(onTaskComplete, 900);
  }

  function handleWrong(type: "italic" | "underline") {
    setFormat(type);
    setSelected(false);
    setWrongAttempts((a) => a + 1);
    setWrongMsg(t("scenarios.h06.bad.wrongChoice"));
    setTimeout(() => setFormat("none"), 1200);
  }

  const toolbarStyle: React.CSSProperties = {
    position: "absolute",
    top: -44,
    left: "50%",
    transform: "translateX(-50%)",
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: 8,
    padding: "4px 6px",
    display: "flex",
    gap: 2,
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    zIndex: 10,
    whiteSpace: "nowrap",
  };

  const toolBtnStyle: React.CSSProperties = {
    padding: "4px 10px",
    borderRadius: 4,
    border: "none",
    background: "transparent",
    color: "#e2e8f0",
    fontSize: 13,
    cursor: "pointer",
  };

  return (
    <div className={s.app}>
      <div className={s.toolbar}>
        <span>✏️</span>
        <span className={s.toolbarTitle}>
          {t("scenarios.h06.toolbarTitle")}
        </span>
      </div>
      <div className={s.body}>
        <div className={s.card}>
          <p className={s.subheading} style={{ marginBottom: 8 }}>
            {t("scenarios.h06.docLabel")}
          </p>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.8,
              fontFamily: "Georgia, serif",
            }}
          >
            {t("scenarios.h06.docTextBefore")}{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              {selected && (
                <span style={toolbarStyle}>
                  {/* Using numbers instead of icons to make it less guessable */}
                  <button
                    style={{ ...toolBtnStyle }}
                    onClick={() => handleWrong("italic")}
                    title={t("scenarios.h06.bad.titleItalic")}
                  >
                    1
                  </button>
                  <button
                    style={{ ...toolBtnStyle }}
                    onClick={handleBold}
                    title={t("scenarios.h06.bad.titleBold")}
                  >
                    2
                  </button>
                  <button
                    style={{ ...toolBtnStyle }}
                    onClick={() => handleWrong("underline")}
                    title={t("scenarios.h06.bad.titleUnderline")}
                  >
                    3
                  </button>
                </span>
              )}
              <span
                onClick={handleSelectWord}
                style={{
                  fontWeight: format === "bold" ? 700 : 400,
                  fontStyle: format === "italic" ? "italic" : "normal",
                  textDecoration: format === "underline" ? "underline" : "none",
                  background: selected ? "#bfdbfe" : "transparent",
                  color: selected ? "#1e40af" : "inherit",
                  borderRadius: 2,
                  padding: "0 2px",
                  cursor: format === "bold" ? "default" : "pointer",
                  transition: "background 150ms, color 150ms",
                  userSelect: "none",
                }}
              >
                {t("scenarios.h06.docTextWord")}
              </span>
            </span>{" "}
            {t("scenarios.h06.docTextAfter")}
          </p>
        </div>

        {format !== "bold" && !selected && !wrongMsg && (
          <div className={s.alertInfo}>
            ℹ️ {t("scenarios.h06.bad.alertSelectWord")}
          </div>
        )}

        {selected && (
          <div className={s.alertInfo}>
            {t("scenarios.h06.bad.alertSelected")}
          </div>
        )}

        {wrongMsg && (
          <div className={s.alertError}>
            {wrongMsg}
            {wrongAttempts >= 2 && (
              <>
                <br />
                <small>{t("scenarios.h06.bad.hint")}</small>
              </>
            )}
          </div>
        )}

        {format === "bold" && (
          <div className={s.alertSuccess}>
            {t("scenarios.h06.bad.alertDone")}
          </div>
        )}
      </div>
    </div>
  );
}
