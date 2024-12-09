"use client";

import React from "react";
import styles from "./AIDriven.module.scss";
import { useTranslation } from "react-i18next";

const AIDriven = () => {
    const { t } = useTranslation('landing');
    return (
        <section className={styles.container}>
            <video className={styles.backgroundVideo} autoPlay loop muted playsInline>
                <source
                    src={require("/public/video/ai-driven.webm")}
                    type="video/webm"
                />
                {t('aiDriven.videoError')}
            </video>
            <div className={styles.textWrapper}>
                <h3 className={styles.title}><span>{t('aiDriven.title_span')}</span> {t('aiDriven.title')}</h3>
                <p className={styles.desc}>
                    {t('aiDriven.description')}
                </p>
            </div>
        </section>
    );
};

export default AIDriven;
