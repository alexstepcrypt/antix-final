"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Quote.module.scss";
import Dots from "/public/svg/quote-dots.svg";
import Bg from "/public/images/quote/quote-bg.png";

import Avatar1 from "/public/images/quote/quote-1.png";
import Avatar2 from "/public/images/quote/quote-2.png";
import Avatar3 from "/public/images/quote/quote-3.png";
import Avatar4 from "/public/images/quote/quote-4.png";
import { useTranslation } from "react-i18next";

const authors = [
    {
        user: "@lilmiquela",
        avatar: Avatar1,
    },
    {
        user: "@magazineluiza",
        avatar: Avatar2,
    },
    {
        user: "K/DA pop-group",
        avatar: Avatar3,
    },
    {
        user: "FN Meka - rapper",
        avatar: Avatar4,
    },
];

const Quote = () => {
    const [currentAuthorIndex, setCurrentAuthorIndex] = useState(0);
    const [fadeIn, setFadeIn] = useState(true);
    const { t } = useTranslation('landing');

    useEffect(() => {
        const intervalId = setInterval(() => {
            setFadeIn(false);

            setTimeout(() => {
                setCurrentAuthorIndex(
                    (prevIndex) => (prevIndex + 1) % authors.length
                );
                setFadeIn(true);
            }, 500);
        }, 4000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div
            className={styles.container}
            style={{ backgroundImage: `url(${Bg.src})` }}
        >
            <div className={styles.content}>
                <div className={styles.quote}>
                    <Image src={Dots} alt="" />
                    <div>
                        <p className={styles.quoteText}>
                            {t('quote.text')}
                        </p>
                        <span className={styles.quoteAuthor}>{t('quote.author')}</span>
                    </div>
                </div>
                <div
                    className={`${styles.quoteImage} ${
                        fadeIn ? styles.fadeIn : styles.fadeOut
                    }`}
                >
                    <Image
                        src={authors[currentAuthorIndex].avatar}
                        alt={authors[currentAuthorIndex].user}
                        width={400}
                        height={400}
                    />
                    <span>{authors[currentAuthorIndex].user}</span>
                </div>
            </div>
        </div>
    );
};

export default Quote;
