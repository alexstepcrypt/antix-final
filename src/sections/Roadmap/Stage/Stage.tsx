import { Fragment } from 'react';
import Image from 'next/image';

import checked from '/public/svg/roadmap-check.svg';
import notChecked from '/public/svg/roadmap-list-item.svg';
import tracker from '/public/svg/tracker.svg';
import s from './Stage.module.scss';

interface List {
   title: string;
   description: string[];
   isDone: boolean;
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
            {list.map((elem, i) => {
               const { description, isDone, title } = elem;
               const isLast = i === list.length - 1;

               return (
                  <Fragment key={i}>
                     <h3 className={s.item}>{title}</h3>
                     <ul>
                        {description.map((item, i) => (
                           <div className={s.list} key={i}>
                              <Image
                                 src={isDone ? checked : notChecked}
                                 alt="list-icon"
                                 width={12}
                                 height={12}
                              />
                              <li>
                                 {item}
                              </li>
                           </div>
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