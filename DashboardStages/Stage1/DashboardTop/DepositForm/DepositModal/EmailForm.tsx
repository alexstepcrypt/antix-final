import styles from './EmailForm.module.scss';
import modalStyle from './StatusModal.module.scss';
import { useRef, useState } from 'react';
import Api from '@/utils/api';

export default function EmailForm() {
   const [sended, setSended] = useState(false)
   const emailRef = useRef<HTMLInputElement>(null)

   function sendEmail(){
      if (emailRef.current?.validity && !emailRef.current?.validity.valid){
         return alert('Invalid email')
      }
      Api.sendUserEmail(String(emailRef.current?.value)).then((res:any)=>{
         setSended(true)
      })
   }

   function continueFn(){
      window.location.reload()
   }

   return <>
      {!sended && <>
         <p>Enter your email to receive notifications about stage dates, TGE, and unlocks</p>
         <input type="email" ref={emailRef} className={styles.email} placeholder='example@gmail.com' />
         <button className={modalStyle.btn} onClick={sendEmail}>Notify me</button>
      </>}
      {sended && <>
         <p>Thank you! Your email has been successfully registered. You'll now receive updates and notifications.</p>
         <button className={modalStyle.btn} onClick={continueFn}>Continue</button>
      </>}
   </>
}
