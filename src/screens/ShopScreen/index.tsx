import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button';
import { useGame } from '../../context/GameContext';
import styles from './ShopScreen.module.css';

export function ShopScreen() {
  const { dispatch } = useGame();
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.candy} aria-hidden="true">🍬</div>

        <div className={styles.coinBadge}>
          {t('shop.coins')}
        </div>

        <div className={styles.header}>
          <h1 className={styles.title}>{t('shop.title')}</h1>
          <p className={styles.subtitle}>{t('shop.subtitle')}</p>
        </div>

        <div className={styles.card}>
          <p className={styles.description}>{t('shop.description')}</p>
          <p className={styles.note}>{t('shop.note')}</p>
        </div>

        <Button size="lg" onClick={() => dispatch({ type: 'BUY_ITEM' })}>
          {t('shop.cta')}
        </Button>
      </div>

      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />
    </div>
  );
}
