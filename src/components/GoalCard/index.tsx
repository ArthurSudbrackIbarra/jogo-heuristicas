import { useTranslation } from "react-i18next";
import styles from "./GoalCard.module.css";

interface GoalCardProps {
  goal: string;
  heuristicNumber: number;
}

export function GoalCard({ goal, heuristicNumber }: GoalCardProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.card}>
      <div className={styles.badge}>
        <span className={styles.badgeIcon}>🎯</span>
        <span className={styles.badgeText}>
          {t("goalCard.badge", { number: heuristicNumber })}
        </span>
      </div>
      <p className={styles.goal}>{goal}</p>
    </div>
  );
}
