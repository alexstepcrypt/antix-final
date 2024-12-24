"use client";

import { useState } from "react";

import TeamComponent from "../../../../components/TeamComponent/TeamComponent";
import { teamItemType } from "./mocdata";
import s from "./TeamCarousel.module.scss";
import { useTranslation } from "react-i18next";


export const TeamCarousel = () => {
    const [isActive, setIsActive] = useState(false);
    const { t } = useTranslation('landing');

    const commandList = t('team.list', { returnObjects: true }) as teamItemType[];

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
                {t('team.show_all')}
            </button>
        </div>
    );
};
