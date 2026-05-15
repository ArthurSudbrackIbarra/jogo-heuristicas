import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useGame } from "../../context/GameContext";
import { useLang } from "../../hooks/useLang";
import { heuristics } from "../../scenarios";
import type { ScenarioKind } from "../../types/game";
import styles from "./ProgressSidebar.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ProgressSidebar({ isOpen, onClose }: Props) {
  const { t } = useTranslation();
  const { state, dispatch } = useGame();
  const { pick } = useLang();
  const {
    phase,
    heuristicIndex,
    scenarioIndex,
    completedEntries,
    completedHeuristicIds,
  } = state;

  const [confirmTarget, setConfirmTarget] = useState<{
    hIdx: number;
    sIdx: 0 | 1;
  } | null>(null);

  function isScenarioDone(heuristicId: number, kind: ScenarioKind) {
    return completedEntries.some(
      (e) => e.heuristicId === heuristicId && e.kind === kind,
    );
  }

  function isHeuristicRevealed(heuristicId: number) {
    return completedHeuristicIds.includes(heuristicId);
  }

  function handleNavigate(hIdx: number, sIdx: 0 | 1) {
    const isSame = hIdx === heuristicIndex && sIdx === scenarioIndex;
    if (isSame && phase === "playing") return;

    const currentScenario = heuristics[heuristicIndex].scenarios[scenarioIndex];
    const currentDone = isScenarioDone(
      heuristics[heuristicIndex].id,
      currentScenario.kind,
    );
    const shouldWarn = phase === "playing" && !currentDone && !isSame;

    if (shouldWarn) {
      setConfirmTarget({ hIdx, sIdx });
    } else {
      doNavigate(hIdx, sIdx);
    }
  }

  function doNavigate(hIdx: number, sIdx: 0 | 1) {
    setConfirmTarget(null);
    dispatch({
      type: "NAVIGATE_TO",
      heuristicIndex: hIdx,
      scenarioIndex: sIdx,
    });
    onClose();
  }

  const allRevealed = completedHeuristicIds.length >= heuristics.length;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && <div className={styles.backdrop} onClick={onClose} />}

      <aside
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}
      >
        <div className={styles.header}>
          <span className={styles.title}>{t("sidebar.title")}</span>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <nav className={styles.nav}>
          {heuristics.map((heuristic, hIdx) => {
            const revealed = isHeuristicRevealed(heuristic.id);
            const isCurrentH = heuristicIndex === hIdx;
            const isInReveal = isCurrentH && phase === "reveal";

            return (
              <div
                key={heuristic.id}
                className={`${styles.heuristicItem} ${isCurrentH ? styles.heuristicActive : ""} ${revealed ? styles.heuristicDone : ""}`}
              >
                <div className={styles.heuristicRow}>
                  <span className={styles.hNum}>
                    H{String(heuristic.id).padStart(2, "0")}
                  </span>
                  <span className={styles.hName}>{pick(heuristic.name)}</span>
                  {isInReveal && !revealed && (
                    <span className={styles.revealBadge}>
                      {t("sidebar.reveal")}
                    </span>
                  )}
                </div>

                <div className={styles.scenarioRow}>
                  {heuristic.scenarios.map((scenario, sIdx) => {
                    const done = isScenarioDone(heuristic.id, scenario.kind);
                    const isCurrent =
                      isCurrentH &&
                      scenarioIndex === sIdx &&
                      (phase === "playing" || phase === "feedback");

                    return (
                      <button
                        key={scenario.kind}
                        className={`${styles.scenarioBtn} ${done ? styles.scenarioDone : ""} ${isCurrent ? styles.scenarioCurrent : ""} ${scenario.kind === "bad" ? styles.scenarioBad : styles.scenarioGood}`}
                        onClick={() => handleNavigate(hIdx, sIdx as 0 | 1)}
                        title={done ? t("sidebar.scenarioDoneTitle") : ""}
                      >
                        <span className={styles.scenarioIcon}>
                          {done ? "✓" : isCurrent ? "●" : "○"}
                        </span>
                        <span className={styles.scenarioLabel}>
                          {scenario.kind === "bad"
                            ? t("sidebar.bad")
                            : t("sidebar.good")}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {allRevealed && (
          <div className={styles.footer}>
            <button
              className={styles.finishBtn}
              onClick={() => dispatch({ type: "FINISH_GAME" })}
            >
              {t("sidebar.seeResults")}
            </button>
          </div>
        )}

        {/* Confirm navigation dialog */}
        {confirmTarget && (
          <div className={styles.confirmOverlay}>
            <div className={styles.confirmDialog}>
              <p className={styles.confirmTitle}>{t("sidebar.confirmTitle")}</p>
              <p className={styles.confirmBody}>{t("sidebar.confirmBody")}</p>
              <div className={styles.confirmActions}>
                <button
                  className={styles.stayBtn}
                  onClick={() => setConfirmTarget(null)}
                >
                  {t("sidebar.stay")}
                </button>
                <button
                  className={styles.leaveBtn}
                  onClick={() =>
                    doNavigate(confirmTarget.hIdx, confirmTarget.sIdx)
                  }
                >
                  {t("sidebar.leave")}
                </button>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
