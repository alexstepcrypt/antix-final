import React from "react";
import styles from "./RaisedProgressBar.module.scss";

interface ProgressBarProps {
    currentAmount: number;
    targetAmount: number;
    title: string
}

const RaisedProgressBar: React.FC<ProgressBarProps> = ({
    currentAmount,
    targetAmount,
    title
}) => {
    const percentage = Math.min((currentAmount / targetAmount) * 100, 100);

    return (
        <div className={styles.progressBarContainer}>
            <div>
                <span className={styles.title}>{title}</span>{" "}
                {targetAmount === 0 ? <span>Calculating</span> : (
                    <p className={styles.amounts}>
                        {currentAmount.toLocaleString('en-US')} / {' '}
                        <span>{targetAmount.toLocaleString('en-US')}</span>
                    </p>
                )}
            </div>
            <div className={styles.bar}>
                <div className={styles.barWrapper}>
                    <div
                        style={{ width: `${targetAmount === 0 ? '0px' : `${percentage}%`}` }}
                        className={styles.percentage}
                    />
                </div>
            </div>
        </div>
    );
};

export default RaisedProgressBar;
