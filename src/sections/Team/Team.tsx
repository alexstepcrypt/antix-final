"use client"

import bg from '@/public/images/team-bg.png';
import { TeamPreview } from './components/TeamPreview/TeamPreview';
import { LogoCarousel } from './components/LogoCarousel/LogoCarousel';
import { TeamCarousel } from './components/TeamCarousel/TeamCarousel';
import s from './Team.module.scss';
import { commandList } from './components/TeamCarousel/mocdata';
import { advisorsList } from '../Advisors/mocdata';
import { Tabs } from '@/components/Tabs/Tabs';
import { useState } from 'react';

const Team = () => {
   const [activeBtn, setActiveBtn] = useState<"team" | "advisors">("team")

   const handleTabClick = (tab: "team" | "advisors") => {
      setActiveBtn(tab);
   }; 

   return (
      <>
         <div className={s.teamAdvisorsMobile}>
            <div className={s.mobileBtns}>
               <button
                  className={activeBtn === 'team'? s.mobileActive : ''}
                  onClick={() => handleTabClick('team')}
               >
                  Team
               </button>
               <button
                  className={activeBtn === 'advisors'? s.mobileActive : ''}
                  onClick={() => handleTabClick('advisors')}
               >
                  Advisors
               </button>
            </div>
            <p className={s.mobileDesc}>The team has a proven track record of <span>successfully managing business projects.</span> They bring significant experience and exceptional knowledge regarding digital humans & Web3 ventures at scale</p>
            <Tabs data={activeBtn === "team" ? commandList : advisorsList} />
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
