"use client"

import bg from '/public/images/team-bg.png';
import { TeamPreview } from './components/TeamPreview/TeamPreview';
import { LogoCarousel } from './components/LogoCarousel/LogoCarousel';
import { TeamCarousel } from './components/TeamCarousel/TeamCarousel';
import s from './Team.module.scss';
import { commandList } from './components/TeamCarousel/mocdata';
import { advisorsList } from '../Advisors/mocdata';
import { Tabs } from '@/components/Tabs/Tabs';
import { useTabStore } from '@/stores/useTabStore'

const Team = () => {
   const { setTab, tab } = useTabStore();

   return (
      <>
         <div className={s.teamAdvisorsMobile} id='Team1'>
            <div className={s.mobileBtns}>
               <button
                  className={tab === 'team'? s.mobileActive : ''}
                  onClick={() => setTab('team')}
               >
                  Team
               </button>
               <button
                  className={tab === 'advisors'? s.mobileActive : ''}
                  onClick={() => setTab('advisors')}
               >
                  Advisors
               </button>
            </div>
            <p className={s.mobileDesc}>The team has a proven track record of <span>successfully managing business projects.</span> They bring significant experience and exceptional knowledge regarding digital humans & Web3 ventures at scale</p>
            <Tabs data={tab === "team" ? commandList : advisorsList} />
         </div>
         <div
            id="Team"
            className={s.team}
            style={{ backgroundImage: `url(${bg.src})` }}
         >
            <TeamPreview />
            <div>
               <LogoCarousel />
               <TeamCarousel />
            </div>

         </div>
      </>
   );
};

export default Team;
