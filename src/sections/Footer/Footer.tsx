'use client';

import styles from './Footer.module.scss';

import socialX from '/public/svg/social-x.svg';
import socialTelegram from '/public/svg/social-telegram.svg';
import socialDiscord from '/public/svg/social-discord.svg';

import TitleImg from '/public/svg/footer-bg.svg';
import Image from 'next/image';
import { scrollToId } from '@/utils/scrollToId';
import { useMobile } from '@/hooks/useMobile';

const Footer = () => {
   const isMobile = useMobile(960);

   return (
      <div className={styles.container}>
         <footer className={styles.footer} id="Footer">
            <div className={styles.footerConatiner}>
               <div className={styles.topWrapper}>
                  <div className={styles.topItem}>
                     <span className={styles.smallTitle}>Follow us:</span>
                     <div className={styles.socials}>
                        <a
                           href="https://x.com/antix_in"
                           target="_blank"
                           className={styles.socialLink}>
                           <Image src={socialX} alt="X" />
                        </a>
                        <a
                           href="https://discord.com/invite/bKcMXChRRT"
                           target="_blank"
                           className={styles.socialLink}>
                           <Image src={socialDiscord} alt="Discord" />
                        </a>
                        <a
                           href="https://t.me/antix_in"
                           target="_blank"
                           className={styles.socialLink}>
                           <Image src={socialTelegram} alt="Telegram" />
                        </a>
                     </div>
                  </div>
                  <div className={styles.topItem}>
                     <span className={styles.smallTitle}>E-mail:</span>
                     <a
                        href="mailto:token@antix.in"
                        className={styles.mailLink}>
                        hello@antix.in
                     </a>
                     <div className={styles.centerLinksWrapper}>
                        <div className={styles.linkWrapper}>
                           <button
                              onClick={() =>
                                 scrollToId(
                                    !isMobile ? 'Advisors' : 'Team1',
                                 )
                              }>
                              Advisors
                           </button>
                           <button onClick={() => scrollToId('ANTIXTokens')}>
                              ANTIX Token
                           </button>
                           <button onClick={() => scrollToId('Tokenomics')}>
                              Tokenomics
                           </button>
                        </div>
                        <div className={styles.linkWrapper}>
                           <button onClick={() => scrollToId('AboutProject')}>
                              About project
                           </button>
                           <button
                              onClick={() =>
                                 scrollToId(!isMobile ? 'Team' : 'Team1')
                              }>
                              Team
                           </button>
                           <button onClick={() => scrollToId('FeaturedIn')}>
                              Partners
                           </button>
                        </div>

                        <div className={styles.linkWrapper}>
                           <button onClick={() => scrollToId('RoadMap')}>
                              Road map
                           </button>
                           <button onClick={() => scrollToId('JoinUs')}>
                              Community
                           </button>
                        </div>
                     </div>
                  </div>
               </div>

               <div className={styles.bootomWrapper}>
                  <div className={styles.bootomLinkWrapper}>
                     <a href="#" className={styles.bootomLink}>
                        Terms of Use
                     </a>
                     <a href="#" className={styles.bootomLink}>
                        Privacy Policy
                     </a>
                     <p className={styles.bootomInfo}>
                        Antix Interactive Inc. All Rights Reserved
                     </p>

                     {/* SHOWS ONLY AT MOBILE */}
                     <span className={`${styles.bootomInfo} ${styles.mobile}`}>
                        © 2024
                     </span>
                  </div>
                  <span className={styles.bootomInfo}>© 2024</span>

                  {/* SHOWS ONLY AT MOBILE */}
                  <p className={`${styles.bottomInfo} ${styles.mobile}`}>
                     Antix Interactive Inc. All Rights Reserved
                  </p>
               </div>
            </div>
            <div className={styles.bgTitle}>
               <Image src={TitleImg} alt="Antix" draggable={false} />
            </div>
         </footer>
      </div>
   );
};

export default Footer;
