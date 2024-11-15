"use client";

import { useState } from "react";
import styles from "./ReplacingHumans.module.scss";

import HeadImg from "/public/images/replacing-humans-bg-avatar.png";
import BgImg from "/public/images/replacing-humans-bg.png";
import Accordion from "../../components/Accordion/Accordion";
import FadeIn from "../../components/FadeIn/FadeIn";
import Image from "next/image";

const leftList = [
    {
        title: "Advertisement",
        text: "Personalized and dynamic ad campaigns, where brands interact with customers in innovative ways",
    },
    {
        title: "Fashion and modeling",
        text: "AI-driven avatars will transform fashion with customizable, always-available digital models. No more costly shoots or limits—adapt to any style instantly, making fashion faster and more innovative than ever.",
    },
    {
        title: "E-commerce",
        text: "Virtual sales assistants and online fitting rooms",
    },
    {
        title: "Customer Support",
        text: "Enhance customer service with AI-powered digital avatars that provide 24/7 assistance, improving response times and customer satisfaction.",
    },
];

const rightList = [
    {
        title: "Movie Production",
        text: "No more need for actors and shoot days. Customize your characters down to the minute details",
    },
    {
        title: "Social media",
        text: "Boost engagement with automated digital influencers that connect 24/7—proven more effective, popular, and reliable than real influencers*",
    },
    {
        title: "Education",
        text: "Interactive digital teachers and educational programs. Employee training and development"
    }
];

const ReplacingHumans = () => {
    const [isOpen, setIsOpen] = useState("");
    return (
        <section
            className={styles.container}
            style={{ backgroundImage: `url(${BgImg.src})` }}
        >
            <div className={styles.content}>
                <div className={styles.mobileBg} />
                <FadeIn direction="up" distance={"100%"}>
                    <h3 className={styles.title}>
                        Antix avatars are replacing humans in
                    </h3>
                </FadeIn>
                <div className={styles.wrapper}>
                    <div className={styles.list}>
                        {leftList.map((item) => (
                            <Accordion
                                key={item.title}
                                item={item}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                            />
                        ))}
                    </div>
                    <div className={styles.list}>
                        {rightList.map((item) => (
                            <Accordion
                                key={item.title}
                                item={item}
                                isOpen={isOpen}
                                setIsOpen={setIsOpen}
                            />
                        ))}
                    </div>
                </div>
                <Image src={HeadImg} alt="" className={styles.headImg} />

                <span className={styles.bottomLink}>
                    *Source: Harvard Business Review (2024)
                </span>
            </div>
        </section>
    );
};

export default ReplacingHumans;
