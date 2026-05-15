import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { ScenarioProps } from "../../types/game";
import s from "../scenario.module.css";

type View =
  | "settings"
  | "step1"
  | "step2"
  | "step3"
  | "confirming-exit"
  | "exited";

export function GoodScenario({ onTaskComplete }: ScenarioProps) {
  const { t } = useTranslation();
  const [view, setView] = useState<View>("settings");
  const [exitSource, setExitSource] = useState<"step1" | "step2" | "step3">(
    "step1",
  );
  const [selectedPlan, setSelectedPlan] = useState<"pro" | "business">("pro");

  const stepNum = view === "step1" ? 1 : view === "step2" ? 2 : 3;

  function openExitConfirm(from: "step1" | "step2" | "step3") {
    setExitSource(from);
    setView("confirming-exit");
  }

  return (
    <div className={s.app} style={{ position: "relative" }}>
      <div className={s.toolbar}>
        <span className={s.toolbarTitle}>
          {t("scenarios.h03.toolbarTitle")}
        </span>
      </div>

      <div className={s.body}>
        <div className={s.card}>
          <p className={s.subheading}>{t("scenarios.h03.currentPlan")}</p>
          <button
            className={`${s.btn} ${s.btnPrimary}`}
            style={{ marginTop: 12 }}
            onClick={() => setView("step1")}
            disabled={view !== "settings"}
          >
            {t("scenarios.h03.btnUpgrade")}
          </button>
        </div>
        <p className={s.muted} style={{ textAlign: "center" }}>
          {t("scenarios.h03.oopsMsg")}
        </p>
      </div>

      {/* Wizard overlay — with clear exit controls */}
      {(view === "step1" || view === "step2" || view === "step3") && (
        <div className={s.modalOverlay}>
          <div className={s.modal}>
            <div className={`${s.row} ${s.spaceBetween}`}>
              <p className={s.muted}>
                {t("scenarios.h03.stepOf", { step: stepNum })}
              </p>
              <button
                className={`${s.btn} ${s.btnSecondary}`}
                style={{ padding: "4px 10px", fontSize: 14, lineHeight: 1 }}
                onClick={() =>
                  openExitConfirm(view as "step1" | "step2" | "step3")
                }
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {view === "step1" && (
              <>
                <h3 className={s.modalTitle}>
                  {t("scenarios.h03.step1Title")}
                </h3>
                <div className={s.col}>
                  <label
                    className={s.label}
                    style={{ display: "flex", gap: 8, cursor: "pointer" }}
                  >
                    <input
                      type="radio"
                      name="plan"
                      checked={selectedPlan === "pro"}
                      onChange={() => setSelectedPlan("pro")}
                    />{" "}
                    {t("scenarios.h03.planPro")}
                  </label>
                  <label
                    className={s.label}
                    style={{ display: "flex", gap: 8, cursor: "pointer" }}
                  >
                    <input
                      type="radio"
                      name="plan"
                      checked={selectedPlan === "business"}
                      onChange={() => setSelectedPlan("business")}
                    />{" "}
                    {t("scenarios.h03.planBusiness")}
                  </label>
                </div>
                <div className={`${s.row} ${s.spaceBetween}`}>
                  <button
                    className={`${s.btn} ${s.btnSecondary}`}
                    onClick={() => openExitConfirm("step1")}
                  >
                    {t("scenarios.h03.good.btnCancel")}
                  </button>
                  <button
                    className={`${s.btn} ${s.btnPrimary}`}
                    onClick={() => setView("step2")}
                  >
                    {t("scenarios.h03.btnNext")}
                  </button>
                </div>
              </>
            )}

            {view === "step2" && (
              <>
                <h3 className={s.modalTitle}>
                  {t("scenarios.h03.step2Title")}
                </h3>
                <div className={s.col}>
                  <div className={s.formGroup}>
                    <label className={s.label}>
                      {t("scenarios.h03.labelName")}
                    </label>
                    <input
                      className={s.input}
                      placeholder={t("scenarios.h03.namePlaceholder")}
                    />
                  </div>
                  <div className={s.formGroup}>
                    <label className={s.label}>
                      {t("scenarios.h03.labelCard")}
                    </label>
                    <input
                      className={s.input}
                      placeholder={t("scenarios.h03.cardPlaceholder")}
                    />
                  </div>
                </div>
                <div className={`${s.row} ${s.spaceBetween}`}>
                  <div className={s.row}>
                    <button
                      className={`${s.btn} ${s.btnSecondary}`}
                      onClick={() => setView("step1")}
                    >
                      {t("scenarios.h03.good.btnBack")}
                    </button>
                    <button
                      className={`${s.btn} ${s.btnSecondary}`}
                      onClick={() => openExitConfirm("step2")}
                    >
                      {t("scenarios.h03.good.btnCancel")}
                    </button>
                  </div>
                  <button
                    className={`${s.btn} ${s.btnPrimary}`}
                    onClick={() => setView("step3")}
                  >
                    {t("scenarios.h03.btnNext")}
                  </button>
                </div>
              </>
            )}

            {view === "step3" && (
              <>
                <h3 className={s.modalTitle}>
                  {t("scenarios.h03.step3Title")}
                </h3>
                <div className={s.modalBody}>
                  {t("scenarios.h03.good.step3Summary", {
                    plan: t(
                      `scenarios.h03.plan${selectedPlan === "pro" ? "Pro" : "Business"}`,
                    ),
                  })}
                </div>
                <div className={`${s.row} ${s.spaceBetween}`}>
                  <div className={s.row}>
                    <button
                      className={`${s.btn} ${s.btnSecondary}`}
                      onClick={() => setView("step2")}
                    >
                      {t("scenarios.h03.good.btnBack")}
                    </button>
                    <button
                      className={`${s.btn} ${s.btnSecondary}`}
                      onClick={() => openExitConfirm("step3")}
                    >
                      {t("scenarios.h03.good.btnCancel")}
                    </button>
                  </div>
                  <button
                    className={`${s.btn} ${s.btnSuccess}`}
                    onClick={onTaskComplete}
                  >
                    {t("scenarios.h03.good.btnConfirm")}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Exit confirmation dialog */}
      {view === "confirming-exit" && (
        <div className={s.modalOverlay}>
          <div className={s.modal}>
            <h3 className={s.modalTitle}>
              {t("scenarios.h03.good.confirmExit")}
            </h3>
            <div className={s.modalBody}>
              {t("scenarios.h03.good.confirmExitDesc")}
            </div>
            <div className={`${s.row} ${s.spaceBetween}`}>
              <button
                className={`${s.btn} ${s.btnSecondary}`}
                onClick={() => setView(exitSource)}
              >
                {t("scenarios.h03.good.btnStay")}
              </button>
              <button
                className={`${s.btn} ${s.btnDanger}`}
                onClick={() => setView("exited")}
              >
                {t("scenarios.h03.good.btnExit")}
              </button>
            </div>
          </div>
        </div>
      )}

      {view === "exited" && (
        <div className={s.modalOverlay}>
          <div className={s.modal}>
            <div className={s.alertSuccess}>
              {t("scenarios.h03.good.exitedMsg")}
            </div>
            <div className={s.flexEnd}>
              <button
                className={`${s.btn} ${s.btnSecondary}`}
                onClick={onTaskComplete}
              >
                {t("scenarios.h03.good.btnContinue")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
