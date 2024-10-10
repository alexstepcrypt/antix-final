"use client";

import React from "react";
import styles from "./ExclusiveOffer.module.scss";

const ExclusiveOffer = () => {
    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };
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
                    onClick={() => scrollTo("hero")}
                    className={styles.button}
                >
                    Join Now
                </button>
            </div>
        </section>
    );
};

export default ExclusiveOffer;
