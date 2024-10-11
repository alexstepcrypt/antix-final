"use client";

import React from "react";
import styles from "./JoinUs.module.scss";
import JoinUsCard from "@/components/JoinUsCard/JoinUsCard";

const JoinUs = () => {
    return (
        <section className={styles.container} id="JoinUs">
            <video className={styles.backgroundVideo} autoPlay loop muted>
                <source
                    src={require("@/public/video/join-us-video.webm")}
                    type="video/webm"
                />
                Ваш браузер не поддерживает видео.
            </video>
            <div className={styles.content}>
                <h4 className={styles.title}>Join Us on Our Journey</h4>
                <div className={styles.cardsContainer}>
                    <JoinUsCard
                        platform="x"
                        link="https://x.com/antix_in"
                        handle="@antix"
                        followers={44}
                    />
                    <JoinUsCard
                        platform="discord"
                        link="https://discord.com/invite/bKcMXChRRT"
                        handle="@antix"
                        followers={12}
                    />
                    <JoinUsCard
                        platform="telegram"
                        link="https://t.me/antix_in"
                        handle="@antix"
                        followers={75}
                    />
                </div>
            </div>
        </section>
    );
};

export default JoinUs;
