import s from './GotQuestions.module.scss';
import { TgIcon } from './icons/TgIcon';

export const GotQuestions = () => {
   return (
      <div className={s.questions}>
            <p>Got questions?</p>
            <button
               className={s.btn}
               onClick={() =>
                  window.open("https://t.me/antixtoken_bot", "_blank")
               }
            >
               <TgIcon />
               We're here to help!
            </button>
      </div>
   );
};