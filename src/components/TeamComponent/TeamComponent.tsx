"use client";

import React from "react";
import styles from "./TeamComponent.module.scss";
import Image, { StaticImageData } from "next/image";
import StarIcon from "@/public/svg/team-star.svg";
import LinkedInIcon from "@/public/svg/linkedin-button.svg";
import HoverImage from "@/public/images/advisors/card-bg.png";

interface TeamComponentProps {
    role: string;
    name: string;
    socialLink: string;
    image: StaticImageData;
    description: string[];
}

const TeamComponent: React.FC<TeamComponentProps> = ({
    role,
    name,
    socialLink,
    image,
    description,
}) => {
    return (
        <div className={styles.container}>
            <div
                className={styles.content}
                style={{ backgroundImage: `url(${image.src})` }}
            >
                <span className={styles.role}>{role}</span>
                <div className={styles.bottom}>
                    <Image src={StarIcon} alt="" width={30} height={30} />
                    <h5 className={styles.name}>{name}</h5>
                </div>
                <a
                    className={styles.socialButton}
                    href={socialLink}
                    target="_blank"
                >
                    <Image
                        src={LinkedInIcon}
                        alt={"Linked In"}
                        width={33}
                        height={33}
                    />
                </a>
            </div>

            <div
                className={styles.hoverContent}
                style={{ backgroundImage: `url(${HoverImage.src})` }}
            >
                <div className={styles.top}>
                    <Image src={image} alt="" width={70} height={70} />
                    <h5 className={styles.name}>{name}</h5>
                </div>
                <div className={styles.description}>
                    {description.map((desc, index) => (
                        <p key={index}><span /> {desc}</p>
                    ))}
                </div>
                <a
                    className={styles.socialButton}
                    href={socialLink}
                    target="_blank"
                >
                    <Image
                        src={LinkedInIcon}
                        alt={"Linked In"}
                        width={33}
                        height={33}
                    />
                </a>
            </div>
        </div>
    );
};

export default TeamComponent;
