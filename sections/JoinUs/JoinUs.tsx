"use client";

import React from "react";
import styles from "./JoinUs.module.scss";
import JoinUsCard from "../../components/JoinUsCard/JoinUsCard";
import { useTranslation } from "react-i18next";

const JoinUs = () => {
    const { t } = useTranslation('landing');

    return (
        <section className={styles.container} id="JoinUs">
            <video className={styles.backgroundVideo} autoPlay loop muted playsInline>
                <source
                    src={require("/public/video/join-us-video.webm")}
                    type="video/webm"
                />
                {t('joinUs.videoError')}
            </video>
            <div className={styles.content}>
                <h4 className={styles.title}>{t('joinUs.title')}</h4>
                <div className={styles.cardsContainer}>
                    <JoinUsCard
                        platform="x"
                        link="https://x.com/antix_in"
                        handle="@antix"
                        followers={44}
                    />
                    <JoinUsCard
                        platform="telegram"
                        link="https://t.me/antix_in"
                        handle="@antix"
                        followers={53}
                    />
                    <JoinUsCard
                        platform="discord"
                        link="https://discord.com/invite/bKcMXChRRT"
                        handle="@antix"
                        followers={7}
                    />
                </div>
            </div>
        </section>
    );
};

export default JoinUs;
