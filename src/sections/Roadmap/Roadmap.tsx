import bg from '@/public/images/roadmap-bg.png';
import s from './Roadmap.module.scss';

const Roadmap = () => {
   return (
      <div
         style={{ backgroundImage: `url(${bg.src})` }}
         className={s.container}
      >
         <h2 className={s.title}>Roadmap</h2>

         <div className={s.carousel}>

         </div>
      </div>
   );
};

export default Roadmap;
