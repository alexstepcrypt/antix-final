import styles from './StatusModal.module.scss';
import { useRef, useEffect } from 'react';
import { useChainId } from 'wagmi';
const explorerUrls: {[key: number]: string} = {
	1  : 'https://etherscan.io',
	56 : 'https://bscscan.com'
}

interface ModalProps {
   txHash   : string
   status   : 'none' | 'pending' | 'success' | 'fail',
   retryFn  : Function
}

export default function DepositStatusModal({ txHash, status, retryFn }: ModalProps) {
   const chainId = useChainId()
   const dialog:any = useRef(null)

   useEffect(()=>{
      if (status === 'none' || !dialog.current) return
      
      dialog.current.showModal()
   }, [status])

   function close(){
      dialog.current.close()
   }

   function handleContinue(){
      window.location.reload()
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
            <p>Please try again or contact support: <a href="https://t.me/antixtoken_bot" rel='noopener' target='_blank'>@antixtoken_bot</a></p></>
      },
      success: {
         title : 'Congrats!',
         desc  : <><p>You have successfully made a <a href={txUrl} target='_blank' rel="noopener">deposit</a>.<br />
      Wait for Stage 1 to get your ANTIX tokens distributed</p></>
      }
   } as any)[status] || {}


   return <dialog ref={dialog} popover="auto" className={styles.modal} data-status={status}>
      <button data-action="close" onClick={close}></button>

      <figure></figure>
      <h5>{content.title}</h5>
      <article>{content.desc}</article>

      {status==='fail' && <button className={styles.btn} onClick={()=>retryFn()}>Retry</button>}
      {status==='success' && <button className={styles.btn} onClick={handleContinue}>Continue</button>}
   </dialog>
}
