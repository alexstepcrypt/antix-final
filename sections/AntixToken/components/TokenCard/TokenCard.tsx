import type { ReactNode } from 'react';
import s from './TokenCard.module.scss';

interface TokenCardProps {
   icon: string;
   title: string;
   description: string;
}

export const TokenCard = ({ description, icon, title }: TokenCardProps) => {
   return (
      <section className={s.card}>
         <img className={s.icon} src={icon} alt="card-icon" />
         <h2 className={s.title}>{title}</h2>
         <p className={s.description}>{description}</p>
      </section>
   );
};
