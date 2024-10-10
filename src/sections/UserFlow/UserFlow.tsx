import React from "react";
import styles from "./UserFlow.module.scss";
import UserFlowImage from "@/public/svg/user-flow.svg";
import Image from "next/image";

const UserFlow = () => {
    return (
        <div className={styles.userFlowContainer}>
            <Image
                src={UserFlowImage}
                alt="User Flow"
                width={1130}
                height={540}
                draggable={false}
            />
        </div>
    );
};

export default UserFlow;
