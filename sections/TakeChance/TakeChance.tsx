import bg from '/public/images/chance-bg.png';
import s from './TakeChance.module.scss';
import Api from '@/utils/api';
import { useState } from 'react';
import { sendGAEvent } from '@/utils/utils';
const TakeChance = () => {

   const [email, setEmail] = useState('');
   const [success, setSuccess] = useState(false);

   function sendEmail(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      Api.subscribe(email);
      sendGAEvent({event:'email_submitted'})
      setSuccess(true);
      setTimeout(() => {
         setSuccess(false);
      }, 3000);
   }

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
               onSubmit={sendEmail}
               className={s.form}
            >
               <label className={s.label}>
                  <input type="email" placeholder="example@gmail.com" onChange={e => setEmail(e.target.value)} />
               </label>

               <button className={s.submit} disabled={success}>
                  {success ? 'Thank you!' : 'Submit'}
               </button>
            </form>
         </div>
      </div>
   );
};

export default TakeChance;
