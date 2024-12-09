import Link from 'next/link';

import s from './TokenHead.module.scss';
import { useTranslation } from 'react-i18next';

export const TokenHead = () => {
   const { t } = useTranslation('landing');
   return (
      <div className={s.head}>
         <section>
            <h2 className={s.title}>{t('antixToken.title')}</h2>
            <Link
               href="https://antix.gitbook.io/antix-white-paper"
               target="_blank"
               className={s.link}
            >
               {t('antixToken.whitepaper')}
            </Link>
         </section>

         <p className={s.description}>
            {t('antixToken.description')}
         </p>
      </div>
   );
};
