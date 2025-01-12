import bg from '/public/images/chance-bg.png';
import s from './TakeChance.module.scss';

const TakeChance = () => {
   return (
      <div className={s.gradient}>
         <div
            style={{ backgroundImage: `url(${bg.src})` }}
            className={s.container}>
            <div className={s.preview}>
               <h2>
                  Take your <span>$1M Chance</span>
               </h2>
               <p>Unlock your chance to earn from a $1,000,000 pool</p>
            </div>

            <form
               onSubmit={e => e.preventDefault()}
               className={s.form}
            >
               <label className={s.label}>
                  <input type="email" placeholder="example@gmail.com" />
               </label>

               <button className={s.submit}>
                  Submit
               </button>
            </form>
         </div>
      </div>
   );
};

export default TakeChance;
