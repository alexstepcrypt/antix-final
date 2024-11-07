import React from "react";
import styles from "./CurrencyButton.module.scss";
import Image from "next/image";

interface ICurrencyButton {
    displayCurrency: string;
    icon: string;
    onclick?: () => void;
}

const CurrencyButton: React.FC<ICurrencyButton> = ({
    displayCurrency,
    icon,
    onclick,
}) => {
    return (
        <button className={styles.sendingChooseCurr} onClick={onclick}>
            <Image src={icon} alt={displayCurrency} width={24} height={24} />
            <span>{displayCurrency}</span>
        </button>
    );
};

export default CurrencyButton;
