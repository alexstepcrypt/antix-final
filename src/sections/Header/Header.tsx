"use client";

import Image from "next/image";
import styles from "./Header.module.scss";
import { links } from "./mocdata";
import UserIcon from "@/public/svg/user-icon.svg";

import LogoFull from "@/public/svg/logo-full.svg";
import LogoSmall from "@/public/svg/logo-small.svg";
import { BurgerButton } from "../AntixToken/components/BurgerButton/BurgerButton";
import { useState } from "react";

import TokenIcon from "@/public/svg/mobile-menu/token.svg";
import WhitepaperIcon from "@/public/svg/mobile-menu/whitepaper.svg";
import BuyNowIcon from "@/public/svg/mobile-menu/buy-now.svg";
import MyAccountIcon from "@/public/svg/mobile-menu/my-account.svg";

const mobileLinks = [
    {
        label: "Token",
        href: "Token",
        icon: TokenIcon,
    },
    {
        label: "Whitepaper",
        href: "https://antix.io/whitepaper",
        icon: WhitepaperIcon,
    },
    {
        label: "Buy Now",
        href: "#",
        icon: BuyNowIcon,
    },
    {
        label: "My Account",
        href: "#",
        icon: MyAccountIcon,
    },
];

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        if (id.includes("https:")) {
            window.open(id, "_blank");
        }
        setIsOpen(false);
    };

    return (
        <>
            <div
                className={`${styles.mobileMenuBg} ${
                    isOpen ? styles.activeMobileMenuBg : ""
                }`}
            >
                <div
                    className={`${styles.mobileMenu} ${
                        isOpen ? styles.activeMobileMenu : ""
                    }`}
                >
                    {mobileLinks.map((link) => (
                        <button
                            onClick={() => handleClick(link.href)}
                            key={link.label}
                            className={styles.mobileLink}
                        >
                            <div className={styles.mobileLinkImg}>
                                <Image
                                    src={link.icon}
                                    alt={link.label}
                                    width={24}
                                    height={24}
                                />
                            </div>
                            {link.label}
                        </button>
                    ))}
                </div>
            </div>
            <header
                className={`${styles.wrapper} ${
                    isOpen ? styles.openWrapper : ""
                }`}
            >
                <div className={styles.logo}>
                    <Image
                        src={LogoFull}
                        alt="Logo"
                        className={`${styles.logoFull} ${
                            isOpen ? styles.openLogoFull : ""
                        }`}
                    />
                    <Image
                        src={LogoSmall}
                        alt="Logo"
                        className={`${styles.logoSmall} ${
                            isOpen ? styles.openLogoSmall : ""
                        }`}
                    />
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
                    <button className={styles.connectButton}>
                        Connect Wallet
                    </button>
                    <button className={styles.userButton}>
                        <Image src={UserIcon} alt="User" />
                    </button>
                    <div className={styles.mobileButton}>
                        <BurgerButton
                            isOpen={isOpen}
                            onClick={() => setIsOpen((oldState) => !oldState)}
                        />
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
