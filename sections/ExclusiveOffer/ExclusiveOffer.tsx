"use client";

import React from "react";
import { scrollToId } from '../../utils/scrollToId';
import styles from "./ExclusiveOffer.module.scss";
import { useTranslation } from "react-i18next";

const ExclusiveOffer = () => {
    const { t } = useTranslation('landing');

    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <div className={styles.left}>
                    <h3 className={styles.title}>{t('exclusiveOffer.title')}</h3>
                    <p className={styles.desc}>
                        {t('exclusiveOffer.desc')}
                    </p>
                </div>
                <button
                    onClick={() => scrollToId("Hero")}
                    className={styles.button}
                >
                    {t('exclusiveOffer.btn')}
                </button>
            </div>
        </section>
    );
};

export default ExclusiveOffer;
