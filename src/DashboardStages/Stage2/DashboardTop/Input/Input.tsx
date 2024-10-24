import React, { useState } from "react";
import styles from "./Input.module.scss";
import Image from "next/image";

interface InputProps {
    value: string;
    onChangeValue: (value: string) => void;
    title: string;
    icon: string;
    price?: string;
}

const Input: React.FC<InputProps> = ({
    value,
    onChangeValue,
    title,
    icon,
    price,
}) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
    
        // Разрешаем только цифры, запятые и точки
        let cleanedValue = value.replace(/[^0-9.,]/g, "");
    
        // Заменяем запятые на точки
        cleanedValue = cleanedValue.replace(",", ".");
    
        // Разрешаем только одну точку в числе
        const parts = cleanedValue.split(".");
        if (parts.length > 2) {
            cleanedValue = parts[0] + "." + parts[1]; // Сохраняем только первую точку
        }
    
        onChangeValue(cleanedValue === "" ? "0" : cleanedValue);
    };

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <span className={styles.title}>{title}</span>

                {price ? (
                    <div className={styles.price}>1 ANTIX = {price}</div>
                ) : (
                    <button className={styles.balanceBtn}>Max</button>
                )}
            </div>
            <div className={styles.bottom}>
                <input
                    type="text"
                    className={styles.input}
                    value={value}
                    onChange={handleInputChange}
                />
                <Image src={icon} alt="" width={24} height={24} />
            </div>
        </div>
    );
};

export default Input;
