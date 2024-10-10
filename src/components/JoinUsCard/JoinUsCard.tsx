import React from "react";
import styles from "./JoinUsCard.module.scss";
import Image from "next/image";

import Bg from "@/public/images/join-us-card-bg.png";
import XIcon from "@/public/svg/social-x.svg";
import TgIcon from "@/public/svg/social-telegram.svg";
import DiscordIcon from "@/public/svg/social-discord.svg";

interface JoinUsCardProps {
    platform: "x" | "discord" | "telegram";
    handle: string;
    followers: number;
    link: string;
}

const JoinUsCard: React.FC<JoinUsCardProps> = ({
    platform,
    handle,
    followers,
    link,
}) => {
    let icon;
    switch (platform) {
        case "x":
            icon = XIcon;
            break;
        case "telegram":
            icon = TgIcon;
            break;
        case "discord":
            icon = DiscordIcon;
            break;
    }

    return (
        <a
            href={link}
            target="_blank"
            className={styles.cardContainer}
            style={{ backgroundImage: `url(${Bg.src})` }}
        >
            <div className={styles.platform}>
                <div className={styles.Icon}>
                    <Image src={icon} alt={platform} />
                </div>
                <span>{handle}</span>
            </div>
            <div className={styles.followers}>
                Followers: <span>{followers}K</span>
            </div>
            <button className={styles.PlusBtn}>
                <span />
                <span />
            </button>
        </a>
    );
};

export default JoinUsCard;
