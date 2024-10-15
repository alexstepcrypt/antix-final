import React, { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./Tabs.module.scss";

import StarIcon from "@/public/svg/team-star.svg";
import LinkedInIcon from "@/public/svg/linkedin-button.svg";
import HiddenBtn from "@/public/svg/mobile-hidden-tn.svg";

interface TabsProps {
    data: {
        role: string;
        name: string;
        socialLink: string;
        image: StaticImageData;
        description: string[];
    }[];
}

export const Tabs: React.FC<TabsProps> = ({ data }) => {
    const [activeTab, setActiveTab] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const adjustHeight = () => {
        const content = contentRef.current;
        if (content) {
            if (isOpen) {
                content.style.height = "auto";
                const scrollHeight = content.scrollHeight;
                content.style.height = `${scrollHeight}px`;
            } else {
                content.style.height = "0px";
            }
        }
    };

    useEffect(() => {
        adjustHeight();
    }, [isOpen, data]);

    return (

        <>
        <div className={styles.wrapper}>
            <div
                className={`${styles.content} ${
                    isOpen ? styles.openContent : ""
                }`}
                ref={contentRef}
            >
                {data.map((item) => (
                    <button key={item.name} className={styles.tabItem}>
                        <Image
                            src={item.image}
                            alt={item.name}
                            className={styles.leftImg}
                        />
                        <div className={styles.tabInfo}>
                            <h5>{item.role}</h5>
                            <Image
                                src={StarIcon}
                                alt="Star"
                                width={30}
                                height={30}
                                className={styles.starImg}
                            />
                            <p>{item.name}</p>
                        </div>

                        <a
                            href={item.socialLink}
                            target="_blank"
                            className={styles.linkIcon}
                        >
                            <Image
                                src={LinkedInIcon}
                                alt="LinkedIn"
                                width={50}
                                height={50}
                                className={styles.linkedInIcon}
                            />
                        </a>
                    </button>
                ))}
            </div>
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className={styles.hiddenBtn}
            >
                {isOpen ? <p>Show Less</p> : <p>Show All</p>}
                <Image
                    src={HiddenBtn}
                    alt=""
                    className={`${styles.hiddenBtnImg} ${
                        !isOpen ? styles.openHiddenBtnImg : ""
                    }`}
                />
            </button>
        </div>
        </>
    );
};
