"use client";

import React from "react";
import { scrollToId } from '@/utils/scrollToId';
import styles from "./ExclusiveOffer.module.scss";

const ExclusiveOffer = () => {
    return (
        <section className={styles.container}>
            <div className={styles.content}>
                <div className={styles.left}>
                    <h3 className={styles.title}>Join Stage 1</h3>
                    <p className={styles.desc}>
                        Make deposit to secure the best price
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
