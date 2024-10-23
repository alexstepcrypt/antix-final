import s from './StatisticCard.module.scss';

interface StatisticCardProps {
   title: string;
   description: string;
}

export const StatisticCard = ({ description, title }: StatisticCardProps) => {
   return (
      <section className={s.card}>
         <h2 className={s.title}>{title}</h2>
         <p className={s.description}>{description}</p>
      </section>
   );
};