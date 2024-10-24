import s from './List.module.scss';

interface Value {
   title: string;
   subtitle: string;
}

interface ListProps {
   values: Value[];
}

export const DashboardList = ({ values }: ListProps) => {
   return (
      <ul className={s.list}>
         {values.map((val, i) => (
            <li className={s.element} key={i}>
               {val.title}
               <p>{val.subtitle}</p>
            </li>
         ))}
      </ul>
   );
};