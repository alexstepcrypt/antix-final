"use client";

import { useState } from "react";

import TeamComponent from "../../../../components/TeamComponent/TeamComponent";
import { commandList, teamItemsProps } from "./mocdata";
import s from "./TeamCarousel.module.scss";
import { useTranslation } from "react-i18next";


export const TeamCarousel:React.FC<teamItemsProps> = ({data}) => {
    const [isActive, setIsActive] = useState(false);
    const { t } = useTranslation('landing');

    return (
        <div className={s.container}>
            <div className={`${s.content} ${isActive ? s.activeContent : ""}`}>
                {data.map((employee, i) => (
                    <TeamComponent key={i} {...employee} image={commandList[i].image} socialLink={commandList[i].socialLink} />
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
