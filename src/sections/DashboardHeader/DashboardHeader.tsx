"use client";

import Image from "next/image";
import styles from "./DashboardHeader.module.scss";
import { linksAfter } from "./mocdata";
import WalletIcon from "@/public/svg/wallet-icon.svg";

import LogoFull from "@/public/svg/logo-full.svg";
import { useState } from "react";

import { BurgerButton } from "./BurgerButton/BurgerButton";
import Link from "next/link";

const DashboardHeader = () => {
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
            <header
                className={`${styles.wrapper} ${
                    isOpen ? styles.openWrapper : ""
                }`}
            >
                <div className={styles.logoWrapper}>
                    <Image
                        src={LogoFull}
                        alt="Logo"
                        className={`${styles.logoFull} ${
                            isOpen ? styles.openLogoFull : ""
                        }`}
                    />
                    <Link href={"/"} className={styles.backToMainButton}>
                        Back to the Main Page
                    </Link>
                </div>
                <div className={styles.linksContainer}>
                    {linksAfter.map((link) => (
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
                    <button className={styles.walletButton}>
                        <Image src={WalletIcon} alt="User" />
                        Connect Wallet
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

export default DashboardHeader;
