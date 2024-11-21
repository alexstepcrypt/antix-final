import styles from './EmailForm.module.scss';
import modalStyle from './StatusModal.module.scss';
import { Dispatch, useRef, useState, SetStateAction } from 'react';
import Api from '@/utils/api';
import { DepositErrIcon } from '../icons/DepositErrIcon';
import { ModalStatus } from './StatusModal';

interface FormProps {
   setDataStatus: Dispatch<SetStateAction<ModalStatus>>;
   dataStatus: ModalStatus;
}

export default function EmailForm({ setDataStatus, dataStatus }: FormProps) {
   const [error, setError] = useState(false);
   const emailRef = useRef<HTMLInputElement>(null);

   function sendEmail() {
      if (emailRef.current?.validity && !emailRef.current?.validity.valid) {
         setError(true);
         return;
      }
      Api.sendUserEmail(String(emailRef.current?.value)).then((res: any) => {});
      setDataStatus('subscribed');
   }

   return dataStatus === 'email' &&
      <>
         <p>
            Enter your email to receive notifications about stage dates, TGE,
            and unlocks
         </p>
         <input
            type="email"
            ref={emailRef}
            className={styles.email}
            placeholder="example@gmail.com"
            style={{ border: error ? '1px solid #BF3434' : '' }}
         />
         {error && (
            <span className={styles.error}>
               <DepositErrIcon />
               Invalid email format. Please try again
            </span>
         )}
         <button className={modalStyle.btn} onClick={sendEmail}>
            Notify me
         </button>
      </>
}
