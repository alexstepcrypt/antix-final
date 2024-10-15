"use client";

import React from "react";
import styles from "./AIDriven.module.scss";

const AIDriven = () => {
    return (
        <section className={styles.container}>
            <video className={styles.backgroundVideo} autoPlay loop muted playsInline>
                <source
                    src={require("@/public/video/ai-driven.webm")}
                    type="video/webm"
                />
                Ваш браузер не поддерживает видео.
            </video>
            <div className={styles.textWrapper}>
                <h3 className={styles.title}><span>AI-Driven</span> Realism</h3>
                <p className={styles.desc}>
                    We combine 3d-modeling with AI to achieve never-seen levels
                    of realism.
                </p>
            </div>
        </section>
    );
};

export default AIDriven;
