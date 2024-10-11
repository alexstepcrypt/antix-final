"use client"
import Image from "next/image";
import styles from "./Header.module.scss";
import { links } from "./mocdata";
import UserIcon from "@/public/svg/user-icon.svg";

import LogoFull from "@/public/svg/logo-full.svg"

const Header = () => {
    const handleClick = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        if(id.includes("https:")) {
            window.open(id, '_blank')
        }
    };

    return (
        <header className={styles.wrapper}>
            <div className={styles.logo}>
                <Image src={LogoFull} alt="Logo" />
            </div>
            <div className={styles.linksContainer}>
                {links.map((link) => (
                    <button
                        className={styles.link}
                        key={link.title}
                        onClick={() => handleClick(link.href)}
                    >
                        {link.title}
                    </button>
                ))}
            </div>
            <div className={styles.connectContainer}>
                <button className={styles.connectButton}>Connect Wallet</button>
                <button className={styles.userButton}>
                    <Image src={UserIcon} alt="User" />
                </button>
            </div>
        </header>
    );
};

export default Header;
