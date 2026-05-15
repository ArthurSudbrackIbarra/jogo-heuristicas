import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { ScenarioProps } from "../../types/game";
import s from "../scenario.module.css";

// BAD: must open each notification individually (2 clicks each) — no bulk action
export function BadScenario({ onTaskComplete }: ScenarioProps) {
  const { t } = useTranslation();
  const [read, setRead] = useState<boolean[]>([false, false, false]);
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);

  const MESSAGES = [
    {
      from: t("scenarios.h07.msg1From"),
      preview: t("scenarios.h07.msg1Preview"),
      body: t("scenarios.h07.msg1Body"),
    },
    {
      from: t("scenarios.h07.msg2From"),
      preview: t("scenarios.h07.msg2Preview"),
      body: t("scenarios.h07.msg2Body"),
    },
    {
      from: t("scenarios.h07.msg3From"),
      preview: t("scenarios.h07.msg3Preview"),
      body: t("scenarios.h07.msg3Body"),
    },
  ];

  function openNotification(i: number) {
    setOpenedIndex(i);
  }

  function markRead(i: number) {
    const next = [...read];
    next[i] = true;
    setRead(next);
    setOpenedIndex(null);
    if (next.every(Boolean)) setTimeout(onTaskComplete, 500);
  }

  const openMsg = openedIndex !== null ? MESSAGES[openedIndex] : null;

  return (
    <div className={s.app} style={{ position: "relative" }}>
      <div className={s.toolbar}>
        <span>🔔</span>
        <span className={s.toolbarTitle}>
          {t("scenarios.h07.toolbarTitle", {
            unread: read.filter((r) => !r).length,
          })}
        </span>
        {/* No "mark all as read" button */}
      </div>
      <div className={s.body}>
        <p className={s.muted} style={{ fontSize: 12 }}>
          {t("scenarios.h07.bad.instruction")}
        </p>
        <div className={s.list}>
          {MESSAGES.map((m, i) => (
            <div
              key={i}
              className={s.listRow}
              style={{
                background: read[i] ? "#f8fafc" : "#fff",
                borderColor: read[i] ? "#e2e8f0" : "#6c63ff",
                opacity: read[i] ? 0.6 : 1,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: read[i] ? "transparent" : "#6c63ff",
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600 }}>{m.from}</p>
                <p className={s.muted}>{m.preview}</p>
              </div>
              {!read[i] ? (
                <button
                  className={`${s.btn} ${s.btnSecondary}`}
                  style={{ fontSize: 11, padding: "4px 10px" }}
                  onClick={() => openNotification(i)}
                >
                  {t("scenarios.h07.bad.btnOpen")}
                </button>
              ) : (
                <span style={{ fontSize: 12, color: "#22c55e" }}>
                  {t("scenarios.h07.bad.btnRead")}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal for opened notification */}
      {openMsg !== null && openedIndex !== null && (
        <div className={s.modalOverlay}>
          <div className={s.modal}>
            <p className={s.modalTitle}>📩 {openMsg.from}</p>
            <p className={s.modalBody}>{openMsg.body}</p>
            <div className={`${s.row} ${s.flexEnd}`}>
              <button
                className={`${s.btn} ${s.btnPrimary}`}
                style={{ fontSize: 13 }}
                onClick={() => markRead(openedIndex)}
              >
                {t("scenarios.h07.bad.btnMarkRead")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
