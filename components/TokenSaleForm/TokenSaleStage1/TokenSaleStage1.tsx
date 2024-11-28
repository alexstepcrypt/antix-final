import Image from 'next/image'
import React from 'react'
import styles from "./TokenSaleStage1.module.scss"

import LogoSmall from "/public/svg/logo-small.svg";
import BgHead from "/public/images/hero-timer-bg-head.png";
import { HeroTimer } from '@/sections/HeroSection/ui/HeroTimer/HeroTimer';
import Link from 'next/link';
import { TgIcon } from '@/components/GotQuestions/icons/TgIcon';
import { useConnectWallet } from '@/hooks/useConnectWallet';
import RaisedProgressBar from '@/DashboardStages/Stage1/DashboardTop/RaisedProgressBar/RaisedProgressBar';
import Pays from '@/components/Pays/Pays';
import StayUpdated from '@/components/StayUpdated/StayUpdated';

interface ITokenSaleStage1 {
    stage1DateStr: string;
    setIsRefModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const TokenSaleStage1:React.FC<ITokenSaleStage1> = ({stage1DateStr, setIsRefModal}) => {
    const { account } = useConnectWallet();

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
                <h2 className={styles.timerHeading}>Stage 1</h2>
            </section>

            <div className={styles.discount}>
                <p>-79% to TGE Price</p>
            </div>
        </div>

        <div className={styles.timerContainer}>
            <span className={styles.title}>
                Stage 1 ends in
            </span>

            <HeroTimer
                targetDate={new Date(stage1DateStr)}
            />
        </div>

        <section className={styles.stagePrice}>
            <h3>Current Price <span>0.03 USD</span></h3>

            <div className={styles.prices}>
                <p>Listing(TGE) Price</p>
                <p className={styles.prevPrice}>0.14 USD</p>
            </div>
        </section>

        <div className={styles.progress}>
            <RaisedProgressBar
                segments={17}
                title='Tokens sold:'
                currentAmount={14500000}
                targetAmount={17000000}
                color='#99FFF9'
            />
        </div>

        {/* <div className={styles.warn}>
            <span>Access is limited</span>—don’t miss the chance to participate on the best terms
        </div> */}

        <Link
            className={`${styles.timerButton}`}
            href="/dashboard"
        >
            <span className={styles.flare}></span>
            {account ? 'Buy Now' : 'Connect Wallet to Buy'}
        </Link>

        <span className={styles.suggestion}>
            and get -79% to TGE Price
        </span>

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

export default TokenSaleStage1