import React from "react";
import styles from "./Amazon.module.scss";
import Img from "/public/images/amazon.png";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const Amazon = () => {
    const { t } = useTranslation('landing');
    return (
        <section className={styles.container}>
            <div className={styles.imgContainer}>
                <Image src={Img} alt={"Amazon"} />
            </div>
            <div className={styles.mobileBg} />
            <div className={styles.textWrapper}>
                <h3 className={styles.title}>
                    {t('amazonSection.title')}
                    <span>{t('amazonSection.highlightedText')}</span>
                </h3>
                <p className={styles.desc}>{t('amazonSection.description')}</p>
            </div>
        </section>
    );
};

export default Amazon;
