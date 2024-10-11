import Image from 'next/image';

import top10 from '@/public/svg/team/top10.svg';
import logo1 from '@/public/svg/team/ico1.svg';
import logo2 from '@/public/svg/team/ico2.svg';
import logo3 from '@/public/svg/team/ico3.svg';
import logo4 from '@/public/svg/team/ico4.svg';
import { StatisticCard } from '../StatisticCard/StatisticCard';
import s from './TeamPreview.module.scss';

const statisticList = [
   { title: '20+', description: 'Existing Clients' },
   { title: '20', description: 'Completed Projects' },
   { title: '10', description: 'R&D Completed' },
   { title: '70+', description: 'Cinematic Created' },
];

const logosList = [logo1, logo2, logo3, logo4];

export const TeamPreview = () => {
   return (
      <div className={s.preview}>
         <section>
            <h2 className={s.title}>Team</h2>
            <p className={s.description}>
               The team has a proven track record of{' '}
               <span>successfully managing business projects.</span> They bring
               significant experience and exceptional knowledge regarding
               digital humans & Web3 ventures at scale
            </p>
         </section>

         <div className={s.statistic}>
            {statisticList.map((item, i) => (
               <StatisticCard key={i} {...item} />
            ))}
         </div>

         <div className={s.list}>
            <Image src={top10.src} alt="top10-icon" width={174} height={35} />

            <div className={s.logos}>
               {logosList.map((logo, i) => (
                  <Image
                     key={i}
                     src={logo.src}
                     alt="logo"
                     width={40}
                     height={53}
                  />
               ))}
            </div>
         </div>
      </div>
   );
};
