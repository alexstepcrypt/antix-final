"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.scss";
import gsap from "gsap";

import {
    links,
    linksDashboard,
    mobileLinks,
    mobileLinksDashboard,
} from "./mocdata";
import { formatAddress } from "@/utils/utils";
import { scrollToId } from "@/utils/scrollToId";
import useWalletStore from "@/stores/useWalletStore";

import { BurgerButton } from "../AntixToken/components/BurgerButton/BurgerButton";
import DisConnect from "@/components/ConnectModals/DisConnect/DisConnect";

import LogoFull from "/public/svg/logo-full.svg";
import LogoSmall from "/public/svg/logo-small.svg";
import UserIcon from "/public/svg/user-icon.svg";
import DisconnectIcon from "/public/svg/disconnect-icon.svg";
import WalletIcon from "/public/svg/wallet-icon.svg";
import ReferralAuth from "@/components/ReferralAuth/ReferralAuth";
import { FadeInNew } from "@/components/FadeInNew/FadeInNew";
import arrow from '/public/dashboard/svg/arrow-down.svg';

interface HeaderProps {
    isDashboard?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isDashboard }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isDisconnectModal, setIsDisconnectModal] = useState(false);
    const [openPopover, setOpenPopover] = useState(false);

    const headerRef = useRef<HTMLDivElement | null>(null);
    const { account  } = useWalletStore();

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
        scrollToId(id)
        setIsOpen(false);
    };

    const linksList = isDashboard ? linksDashboard : links;
    const mobileLinksList = isDashboard ? mobileLinksDashboard : mobileLinks;

    const pathName = usePathname()

    return (
        <>
            <ReferralAuth />
            {isDisconnectModal && account && <DisConnect setIsOpen={setIsDisconnectModal} />}
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
                            style={{
                                justifyContent: link.icon ? "" : "center",
                                background: link.href === pathName ? "#F0F0F033" : "#F0F0F00A"
                            }}
                            disabled={link.disabled}
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
                            {link.label.toLowerCase() === "claim" && <span>Claiming page will be available after the TGE</span>}
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
                    {isDashboard &&  (
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
                        <>
                            {openPopover && link.label.toLowerCase() === "claim" && (
                                <FadeInNew direction="up" distance={15}>
                                    <div className={styles.popover}>
                                        <Image
                                            width={26}
                                            height={26}
                                            src={arrow}
                                            loading="lazy"
                                            className={styles.popoverIcon}
                                            alt="popover-arrow"
                                        />
                                        <div className={styles.popoverContent}>
                                            <p>
                                                Claiming page will be available
                                                after the TGE
                                            </p>
                                        </div>
                                    </div>
                                </FadeInNew>
                            )}
                            <button
                                className={`${styles.link} ${link.href === pathName ? styles.linkActive : ""}`}
                                key={link.label}
                                onClick={() => {
                                    handleClick(link.href)
                                    setOpenPopover(true)
                                }}
                                onBlur={() => setOpenPopover(false)}
                                disabled={link.disabled}
                                >
                                {link.label}
                            </button>
                        </>
                    ))}
                </div>
                <div className={styles.connectContainer}>
                    {account ? (
                        <button
                            className={styles.walletButton}
                            onClick={() => setIsDisconnectModal(true)}
                        >
                            <Image src={WalletIcon} alt="User" />
                            {account ? formatAddress(account) : ""}
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={() => window.open("/dashboard", "_parent")}
                                className={styles.connectButton}
                            >
                                Connect Wallet
                            </button>
                        </>
                    )}
                    {!isDashboard && (
                        <button className={styles.userButton} onClick={() => window.open("/dashboard", "_parent")}>
                            <Image src={UserIcon} alt="User" />
                        </button>
                    )}
                    {account && (
                        <button className={styles.userButton} onClick={() => setIsDisconnectModal(true)}>
                            <Image src={DisconnectIcon} alt="Disconnect Wallet" width={24} height={24} />
                        </button>
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
