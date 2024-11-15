"use client"

import React, { useState } from "react";
import styles from "./Faq.module.scss";
import { FaqAccordion } from "@/DashboardStages/Stage1/DashboardTop/FaqAccordion/FaqAccordion";

interface IFaqItem {
    id: number;
    title: string;
    content: string;
}

interface IFaq {
    faqItems: IFaqItem[];
}

const Faq: React.FC<IFaq> = ({ faqItems }) => {
    const [openedId, setOpenedId] = useState<number | null>(null);

    return (
        <div className={styles.faq}>
            <h5 className={styles.faqTitle}>FAQ</h5>

            <div className={styles.faqItems}>
                {faqItems.map((item, i) => (
                    <FaqAccordion
                        key={i}
                        openedId={openedId}
                        setOpenedId={setOpenedId}
                        {...item}
                    />
                ))}
            </div>
        </div>
    );
};

export default Faq;
