import { useTranslation } from 'react-i18next';
import s from './GotQuestions.module.scss';
import { TgIcon } from './icons/TgIcon';

export const GotQuestions = () => {
   const { t } = useTranslation('dashboard');

   return (
      <div className={s.questions}>
            <p>{t('stage.gotQuestions.text')}</p>
            <button
               className={s.btn}
               onClick={() =>
                  window.open("https://t.me/antixtoken_bot", "_blank")
               }
            >
               <TgIcon />
               {t('stage.gotQuestions.text_2')}
            </button>
      </div>
   );
};