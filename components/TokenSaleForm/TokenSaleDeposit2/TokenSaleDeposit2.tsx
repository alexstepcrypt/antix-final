"use client";

import Image from 'next/image'
import React, { useEffect } from 'react'
import styles from "./TokenSaleDeposit2.module.scss"

import LogoSmall from "/public/svg/logo-small.svg";
import BgHead from "/public/images/hero-timer-bg-head.png";
import { HeroTimer } from '@/sections/HeroSection/ui/HeroTimer/HeroTimer';
import Link from 'next/link';
import { useConnectWallet } from '@/hooks/useConnectWallet';
import { useRouter } from 'next/router';
import { useState } from 'react';
import StayUpdated from '@/components/StayUpdated/StayUpdated';
import Pays from '@/components/Pays/Pays';
import RaisedProgressBar from '@/DashboardStages/Stage1/DashboardTop/RaisedProgressBar/RaisedProgressBar'
import api from '@/utils/api'
import { useTranslation } from 'react-i18next';

import ETHIcon from '@/public/svg/ether-icon.svg';
import BNBIcon from '@/public/svg/bnb-icon.svg';
import BaseIcon from '@/public/svg/base-chain.svg';

interface ITokenSaleDeposit2 {
    stage1DateStr: string;
    setIsRefModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TokensSolded {
    current: number;
    target: number;
}

interface TokenApiResponse {
    stages: { cap: number, sold: number }[]
}

const TokenSaleDeposit2: React.FC<ITokenSaleDeposit2> = ({stage1DateStr, setIsRefModal}) => {
    const [tokens, setTokens] = useState<TokensSolded>({ current: 0, target: 0 });
    const { isConnected, connect } = useConnectWallet();
    const router = useRouter();
    const { t } = useTranslation('landing');

    async function buyHandler(e:React.MouseEvent<HTMLAnchorElement>){
        if (isConnected) return
        e.preventDefault()
        return connect()
    }

    useEffect(() => { api.soldProgress().then(r => r && setTokens(r)) }, []);

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
            {t('tokenSaleDeposit2.timerHead')}
        </div>
    </div>

    <div className={styles.timer}>
        <div className={styles.timerTitle}>
            <section>
                <h2 className={styles.timerHeading}>{t('tokenSaleDeposit2.stageTitle')}</h2>
            </section>

            <div className={styles.discount}>
                <p>{t('tokenSaleDeposit2.discountText')}</p>
            </div>
        </div>

        <div className={styles.timerContainer}>
            <span className={styles.title}>
                {t('tokenSaleDeposit2.stageEndsIn')}
            </span>

            <HeroTimer
                targetDate={new Date(stage1DateStr)}
            />
        </div>

        <div className={styles.stagePrice}>
            <section className={styles.leftPart}>
                <h3>{t('tokenSaleDeposit2.currentPrice')}</h3>
                <p>0.06 USD</p>
            </section>

            <div className={styles.prices}>
                <p>{t('tokenSaleDeposit2.listingPrice')}</p>
                <p>0.14 USD</p>
            </div>
        </div>

        <div className={styles.progress}>
            <RaisedProgressBar
                currentAmount={tokens.current}
                targetAmount={tokens.target}
                title={t('tokenSaleDeposit2.tokensSold')}
            />
        </div>

        <Link
            className={`${styles.timerButton}`}
            onClick={buyHandler}
            href="/dashboard"
        >
            <span className={styles.flare}></span>
            {isConnected ? t('tokenSaleDeposit2.buyButton.connected') : t('tokenSaleDeposit2.buyButton.disconnected')}
        </Link>


        <Pays />
        <StayUpdated />

        <div className={styles.referral}>
            <button
                onClick={() => setIsRefModal(true)}
                className={styles.refBtn}
            >
                {t('tokenSaleDeposit2.referralButton')}
            </button>
        </div>
    </div>
</div>
  )
}

export default TokenSaleDeposit2