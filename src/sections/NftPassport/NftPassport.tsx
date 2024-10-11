import Image from 'next/image';

import nft from '@/public/images/nft-passport.png';
import Passport from '@/public/images/nft.png';
import vector from '@/public/svg/passport-vector.svg';
import bg from '@/public/images/nft-passport-bg.png';
import s from './NftPassport.module.scss';
import { FadeInNew } from '@/components/FadeInNew/FadeInNew';

const NftPassport = () => {
   return (
      <div style={{ backgroundImage: `url(${bg.src})` }} className={s.wrapper}>
         <div className={s.content}>
            <Image src={vector} alt="passport-vector" />

            <section>
               <div className={`${s.passport} df jcc`}>
                  <p>Unique NFT Passport</p>
               </div>
               <h2 className={s.title}>
                  Blockchain-proven <br /> ownership
               </h2>
            </section>

            <div className={s.imageWrapper}>
               <Image
                  src={nft}
                  alt="nft-passport"
                  width={1024}
                  height={713}
                  loading="lazy"
                  draggable={false}
               />

               <div className={s.passportImageWrapper}>
                  <FadeInNew>
                     <Image
                        className={s.passportImage}
                        src={Passport}
                        alt="passport"
                        width={612}
                        height={680}
                        loading="lazy"
                        // draggable={false}
                     />
                  </FadeInNew>
               </div>
            </div>

            <p className={s.description}>
               All your digital humans and assets are backed by blockchain,
               giving you full control and intellectual property rights over
               your creations. This NFT Passport certifies the ownership and
               authenticity of your avatar, ensuring both security and rights to
               your digital assets.
            </p>
         </div>
      </div>
   );
};

export default NftPassport;
