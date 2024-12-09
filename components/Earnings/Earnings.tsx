import React from 'react';
import styles from './Earnings.module.scss';
import Image from 'next/image';

interface IEarnings {
  amount: string;
  icon: string;
}

const Earnings: React.FC<IEarnings> = ({ amount, icon }) => {
  return (
    <div className={styles.refEarnings}>
      <span className={styles.earnings}>{amount}</span>
      <Image src={icon} alt="UsdtBnb" width={24} height={24} />
      <p className={styles.refEarningsCurr}>USDT</p>
    </div>
  );
};

export default Earnings;
