'use client';

import Image from 'next/image';

import coin from '/public/svg/token/coin.svg';
import bg from '/public/svg/token/coin-bg.svg';
import { TokenCard } from '../TokenCard/TokenCard';
import s from './TokenBody.module.scss';
import { leftList, listTextType, midList, rightList } from '../../mocdata'

interface TokenBodyProps {
   leftListText: listTextType[];
   midListText: listTextType[];
   rightListText: listTextType[];
}

export const TokenBody: React.FC<TokenBodyProps> = ({ leftListText, midListText, rightListText }) => {
   return (
      <div
         style={{ backgroundImage: `url(${bg.src})` }}
         className={s.container}>
         <div className={s.left}>
            {leftListText.map((item, i) => (
               <TokenCard key={i} {...item} icon={leftList[i]} />
            ))}
         </div>
         <div className={s.middle}>
            {midListText.map((item, i) => (
               <TokenCard key={i} {...item} icon={midList[i]} />
            ))}
         </div>
         <div className={s.right}>
            {rightListText.map((item, i) => (
               <TokenCard key={i} {...item} icon={rightList[i]} />
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
