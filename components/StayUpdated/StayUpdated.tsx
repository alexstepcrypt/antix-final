import React from 'react';
import styles from './StayUpdated.module.scss';
import { TgIcon } from '../GotQuestions/icons/TgIcon';
import { useTranslation } from 'react-i18next';

const StayUpdated: React.FC = () => {
  const { t } = useTranslation('landing');
  return (
    <div className={styles.container}>
      <span>{t('stayUpdated.title')}</span>
      {t('stayUpdated.connectText')}
      <button
        className={styles.btn}
        onClick={() => window.open('https://t.me/antixtoken_bot', '_blank')}
      >
        <TgIcon />
        {t('stayUpdated.button')}
      </button>
      {t('stayUpdated.description')}
    </div>
  );
};

export default StayUpdated;
