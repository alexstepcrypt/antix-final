"use client";

import React from "react";
import { scrollToId } from '@/utils/scrollToId';
import styles from "./ExclusiveOffer.module.scss";

const ExclusiveOffer = () => {
    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <div className={styles.left}>
                    <h3 className={styles.title}>Exclusive Offer: Act Now</h3>
                    <p className={styles.desc}>
                        Make a deposit to secure your spot in stage 1 pre-sale
                        and benefit from 70% discount
                    </p>
                </div>
                <button
                    onClick={() => scrollToId("Hero")}
                    className={styles.button}
                >
                    Join Now
                </button>
            </div>
        </section>
    );
};

export default ExclusiveOffer;
