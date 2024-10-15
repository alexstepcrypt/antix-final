import bg from '@/public/images/team-bg.png';
import { TeamPreview } from './components/TeamPreview/TeamPreview';
import { LogoCarousel } from './components/LogoCarousel/LogoCarousel';
import { TeamCarousel } from './components/TeamCarousel/TeamCarousel';
import s from './Team.module.scss';

const Team = () => {
   return (
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
   );
};

export default Team;
