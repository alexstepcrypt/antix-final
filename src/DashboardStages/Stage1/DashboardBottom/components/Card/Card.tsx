import type { CSSProperties, PropsWithChildren } from 'react';

import s from './Card.module.scss';

export const DashboardCard = ({
   children,
   style,
}: PropsWithChildren<{ style?: CSSProperties }>) => {
   return (
      <section style={style} className={s.wrapper}>
         {children}
      </section>
   );
};
