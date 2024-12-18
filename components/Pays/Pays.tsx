import styles from './Pays.module.scss';
import Image from 'next/image';

const Pays = () => {
   return (
      <div className={styles.pays}>
         <h3 className={styles.paysTitle}>Pay with</h3>
         <div className={styles.paysCards}>
            <div className={styles.paysCard}>
               <Image
                  src={'/svg/tether-icon.svg'}
                  alt="USDT"
                  width={35.45}
                  height={35.45}
               />
               <div>
                  <span>USDT</span>
                  <div className={styles.networks}>
                     <Image
                        className={styles.network}
                        src={'/svg/ether-icon.svg'}
                        alt="eth"
                        width={12.5}
                        height={12.5}
                     />
                     <Image
                        className={styles.network}
                        src={'/svg/network-icon.svg'}
                        alt="bnb"
                        width={12.5}
                        height={12.5}
                     />
                  </div>
               </div>
            </div>
            <div className={styles.paysCard}>
               <Image
                  src={'/svg/usdc-icon.svg'}
                  alt="USDC"
                  width={35.45}
                  height={35.45}
               />
               <div>
                  <span>USDC</span>
                  <div className={styles.networks}>
                     <Image
                        className={styles.network}
                        src={'/svg/ether-icon.svg'}
                        alt="eth"
                        width={12.5}
                        height={12.5}
                     />
                     <Image
                        className={styles.network}
                        src={'/svg/network-icon.svg'}
                        alt="bnb"
                        width={12.5}
                        height={12.5}
                     />
                     <Image
                        className={styles.network}
                        src={'/svg/base-chain.svg'}
                        alt="bnb"
                        width={12.5}
                        height={12.5}
                     />
                  </div>
               </div>
            </div>
            <div className={styles.paysCard}>
               <Image
                  src={'/svg/bnb-icon.svg'}
                  alt="BNB"
                  width={35.45}
                  height={35.45}
               />
               <div>
                  <span>BNB</span>
                  <div className={styles.networks}>
                     <Image
                        className={styles.network}
                        src={'/svg/network-icon.svg'}
                        alt="bnb"
                        width={14.5}
                        height={14.5}
                     />
                  </div>
               </div>
            </div>
         </div>
         <div
            style={{
               justifyContent: 'center',
               marginTop: 10,
               gap: 7,
            }}
            className={styles.paysCards}>
            <div className={styles.paysCard1}>
               <Image
                  src={'/svg/ether-icon.svg'}
                  alt="USDC"
                  width={17}
                  height={17}
               />
               <span>ETH</span>
            </div>
            <div className={styles.paysCard1}>
               <Image
                  src={'/dashboard/svg/visa-logo.svg'}
                  alt="visa"
                  width={30.8}
                  height={13}
               />
               <Image
                  src={'/dashboard/svg/mastercard-logo.svg'}
                  alt="mastercard"
                  width={24.77}
                  height={19}
               />
            </div>
            <div className={styles.paysCard1}>
               <p>+4 coins</p>
            </div>
         </div>
      </div>
   );
};

export default Pays;
