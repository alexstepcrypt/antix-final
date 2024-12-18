'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './SelectLanguage.module.scss';
import Image from 'next/image';
import { FadeInNew } from '../FadeInNew/FadeInNew';
import { LanguageItem, languages } from './mocdata';
import { useTranslation } from 'react-i18next';

const SelectLanguage = () => {
   const { i18n } = useTranslation();
   const [isOpen, setIsOpen] = useState(false);
   const [selectedLang, setSelectedLang] = useState<LanguageItem>(languages[0]);
   const dropdownRef = useRef<HTMLDivElement>(null);

   const switchLanguage = (lang: LanguageItem) => {
      setSelectedLang(lang);
      i18n.changeLanguage(lang.idioma);
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
         <button
            onClick={() => setIsOpen(!isOpen)}
            className={styles.dropdownButton}
         >
            <Image
               src={selectedLang.icon}
               alt={selectedLang.label}
               width={24}
               height={24}
            />
         </button>

         {isOpen && (
            <FadeInNew direction="down" distance={10}>
               <div className={styles.dropdownMenu}>
                  {languages.map(lang => (
                     <button
                        key={lang.idioma}
                        onClick={() => switchLanguage(lang)}
                        className={`${styles.dropdownItem} ${
                           lang.label === selectedLang.label
                              ? styles.dropdownItemActive
                              : ''
                        }`}>
                        <Image
                           src={lang.icon}
                           alt={lang.label}
                           width={24}
                           height={24}
                        />
                        <span>{lang.label}</span>
                     </button>
                  ))}
               </div>
            </FadeInNew>
         )}
      </div>
   );
};

export default SelectLanguage;
