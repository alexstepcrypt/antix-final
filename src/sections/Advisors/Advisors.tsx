import React from "react";
import styles from "./Advisors.module.scss";
import TeamComponent from "@/components/TeamComponent/TeamComponent";

import Img1 from "@/public/images/advisors/1.png";
import Img2 from "@/public/images/advisors/2.png";
import Img3 from "@/public/images/advisors/3.png";
import Img4 from "@/public/images/advisors/4.png";

const advisorsList = [
    {
        role: "AI Innovator",
        name: "Marcello Mari ",
        socialLink: "https://www.linkedin.com/in/marcellomari/",
        image: Img1,
        description: [
            "Co-founder and CEO of SingularityDAO, pioneering AI in decentralized finance, and a two-time TEDx speaker with deep expertise in DeFi and blockchain.",
            "Marcello played a key role in founding SingularityNET and worked closely with Sophia the Robot, regularly speaking at international events.",
        ],
    },
    {
        role: "Entrepreneur, Investor",
        name: "Juwan Lee",
        socialLink: "https://www.linkedin.com/in/juwanlee/",
        image: Img2,
        description: [
            "A seasoned entrepreneur and investor with 30+ years in the investment industry, Founder and Chairman of NexChange Group, specializing in blockchain, fintech, AI, and smart cities.",
            "Lee organized blockchain events, held roles at JP Morgan and SAC Capital, and is Honorary Chairman for the US Commerce Department's Blockchain Trade Mission.",
        ],
    },
    {
        role: "Startup Builder, Web3 Expert",
        name: "Marta Zarosa",
        socialLink: "https://www.linkedin.com/in/marta-zarosa/",
        image: Img3,
        description: [
            "A passionate entrepreneur with a proven track record of building startups like IndaHash and Skey Network, and facilitating the launch of numerous Web3 ventures.",
            "As a Business Associate at Bering Waters Ventures, specialize in fundraising, sales, and marketing, and lead DAO Maker KOL management, supporting 30+ successful launches.",
        ],
    },
    {
        role: "Blockchain Leader, Venture Founder",
        name: "Alexander Filatov",
        socialLink: "https://mt.linkedin.com/in/alexander-filatov-bb64781",
        image: Img4,
        description: [
            "Co-Founder and CEO of EverX, the core developer of the Everscale Network, with 25 years of experience, including executive roles at RM, RM-Terex, and Chelpipe.",
            "After leaving the corporate world in 2015, he co-founded Industry 4.0., a venture fund for emerging technologies, and led YPO's Russia chapter in 2019/20.",
        ],
    },
];

const Advisors = () => {
    return (
        <section className={styles.container} id="Advisors">
            <h3 className={styles.title}>Advisors</h3>
            <p className={styles.desc}>
                The Antix advisory team brings{" "}
                <span>80 years of combined experience </span>
                in successful investing, offering deep business expertise and
                exceptional knowledge of the Web3 sector.
            </p>
            <div className={styles.advisorsWrapper}>
                {advisorsList.map((advisor) => (
                    <TeamComponent key={advisor.name} {...advisor} />
                ))}
            </div>
        </section>
    );
};

export default Advisors;
