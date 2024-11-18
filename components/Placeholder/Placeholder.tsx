import React from 'react';
import styles from './Placeholder.module.scss';
import Image from 'next/image';
import Logo from '/public/svg/logo-full.svg';

interface PlaceholderProps {
  title?: string;
  subtitle?: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({
  title = 'Access Denied',
  subtitle = 'We apologize, but this website is not available in your country',
}) => {
  return (
    <div className={styles.placeholder}>
      <Image
        className={styles.logo}
        src={Logo}
        alt="Antix logo"
        width={230}
        height={84}
      />

      <p className={styles.title}>{title}</p>
      <span className={styles.subtitle}>{subtitle}</span>
    </div>
  );
};

export default Placeholder;
