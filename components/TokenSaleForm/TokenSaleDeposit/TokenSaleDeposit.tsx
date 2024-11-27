import Image from 'next/image'
import React, { useEffect } from 'react'
import styles from "./TokenSaleDeposit.module.scss"

import LogoSmall from "/public/svg/logo-small.svg";
import BgHead from "/public/images/hero-timer-bg-head.png";
import { HeroTimer } from '@/sections/HeroSection/ui/HeroTimer/HeroTimer';
import Link from 'next/link';
import { TgIcon } from '@/components/GotQuestions/icons/TgIcon';
import { useConnectWallet } from '@/hooks/useConnectWallet';
import { useRouter } from 'next/router';

interface ITokenSaleDeposit {
    stage1DateStr: string;
    setIsRefModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const TokenSaleDeposit: React.FC<ITokenSaleDeposit> = ({stage1DateStr, setIsRefModal}) => {
    const { isConnected, connect } = useConnectWallet();
    const router = useRouter();

    async function buyHandler(e:React.MouseEvent<HTMLAnchorElement>){
        e.preventDefault()
        if (!isConnected) {
            return connect()
        }
        router.push('/dashboard')
    }

    useEffect(()=>{
        if (!isConnected || router.pathname !== '/') return
        router.push('/dashboard')
    }, [isConnected])

    return (
    <div className={styles.container}>
    <div
        className={styles.timerHead}
        style={{ backgroundImage: `url(${BgHead.src})` }}
    >
        <div className={styles.timerWrapperTitle}>
            <Image
                src={LogoSmall}
                width={30}
                height={30}
                alt="Logo"
                className={styles.logo}
            />
            Token Sale
        </div>
    </div>

    <div className={styles.timer}>
        <div className={styles.timerTitle}>
            <section>
                <h2 className={styles.timerHeading}>Deposit Stage</h2>
                <p className={styles.timerDesc}>To secure your access to Stage 1</p>
            </section>

            <div className={styles.discount}>
                <p>-79%</p>
            </div>
        </div>

        <div className={styles.timerContainer}>
            <span className={styles.title}>
                Stage 1 starts in
            </span>

            <HeroTimer
                targetDate={new Date(stage1DateStr)}
            />
        </div>

        <section className={styles.stagePrice}>
            <h3>Stage 1 price</h3>

            <div className={styles.prices}>
                <p>0.03 USDT</p>
                <p className={styles.prevPrice}>0.14 USDT</p>
            </div>
        </section>

        <Link
            className={`${styles.timerButton}`}
            onClick={buyHandler}
            href="#buy"
        >
            <span className={styles.flare}></span>
            {isConnected ? 'Buy Now' : 'Connect Wallet to Buy'}
        </Link>

        <span className={styles.suggestion}>
            and get -79% to TGE Price
        </span>

        <div className={styles.pays}>
            <h3 className={styles.paysTitle}>Pay with</h3>
            
            <div className={styles.paysCards}>
                <div className={styles.paysCard}>
                    <Image src={'/svg/tether-icon.svg'} alt="USDT" width={35.45} height={35.45} />
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
                    <Image src={'/svg/usdc-icon.svg'} alt="USDC" width={35.45} height={35.45} />
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
                        </div>
                    </div>
                </div>
                <div className={styles.paysCard}>
                    <Image src={'/svg/bnb-icon.svg'} alt="BNB" width={35.45} height={35.45} />
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
                    gap: 7
                }}
                className={styles.paysCards}
            >
                <div className={styles.paysCard1}>
                    <Image src={'/svg/ether-icon.svg'} alt="USDC" width={17} height={17} />
                    <span>ETH</span>
                </div>
                <div className={styles.paysCard1}>
                    <Image src={'/dashboard/svg/visa-logo.svg'} alt="visa" width={30.8} height={13} />
                    <Image src={'/dashboard/svg/mastercard-logo.svg'} alt="mastercard" width={24.77} height={19} />
                </div>
            </div>
        </div>

        <div className={styles.questions}>
            <span>Stay Updated!</span>
            Connect to our
            <button
                className={styles.btn}
                onClick={() =>
                    window.open("https://t.me/antixtoken_bot", "_blank")
                }
            >
                <TgIcon />
                Telegram bot
            </button>
            for stage start alerts or support assistance.
        </div>

        <div className={styles.referral}>
            <button
                onClick={() => setIsRefModal(true)}
                className={styles.refBtn}
            >
                + Get referral link
            </button>
        </div>
    </div>
</div>
  )
}

export default TokenSaleDeposit