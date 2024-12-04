import React from 'react';
import styles from './RefHistory.module.scss';
import Image from 'next/image';

import vesting_antix from '/public/svg/vantix-icon.svg';
import TetherIcon from '/public/dashboard/svg/usdt-bnb-icon.svg';
import BNBIcon from "/public/svg/bnb-icon.svg";
// import USDCIcon from "/public/svg/usdc-icon.svg";
// import ETHIcon from "/public/svg/ether-icon.svg";

type historyType = {
  type: string;
  referralsAmount: string;
  amount: {
    icon: string;
    amount: string;
    name: string;
  };
  referralEarnings: string;
  status: 'Claim' | 'In progress' | 'Received';
  transactionLink: string;
};

const history: historyType[] = [
  {
    type: 'Depost / Stage 2',
    referralsAmount: '156',
    amount: {
      icon: TetherIcon,
      amount: '400.00',
      name: 'USDT',
    },
    referralEarnings: '400.00',
    status: 'Claim',
    transactionLink: '',
  },
  {
    type: 'Depost / Stage 1',
    referralsAmount: '1000',
    amount: {
      icon: BNBIcon,
      amount: '200.000000',
      name: 'BNB',
    },
    referralEarnings: '400.00',
    status: 'In progress',
    transactionLink: '0x312421',
  },
];

const RefHistory = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.head}>
        <li>Type</li>
        <li>Referrals amount</li>
        <li>Amount</li>
        <li>Referral earnings</li>
        <li>Status</li>
        <li>Transaction Link</li>
      </ul>

      <ul className={styles.body}>
        {history.map((item, index) => (
          <li className={styles.bodyItem} key={index}>
            <div className={styles.item}>{item.type}</div>
            <div className={styles.item}>{item.referralsAmount}</div>
            <div className={styles.item}>
              <Image
                src={item.amount.icon}
                alt="amount-icon"
                width={24}
                height={24}
              />
              <p>
                {item.amount.amount} {item.amount.name}
              </p>
            </div>
            <div className={styles.item}>
              <Image
                src={vesting_antix}
                alt="vesting-antix"
                width={24}
                height={24}
                className={styles.vestingAntix}
              />
              {item.referralEarnings} vAntix
            </div>
            <div className={styles.item}>
              {item.status === 'Claim' ? <button>Claim</button> : item.status}
            </div>
            {item.transactionLink === '' ? (
              <div className={`${styles.item}`}>-</div>
            ) : (
              <a
                href={item.transactionLink}
                className={`${styles.item} ${styles.address}`}
              >
                View Transaction
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RefHistory;
