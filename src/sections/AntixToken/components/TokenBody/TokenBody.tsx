'use client';

import Image from 'next/image';

import coin from '/public/svg/token/coin.svg';
import bg from '/public/svg/token/coin-bg.svg';
import { TokenCard } from '../TokenCard/TokenCard';
import s from './TokenBody.module.scss';
import { leftList, midList, rightList } from '../../mocdata'

export const TokenBody = () => {
   return (
      <div
         style={{ backgroundImage: `url(${bg.src})` }}
         className={s.container}>
         <div className={s.left}>
            {leftList.map((item, i) => (
               <TokenCard key={i} {...item} />
            ))}
         </div>
         <div className={s.middle}>
            {midList.map((item, i) => (
               <TokenCard key={i} {...item} />
            ))}
         </div>
         <div className={s.right}>
            {rightList.map((item, i) => (
               <TokenCard key={i} {...item} />
            ))}
         </div>

         <Image
            src={coin.src}
            alt="coin"
            width={902}
            height={592}
            className={s.coin}
         />
      </div>
   );
};
