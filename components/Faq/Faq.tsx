"use client"

import React, { useState } from "react";
import styles from "./Faq.module.scss";
import { FaqAccordion } from "@/DashboardStages/Stage1/DashboardTop/FaqAccordion/FaqAccordion";
import { usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'

// interface IFaqItem {
//     id: number;
//     title: string;
//     content: string;
// }

interface IFaq {
    faqItems: {
        title: string;
        content: string;
    }[];
}

const Faq: React.FC<IFaq> = ({ faqItems }) => {
    const [openedId, setOpenedId] = useState<number | null>(null);
    const pathname = usePathname();
    const { t } = useTranslation('dashboard');

    return (
        <div className={styles.faq}>
            <h5 className={styles.faqTitle}>
                {pathname !== '/dashboard/referral' ? 'FAQ' : t('referral.faqTitle')}
            </h5>

            <div className={styles.faqItems}>
                {faqItems.map((item, i) => (
                    <FaqAccordion
                        key={i}
                        openedId={openedId}
                        setOpenedId={setOpenedId}
                        {...item}
                        id={i}
                    />
                ))}
            </div>
        </div>
    );
};

export default Faq;
