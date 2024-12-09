import Image from 'next/image';

import coin from '/public/svg/token/coin.svg';
import glow from '/public/images/token-glow.png';
import { FadeInNew } from '../../components/FadeInNew/FadeInNew';
import { TokenCard } from './components/TokenCard/TokenCard';
import { TokenHead } from './components/TokenHead/TokenHead';
import { TokenBody } from './components/TokenBody/TokenBody';
import { mobileList } from './mocdata';
import s from './AntixToken.module.scss';
import { useTranslation } from 'react-i18next';
import { listTextType } from './mocdata';

const AntixToken = () => {
   const { t } = useTranslation('landing');

   const leftListText = t('antixToken.leftList', { returnObjects: true }) as Array<listTextType>;
   const midListText = t('antixToken.midList', { returnObjects: true }) as Array<listTextType>;
   const rightListText = t('antixToken.rightList', { returnObjects: true }) as Array<listTextType>;
   const mobileTextList = t('antixToken.mobileList', { returnObjects: true }) as Array<listTextType>;

   return (
      <div
         style={{ backgroundImage: `url(${glow.src})` }}
         className={s.wrapper}
         id='ANTIXTokens'
      >
         <div id="ANTIXTokens">
            <TokenHead />
            <TokenBody leftListText={leftListText} midListText={midListText} rightListText={rightListText} />

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
               {mobileTextList.map((item, i) => (
                  <TokenCard key={i} {...item} icon={mobileList[i]} />
               ))}
            </div>
         </div>
      </div>
   );
};

export default AntixToken;
