"use client"

import { useState } from 'react';
import Image from 'next/image';

import creationsBg from '@/public/images/creations.png';
import s from './Creations.module.scss';
import Accordion from '@/components/Accordion/Accordion'

const accordionItems = [
   {
      title: 'Create',
      text: 'Use your characters to create digital content, such as Films, Ads, Reels, Shorts, Games or more.',
   },
   {
      title: 'Rent',
      text: 'Rent out your characters to brands and creators.',
   },
   {
      title: 'Sell',
      text: 'Sell your digital people and unique accessories on our marketplace.',
   },
];

const Creations = () => {
   const [isOpen, setIsOpen] = useState("");

   return (
      <div>
         <section className={s.creations}>
            <h2 className={s.title}>Monetize your creations</h2>

            <div className={s.content}>
               <div className={s.accordions}>
                  {accordionItems.map((item, i) => (
                     <Accordion
                        key={i}
                        item={item}
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                     />
                  ))}
               </div>

               <Image
                  src={creationsBg}
                  alt="creations-bg"
                  width={683}
                  height={291}
                  loading='lazy'
               />
            </div>
         </section>
      </div>
   );
};

export default Creations;
