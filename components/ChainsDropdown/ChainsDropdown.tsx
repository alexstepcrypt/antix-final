'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './ChainsDropdown.module.scss';
import ArrowIcon from '@/public/svg/top-arrow.svg';
import Image from 'next/image';
import { useNetworkStore, type Network } from '@/stores/useNetworkStore';
import { FadeInNew } from '../FadeInNew/FadeInNew';

const networks: Network[] = [
   {
      label: 'Ethereum',
      value: 'ETH',
      icon: '/svg/ether-icon.svg',
   },
   {
      label: 'BNB Smart Chain',
      value: 'BSC',
      icon: '/svg/bnb-icon.svg',
   },
];

const ChainsDropdown: React.FC = () => {
   const { network, setNetwork } = useNetworkStore();
   const [isOpen, setIsOpen] = useState(false);
   const dropdownRef = useRef<HTMLDivElement>(null);

   const toggleDropdown = () => setIsOpen(!isOpen);

   const selectNetwork = (externalNetwork: Network) => {
      if (network.label !== externalNetwork.label) setNetwork(externalNetwork);

      setIsOpen(false);
   };

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node)
         ) {
            setIsOpen(false);
         }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
         document.removeEventListener('mousedown', handleClickOutside);
      };
   }, []);

   return (
      <div className={styles.dropdown} ref={dropdownRef}>
         <button onClick={toggleDropdown} className={styles.dropdownButton}>
            <Image
               src={network.icon}
               alt={network.label}
               width={24}
               height={24}
            />
            <span>{network.value}</span>
            <span className={`${styles.arrow} ${isOpen ? '' : styles.close}`}>
               <Image src={ArrowIcon} alt="Arrow" width={12} height={6} />
            </span>
         </button>

         {isOpen && (
            <FadeInNew direction='down' distance={10}>
               <div className={styles.dropdownMenu}>
                  {networks.map(item => (
                     <button
                        key={network.value}
                        onClick={() => selectNetwork(item)}
                        className={`${styles.dropdownItem} ${
                           item.value === network.value
                              ? styles.dropdownItemActive
                              : ''
                        }`}
                        disabled={item.value === 'BSC'}>
                        <Image
                           src={item.icon}
                           alt={item.label}
                           width={24}
                           height={24}
                        />
                        <span>{item.label}</span>
                     </button>
                  ))}
               </div>
            </FadeInNew>
         )}
      </div>
   );
};

export default ChainsDropdown;
