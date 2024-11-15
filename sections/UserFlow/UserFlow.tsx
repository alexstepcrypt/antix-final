import React from "react";
import styles from "./UserFlow.module.scss";
import Image from "next/image";

import UserFlowImage from "/public/svg/user-flow.svg";
import UserFlowImageMobile from "/public/svg/user-flow-mobile.svg";
import Legend from "/public/images/user-flow-legend.png";
import HandIcon from "/public/svg/swap-icon.svg";

const UserFlow = () => {
    return (
        <div className={styles.userFlowContainer}>
            <div className={styles.userFlowLegend}>
                <Image src={Legend} alt="Legend" />
                <Image src={HandIcon} alt="Handle Icon" />
            </div>

            <Image
                src={UserFlowImage}
                alt="User Flow"
                width={1130}
                height={540}
                draggable={false}
                className={styles.UserFlow}
            />
            <div className={styles.UserFlowMobile}>
                <Image
                    src={UserFlowImageMobile}
                    alt="User Flow"
                    width={620}
                    height={693}
                    draggable={false}
                />
            </div>
        </div>
    );
};

export default UserFlow;
