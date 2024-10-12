import { Fragment } from 'react';

import tracker from '@/public/svg/tracker.svg';
import s from './Stage.module.scss';

interface List {
   title: string;
   description: string[];
}

interface StageProps {
   stage: string | null;
   isCurrent: boolean;
   year: string;
   event: string;
   list: List[];
}

export const Stage = ({ event, isCurrent, list, stage, year }: StageProps) => {
   return (
      <section className={`${s.container} ${isCurrent && s.active}`}>
         {stage && (
            <div className={s.badge}>
               {isCurrent && <img src={tracker.src} alt="you are here" />}
               <div className={s.stage}><p>{stage}</p></div>
            </div>
         )}

         <h2 className={s.title}>{year}</h2>
         <p className={s.event}>{event}</p>

         <div className={s.events}>
            {list.map((item, i) => {
               const isLast = i === list.length - 1;

               return (
                  <Fragment key={i}>
                     <h3 className={s.item}>{item.title}</h3>
                     <ul className={s.list}>
                        {item.description.map((item, i) => (
                           <li key={i}>
                              {item}
                           </li>
                        ))}
                     </ul>
                     {!isLast && <hr />}
                  </Fragment>
               )
            })}
         </div>
      </section>
   );
};