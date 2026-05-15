import { useTranslation } from "react-i18next";
import type { ScenarioProps } from "../../types/game";
import s from "../scenario.module.css";

// GOOD: clean, focused product page with clear CTA
export function GoodScenario({ onTaskComplete }: ScenarioProps) {
  const { t } = useTranslation();

  return (
    <div className={s.app}>
      <div className={s.toolbar}>
        <span>🛍️</span>
        <span className={s.toolbarTitle}>
          {t("scenarios.h08.toolbarTitleGood")}
        </span>
      </div>
      <div
        style={{
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {/* Product hero */}
        <div style={{ display: "flex", gap: 16 }}>
          <div
            style={{
              width: 100,
              height: 80,
              background: "#f1f5f9",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              flexShrink: 0,
            }}
          >
            💻
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 16, color: "#0f172a" }}>
              {t("scenarios.h08.productName")}
            </p>
            <p style={{ fontSize: 13, color: "#64748b", marginTop: 3 }}>
              {t("scenarios.h08.productSpecs")}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginTop: 6,
              }}
            >
              <span style={{ fontSize: 13, color: "#f59e0b" }}>
                {t("scenarios.h08.good.rating")}
              </span>
              <span style={{ fontSize: 12, color: "#94a3b8" }}>
                {t("scenarios.h08.good.reviews")}
              </span>
            </div>
          </div>
        </div>

        {/* Price */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 28, fontWeight: 800, color: "#0f172a" }}>
            $1,299
          </span>
          <span style={{ fontSize: 13, color: "#22c55e", fontWeight: 600 }}>
            {t("scenarios.h08.good.shipping")}
          </span>
        </div>

        {/* CTA — prominent and clear */}
        <button
          onClick={onTaskComplete}
          style={{
            padding: "14px 24px",
            background: "#6c63ff",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            transition: "opacity 120ms",
          }}
        >
          {t("scenarios.h08.good.btnBuyNow")}
        </button>

        <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center" }}>
          {t("scenarios.h08.good.returns")}
        </p>
      </div>
    </div>
  );
}
