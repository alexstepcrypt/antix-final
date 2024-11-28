import Image from 'next/image'
import React, { useEffect } from 'react'
import styles from "./TokenSaleDeposit2.module.scss"

import LogoSmall from "/public/svg/logo-small.svg";
import BgHead from "/public/images/hero-timer-bg-head.png";
import { HeroTimer } from '@/sections/HeroSection/ui/HeroTimer/HeroTimer';
import Link from 'next/link';
import { useConnectWallet } from '@/hooks/useConnectWallet';
import { useRouter } from 'next/router';
import StayUpdated from '@/components/StayUpdated/StayUpdated';
import Pays from '@/components/Pays/Pays';

interface ITokenSaleDeposit2 {
    stage1DateStr: string;
    setIsRefModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const TokenSaleDeposit2: React.FC<ITokenSaleDeposit2> = ({stage1DateStr, setIsRefModal}) => {
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
                <h2 className={styles.timerHeading}>Get early access to Stage 2</h2>
            </section>

            <div className={styles.discount}>
                <p>-73%</p>
            </div>
        </div>

        <div className={styles.timerContainer}>
            <span className={styles.title}>
                Stage 2 starts in
            </span>

            <HeroTimer
                targetDate={new Date(stage1DateStr)}
            />
        </div>

        <section className={styles.stagePrice}>
            <h3>Stage 2 price</h3>

            <div className={styles.prices}>
                <p>0.04 USDT</p>
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


        <Pays />
        <StayUpdated />

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

export default TokenSaleDeposit2