"use client";

import Image from "next/image";
import styles from "./Header.module.scss";
import { links, linksDashboard, mobileLinks, mobileLinksDashboard } from "./mocdata";
import UserIcon from "/public/svg/user-icon.svg";

import LogoFull from "/public/svg/logo-full.svg";
import LogoSmall from "/public/svg/logo-small.svg";
import { BurgerButton } from "../AntixToken/components/BurgerButton/BurgerButton";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";


import WalletIcon from "/public/svg/wallet-icon.svg";

import Link from "next/link";

interface HeaderProps {
    isDashboard?: boolean;
    disconnectClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({isDashboard, disconnectClick}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const headerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (headerRef.current) {
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    gsap.to(headerRef.current, { y: -200, duration: 0.1 });
                } else if (currentScrollY < lastScrollY) {
                    gsap.to(headerRef.current, { y: 0, duration: 0.1 });
                }
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    const handleClick = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        if (id.includes("https:")) {
            window.open(id, "_blank");
        }
        if (id === "/") {
            window.open(id, "_parent");
        }
        setIsOpen(false);
    };

    const linksList = isDashboard ? linksDashboard : links
    const mobileLinksList = isDashboard ? mobileLinksDashboard : mobileLinks

    return (
        <>
            <div
                className={`${styles.mobile} ${
                    isOpen ? styles.activeMobile : ""
                }`}
            >
                <div
                    className={`${styles.mobileMenuBg} ${
                        isOpen ? styles.activeMobileMenuBg : ""
                    }`}
                ></div>
                <div
                    className={`${styles.mobileMenu} ${
                        isOpen ? styles.activeMobileMenu : ""
                    }`}
                >
                    {mobileLinksList.map((link) => (
                        <button
                            onClick={() => handleClick(link.href)}
                            key={link.label}
                            className={styles.mobileLink}
                            style={{justifyContent: link.icon ? "" : "center"}}
                        >
                            {link.icon && (
                                <div className={styles.mobileLinkImg}>
                                    <Image
                                        src={link.icon}
                                        alt={link.label}
                                        width={24}
                                        height={24}
                                    />
                                </div>
                            )}
                            {link.label}
                        </button>
                    ))}
                </div>
            </div>
            <header
                className={`${styles.wrapper} ${
                    isOpen ? styles.openWrapper : ""
                }`}
                ref={headerRef}
            >
                <div className={styles.logo}>
                    <Image
                        src={LogoFull}
                        alt="Logo"
                        className={`${styles.logoFull} ${
                            isOpen ? styles.openLogoFull : ""
                        }`}
                    />
                    {isDashboard && (
                        <Link href={"/"} className={styles.backToMainButton}>
                            Back to the Main Page
                        </Link>
                    )}
                    <Image
                        src={LogoSmall}
                        alt="Logo"
                        className={`${styles.logoSmall} ${
                            isOpen ? styles.openLogoSmall : ""
                        }`}
                    />
                </div>
                <div className={styles.linksContainer}>
                    {linksList.map((link) => (
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
                    {isDashboard ? (
                        <button className={styles.walletButton} onClick={disconnectClick}>
                            <Image src={WalletIcon} alt="User" />
                            0xae89B…..87D
                        </button>
                    ) : (
                        <>
                            <Link
                                href={"/dashboard"}
                                className={styles.connectButton}
                            >
                                Connect Wallet
                            </Link>
                            <button className={styles.userButton}>
                                <Image src={UserIcon} alt="User" />
                            </button>
                        </>
                    )}
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
