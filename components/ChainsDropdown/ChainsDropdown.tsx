"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./ChainsDropdown.module.scss";
import ArrowIcon from "@/public/svg/top-arrow.svg";
import Image from "next/image";

interface Network {
    label: string;
    value: string;
    icon: string;
}

const networks: Network[] = [
    {
        label: "Ethereum",
        value: "ETH",
        icon: "/svg/ether-icon.svg",
    },
    {
        label: "BNB Smart Chain",
        value: "BSC",
        icon: "/svg/bnb-icon.svg",
    },
];

const ChainsDropdown: React.FC = () => {
    const [selected, setSelected] = useState<Network>(networks[0]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const selectNetwork = (network: Network) => {
        setSelected(network);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.dropdown} ref={dropdownRef}>
            <button onClick={toggleDropdown} className={styles.dropdownButton}>
                <Image
                    src={selected.icon}
                    alt={selected.label}
                    width={24}
                    height={24}
                />
                <span>{selected.value}</span>
                <span
                    className={`${styles.arrow} ${isOpen ? "" : styles.close}`}
                >
                    <Image src={ArrowIcon} alt="Arrow" width={12} height={6} />
                </span>
            </button>

            {isOpen && (
                <div className={styles.dropdownMenu}>
                    {networks.map((network) => (
                        <button
                            key={network.value}
                            onClick={() => selectNetwork(network)}
                            className={`${styles.dropdownItem} ${
                                selected.value === network.value
                                    ? styles.dropdownItemActive
                                    : ""
                            }`}
                            disabled={network.value === "BSC"}
                        >
                            <Image
                                src={network.icon}
                                alt={network.label}
                                width={24}
                                height={24}
                            />
                            <span>{network.label}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ChainsDropdown;
