import bg from '/public/images/chance-bg.png';
import s from './TakeChance.module.scss';
import info from "../../public/svg/info.svg"
import Api from '@/utils/api';
import { useState } from 'react';
import { sendGAEvent } from '@/utils/utils';
import Image from 'next/image';
import questionModal from "/public/svg/questionModal.svg";

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
               <div className={s.infoСontainer}>
            <Image src={info} alt="info" className={s.info}/>
            <div className={s.modal}>
            Subscribe to our email newsletter to get info about the tokensale, receive token unlock and listing notifications and get a chance to win from a 1,000,000 prize pool!
            </div>
         </div>
            
            <div className={s.preview}>
               <h2>
                  Take your<br /><span>$1M Chance</span>
               </h2>
               <div className={s.space}></div>
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
