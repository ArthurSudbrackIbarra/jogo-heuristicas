import { useTranslation } from "react-i18next";
import { Button } from "../../components/Button";
import { useLang } from "../../hooks/useLang";
import styles from "./WelcomeScreen.module.css";
import { useGame } from "../../context/GameContext";

export function WelcomeScreen() {
  const { dispatch } = useGame();
  const { t } = useTranslation();
  const { lang, setLang } = useLang();

  const features = [
    { icon: "🎯", key: "tasks" },
    { icon: "⚡", key: "feel" },
    { icon: "🎙", key: "narrator" },
    { icon: "📚", key: "learn" },
  ] as const;

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {/* Language switcher */}
        <div className={styles.langSwitcher}>
          <button
            className={`${styles.langBtn} ${lang === "en" ? styles.langActive : ""}`}
            onClick={() => setLang("en")}
          >
            🇺🇸 {t("lang.en")}
          </button>
          <button
            className={`${styles.langBtn} ${lang === "pt" ? styles.langActive : ""}`}
            onClick={() => setLang("pt")}
          >
            🇧🇷 {t("lang.pt")}
          </button>
        </div>

        <div className={styles.icon} aria-hidden="true">
          🧠
        </div>

        <div className={styles.header}>
          <span className={styles.eyebrow}>{t("welcome.eyebrow")}</span>
          <h1 className={styles.title}>{t("welcome.title")}</h1>
          <p className={styles.subtitle}>{t("welcome.subtitle")}</p>
        </div>

        {/* Expert teaser */}
        <div className={styles.expertTeaser}>
          <p>
            <span className={styles.expertStar} aria-hidden="true">
              ⭐
            </span>
            {t("welcome.expertTeaser")}
          </p>
        </div>

        <div className={styles.features}>
          {features.map(({ icon, key }) => (
            <div key={key} className={styles.feature}>
              <span className={styles.featureIcon}>{icon}</span>
              <span className={styles.featureText}>
                {t(`welcome.features.${key}`)}
              </span>
            </div>
          ))}
        </div>

        <Button size="lg" onClick={() => dispatch({ type: "START_GAME" })}>
          {t("welcome.start")}
        </Button>

        <p className={styles.hint}>{t("welcome.hint")}</p>
      </div>

      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />
    </div>
  );
}
