import React from 'react';
import styles from './StayUpdated.module.scss';
import { TgIcon } from '../GotQuestions/icons/TgIcon';

const StayUpdated: React.FC = () => {
  return (
    <div className={styles.container}>
      <span>Stay Updated!</span>
      Connect to our
      <button
        className={styles.btn}
        onClick={() => window.open('https://t.me/antixtoken_bot', '_blank')}
      >
        <TgIcon />
        Telegram bot
      </button>
      for stage start alerts or support assistance.
    </div>
  );
};

export default StayUpdated;
