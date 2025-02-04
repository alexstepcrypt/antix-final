import React from "react";
import styles from "./GuideModal.module.scss";
import Image from "next/image";
import exit from '@/public/svg/exit.svg'
import { useConnectWallet } from '@/hooks/useConnectWallet';
import { useRouter } from 'next/router';
interface GuideModalProps {
   isOpen: boolean;
   onClose: () => void;
   children?: React.ReactNode;
}

const GuideModal: React.FC<GuideModalProps> = ({ isOpen, onClose }) => {
   if (!isOpen) return null; 

    const { isConnected, connect } = useConnectWallet();
       const router = useRouter();
   
    async function buyHandler(e:React.MouseEvent<HTMLButtonElement>){
        if (isConnected) return
        e.preventDefault()
        window.dataLayer.push({
            event          : 'custom_event',
            event_category : 'button',
            event_action   : 'click',
            event_label    : 'connect_wallet_to_buy',
            event_content  : 'step_1',
            event_context  : 'main_form'
        })
        return connect()
    }

   return (
      <div className={styles.overlay} onClick={onClose}>
         <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            
            <button className={styles.closeButton} onClick={onClose}>
            <Image src={exit} alt="Exit" width={18} height={18} />
            </button>


            <p className={styles.guide}>Guide</p>
            <h2 className={styles.modalTitle}>What to Do If Your Web3 Wallet<br/> Doesn't Connect to a Website?</h2>

            <div className={styles.blocks}>
               <div className={styles.desktopSection}>
                  <h3>For PC</h3>
                  <p><strong>Step 1:</strong> Restart your browser. If this doesn’t help, proceed to the next step.</p>
                  <p><strong>Step 2:</strong> Clear your browser’s cache. If you’re using a VPN,<br/>disable it.<br/>If this doesn’t help, proceed to the next step.</p>
                  <p><strong>Step 3:</strong> Activate and deactivate your wallet in the browser extensions. If that doesn’t help, reinstall the wallet entirely (make sure you’ve saved your mnemonic phrase, or you’ll lose access to your wallet permanently). If this doesn’t help, proceed to the next step.</p>
                  <p><strong>Step 4:</strong> Install a mobile wallet. On the website, choose the "Wallet Connect" option, scan the QR code using your mobile wallet, and try completing the transaction from your phone. If this doesn’t help, proceed to the next step.</p>
                  <p><strong>Step 5:</strong> Try using another wallet: If you’re using <span className={styles.walletsType}>MetaMask</span>, try <span className={styles.walletsType}>Rabby Wallet</span>, <span className={styles.walletsType}>Trust Wallet</span>, or any other Web3 wallet.</p>
               </div>
   
               <div className={styles.mobileSection}>
                  <h3>For Mobile</h3>
                  <p><strong>Step 1:</strong> If you’re opening the website in a regular browser, copy the website link and paste it into the browser inside your wallet app. If this doesn’t help, proceed to the next step.</p>
                  <p><strong>Step 2:</strong> Clear the wallet app’s cache and try to complete the transaction again. If this doesn’t help, proceed to the next step.</p>
                  <p><strong>Step 3:</strong> Install another wallet app: If you’re using MetaMask, try SafePal, 1inch Wallet, or any other Web3 wallet. If this doesn’t help, proceed to the next step.</p>
                  <p><strong>Step 4:</strong> Try completing the transaction via PC.</p>
                  <p className={styles.boldText}>These steps should resolve most connection issues with Web3 wallets on websites.</p>
               </div>
            </div>

            <button className={styles.connectButton} onClick={buyHandler}>
               Connect Wallet
            </button>
         </div>
      </div>
   );
};

export default GuideModal;