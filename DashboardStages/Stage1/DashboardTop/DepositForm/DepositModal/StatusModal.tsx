import styles from './StatusModal.module.scss';
import { useRef, useEffect, useState } from 'react';
import { useChainId } from 'wagmi';
import EmailForm from './EmailForm';
import Link from 'next/link'
import { TgIcon } from '@/components/GotQuestions/icons/TgIcon'

const explorerUrls: {[key: number]: string} = {
	1  : 'https://etherscan.io',
	56 : 'https://bscscan.com'
}

export type ModalStatus = 'none' | 'pending' | 'success' | 'email' | 'subscribed' | 'fail';
interface ModalProps {
   txHash   : string
   status   : ModalStatus,
   retryFn  : Function
}

export default function DepositStatusModal({ txHash, status, retryFn }: ModalProps) {
   // status = 'success'
   const chainId = useChainId()
   const dialog:any = useRef(null)
   const [dataStatus, setDataStatus] = useState(status);

   useEffect(()=>{
      setDataStatus(status)
   },[status])

   useEffect(()=>{
      console.log('useeffect dataStatus', dataStatus, dialog.current)
      if (dataStatus === 'none' || !dialog.current) return
      
      dialog.current.showModal()
   }, [dataStatus])

   function close(){
      dialog.current.close()
   }

   const txUrl = explorerUrls[chainId] + '/tx/' + txHash
   const content:any = ({
      pending: {
         title : 'Waiting for confirmation',
         desc  : <></>
      },
      fail: {
         title : 'Error',
         desc  : <><p>Your transaction has failed. This might be due to the insufficient gas or network congestion.</p>
            <p style={{ marginTop: 24 }}>Please try again or contact support: <a style={{ color: '#12FFF1' }} href="https://t.me/antixtoken_bot" rel='noopener' target='_blank'>@antixtoken_bot</a></p></>
      },
      success: {
         title : 'Congrats!',
         desc  : (
            <>
               <p className={styles.successTitle}>You have successfully made a <a href={txUrl} target='_blank' rel="noopener">deposit.</a></p>

               <p className={styles.successDesc}>
                  Subscribe to our{" "}
                  <a
                     className={styles.tgBot}
                     href="https://t.me/antixtoken_bot?start=w32496746"
                     target='_blank'
                     rel='noopener'
                  >
                     <TgIcon />
                     Telegram Bot
                  </a>{" "}
                  to get Notified about the Token Sale Stages, TGE date, and token distribution
               </p>
            </>
         )
      },
      email: {
         title: '',
         desc: <EmailForm dataStatus={dataStatus} setDataStatus={setDataStatus} />
      },
      subscribed: {
         title: '',
         desc: (
            <p>
               Thank you! Your email has been successfully registered. You'll now
               receive updates and notifications.
            </p>
         )
      }
   } as any)[dataStatus] || {}


   return <dialog ref={dialog} popover="auto" className={styles.modal} data-status={dataStatus}>
      <button data-action="close" onClick={close}></button>

      <figure></figure>
      {content.title !== '' && <h5>{content.title}</h5>}
      <article>{content.desc}</article>

      {dataStatus ==='fail' && <button style={{ marginTop: 16 }} className={styles.btn} onClick={()=>retryFn()}>Retry</button>}

      {dataStatus === 'success' && (
         <>
            <a href="https://t.me/antixtoken_bot?start=w32496746" target="_blank" className={styles.openTelegram}>
               Open Telegram
            </a>
            <span className={styles.openEmailForm}>Or subscribe via email</span>
         </>
      )}
   </dialog>
}
