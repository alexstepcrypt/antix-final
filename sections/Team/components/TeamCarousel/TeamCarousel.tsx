"use client";

import { useState } from "react";

import TeamComponent from "../../../../components/TeamComponent/TeamComponent";
import { commandList } from "./mocdata";
import s from "./TeamCarousel.module.scss";

export const TeamCarousel = () => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className={s.container}>
            <div className={`${s.content} ${isActive ? s.activeContent : ""}`}>
                {commandList.map((employee, i) => (
                    <TeamComponent key={i} {...employee} />
                ))}
            </div>
            <button
                onClick={() => setIsActive(true)}
                className={`${s.btn} ${isActive ? s.activeBtn : ""}`}
            >
                + Show All
            </button>
        </div>
    );
};
