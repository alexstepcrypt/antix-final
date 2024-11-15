import Link from 'next/link';

import s from './TokenHead.module.scss';

export const TokenHead = () => {
   return (
      <div className={s.head}>
         <section>
            <h2 className={s.title}>ANTIX Token</h2>
            <Link
               href="https://antix.gitbook.io/antix-white-paper"
               target="_blank"
               className={s.link}
            >
               Whitepaper
            </Link>
         </section>

         <p className={s.description}>
            ANTIX is central to the Antix ecosystem. Here’s how the token
            creates value and drives demand within the platform.
         </p>
      </div>
   );
};
