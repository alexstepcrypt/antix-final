import Image from 'next/image';

import coin from '@/public/svg/token/coin.svg';
import glow from '@/public/images/token-glow.png';
import { FadeInNew } from '@/components/FadeInNew/FadeInNew';
import { TokenCard } from './components/TokenCard/TokenCard';
import { TokenHead } from './components/TokenHead/TokenHead';
import { TokenBody } from './components/TokenBody/TokenBody';
import { mobileList } from './mocdata';
import s from './AntixToken.module.scss';

const AntixToken = () => {
   return (
      <div
         style={{ backgroundImage: `url(${glow.src})` }}
         className={s.wrapper}
         id='ANTIXTokens'
      >
         <div id="ANTIXTokens">
            <TokenHead />
            <TokenBody />

            <div className={s.mobileToken}>
               <FadeInNew direction='up'>
                  <Image
                     src={coin.src}
                     alt="coin"
                     width={725}
                     height={510}
                     loading="lazy"
                     className={s.coin}
                  />
               </FadeInNew>
            </div>

            <div className={s.mobileList}>
               {mobileList.map((item, i) => (
                  <TokenCard key={i} {...item} />
               ))}
            </div>
         </div>
      </div>
   );
};

export default AntixToken;
