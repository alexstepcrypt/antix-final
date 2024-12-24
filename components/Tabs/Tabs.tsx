import React, { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import styles from "./Tabs.module.scss";

import StarIcon from "/public/svg/team-star.svg";
import LinkedInIcon from "/public/svg/linkedin-button.svg";
import HiddenBtn from "/public/svg/mobile-hidden-tn.svg";

import ModalBg from "/public/images/advisors/card-bg.png";
import XMark from "/public/svg/xmark.svg";
import { useTranslation } from "react-i18next";
import { teamItemType, teamItemsProps } from "@/sections/Team/components/TeamCarousel/mocdata";


export const Tabs: React.FC<teamItemsProps> = ({ data }) => {
    const [activeTab, setActiveTab] = useState<teamItemType | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const { t } = useTranslation('landing');

    const adjustHeight = () => {
        const content = contentRef.current;
        if (content) {
            if (isOpen) {
                content.style.height = "0px";
                const scrollHeight = content.scrollHeight;
                content.style.height = `${scrollHeight}px`;
                content.style.transition = 'height 1s ease';
            } else {
                content.style.height = `${content.scrollHeight}px`;
                content.style.height = "0px";
                content.style.transition = 'height 1s ease';
            }
        }
    };

    useEffect(() => {
        adjustHeight();
    }, [isOpen, data]);

    const handleClick = (item: teamItemType | null) => {
        setActiveTab(item);
    };

    return (
        <>
            {activeTab && (
                <div className={styles.modal}>
                    <div
                        className={styles.modalBg}
                        onClick={() => handleClick(null)}
                    />
                    <div
                        className={styles.modalContainer}
                        style={{ backgroundImage: `url(${ModalBg.src})` }}
                    >
                        <button
                            className={styles.modalClose}
                            onClick={() => handleClick(null)}
                        >
                            <Image
                                src={XMark}
                                alt="Close"
                                width={24}
                                height={24}
                            />
                        </button>
                        <div className={styles.modalName}>
                            <Image
                                src={activeTab.image}
                                alt={activeTab.name}
                                width={60}
                                height={60}
                                className={styles.leftImg}
                            />
                            <p>{activeTab.name}</p>
                        </div>

                        <div className={styles.modalList}>
                            {activeTab.description.map((desc, index) => (
                                <p key={index}>
                                    <span /> {desc}
                                </p>
                            ))}
                        </div>

                        <a
                            href={activeTab.socialLink}
                            target="_blank"
                            className={styles.modalLinkIcon}
                        >
                            <Image
                                src={LinkedInIcon}
                                alt="LinkedIn"
                                width={50}
                                height={50}
                                className={styles.linkedInIcon}
                            />
                        </a>
                    </div>
                </div>
            )}
            <div className={styles.wrapper}>
                <div
                    className={styles.content}
                    ref={contentRef}
                >
                    {data.map((item) => (
                        <div
                            key={item.name}
                            className={styles.tabItem}
                            onClick={() => handleClick(item)}
                        >
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={70}
                                height={70}
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
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => setIsOpen((prev) => !prev)}
                    className={styles.hiddenBtn}
                >
                    {isOpen ? <p>{t('team.mobile.button_show-less')}</p> : <p>{t('team.mobile.button_show-all')}</p>}
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
