import { Fragment } from 'react';
import s from './Steps.module.scss';

interface Stage {
   step: number;
   title: string;
   isCurrent: boolean;
}

interface StepsProps {
   stages: Stage[];
}

export const Steps = ({ stages }: StepsProps) => {
   return (
      <div className={s.container}>
         {stages.map((stage, i) => {
            const { isCurrent, step, title } = stage;
            const isLast = stages.length === i + 1;

            return (
               <Fragment key={i}>
                  <section className={`${s.stage} ${isCurrent && s.activeTitle}`}>
                     <h2 className={s.title}>
                        {step}
                     </h2>
                     <p>{title}</p>
                  </section>

                  {!isLast && (
                     <hr className={`${s.step} ${isCurrent && s.activeStep}`} />
                  )}
               </Fragment>
            );
         })}
      </div>
   );
};
