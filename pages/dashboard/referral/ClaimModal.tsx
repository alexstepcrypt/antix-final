import styles from './ClaimModal.module.scss';
import { useRef, useEffect, useState } from 'react';
import { useChainId } from 'wagmi';
import { explorerUrls } from '@/utils/utils'

export type ModalStatus = 'none' | 'pending' | 'success' | 'fail';
interface ModalProps {
   txHash   : string
   status   : ModalStatus,
   retryFn  : Function
}

export default function ClaimStatusModal({ txHash, status, retryFn }: ModalProps) {
   const chainId = useChainId()
   const dialog:any = useRef(null)
   const [dataStatus, setDataStatus] = useState(status);

   useEffect(()=>{
      setDataStatus(status)
   },[status])

   useEffect(()=>{
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
         desc  : <p className={styles.successTitle}>You have successfully <a href={txUrl} target='_blank' rel="noopener">claim.</a></p>
      }
   } as any)[dataStatus] || {}


   function reloadPage(){
      window.location.reload()
   }


   return <dialog ref={dialog} popover="auto" className={styles.modal} data-status={dataStatus}>
      <button data-action="close" onClick={close}></button>

      <figure></figure>
      {content.title !== '' && <h5>{content.title}</h5>}
      <article>{content.desc}</article>

      {dataStatus ==='fail' && <button style={{ marginTop: 16 }} className={styles.btn} onClick={()=>retryFn()}>Retry</button>}

      {dataStatus === 'success' && (
         <button style={{ marginTop: 16 }} className={styles.btn} onClick={()=>reloadPage()}>Continue</button>
      )}
   </dialog>
}
