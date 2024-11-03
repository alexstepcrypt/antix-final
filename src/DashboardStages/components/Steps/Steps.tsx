import { type CSSProperties, Fragment } from 'react';
import s from './Steps.module.scss';

interface Stage {
   step: number;
   title: string;
   isCurrent: boolean;
}

interface StepsProps {
   stages: Stage[];
   style?: CSSProperties;
}

export const Steps = ({ stages, style }: StepsProps) => {
   return (
      <div
         style={style}
         className={s.container}
      >
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
