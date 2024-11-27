// import type { Metadata } from 'next';

import styles from "./index.module.scss";
import Header from "@/sections/Header/Header";
import HeroSection from "@/sections/HeroSection/HeroSection";
import FeaturedIn from "@/sections/FeaturedIn/FeaturedIn";
import PlatformToReplace from "@/sections/PlatformToReplace/PlatformToReplace";
import MarketLeader from "@/sections/MarketLeader/MarketLeader";
import Why from "@/sections/Why/Why";
import Quote from "@/sections/Quote/Quote";
import NftPassport from "@/sections/NftPassport/NftPassport";
import Statistics from "@/sections/Statistics/Statistics";
import ReplacingHumans from "@/sections/ReplacingHumans/ReplacingHumans";
import Amazon from "@/sections/Amazon/Amazon";
import AntixFeatures from "@/sections/AntixFeatures/AntixFeatures";
import Creations from "@/sections/Creations/Creations";
import Tokenomics from "@/sections/Tokenomics/Tokenomics";
import JoinUs from "@/sections/JoinUs/JoinUs";
import ExclusiveOffer from "@/sections/ExclusiveOffer/ExclusiveOffer";
import UserFlow from "@/sections/UserFlow/UserFlow";
import AIDriven from "@/sections/AIDriven/AIDriven";
import AntixToken from "@/sections/AntixToken/AntixToken";
import Team from '@/sections/Team/Team';
import Advisors from "@/sections/Advisors/Advisors";
import DigitalMap from "@/sections/DigitalMap/DigitalMap";
import Roadmap from '@/sections/Roadmap/Roadmap';
import dynamic from 'next/dynamic'
import usePlaceholderStore from "@/stores/usePlaceholderStore";
import Placeholder from "@/components/Placeholder/Placeholder";
import { StageWidget } from '@/components/StageWidget/StageWidget'
import About from "@/sections/About/About";
// import FloatingWidget from "@/components/FloatingWidget/FloatingWidget";

const Footer = dynamic(() => import("@/sections/Footer/Footer"), { ssr: false });

// export const metadata: Metadata = {
//     title: 'Antix Digital Twins',
//     description: 'Antix Digital Twins',
//     openGraph: {
//         title: "Antix Digital Twins",
//         description: "Antix Digital Twins",
//     }
// };

export default function Home() {
    const { isBlocked } = usePlaceholderStore();
  
    if (isBlocked) {
      return <Placeholder />;
    }

    return (
        <div className={styles.container}>
            <Header />
            <HeroSection />
            <FeaturedIn />
            <PlatformToReplace />
            {/* <FloatingWidget /> */}
            <StageWidget />
            <MarketLeader />
            <Why />
            <Quote />
            <Statistics />
            <ReplacingHumans />
            <About />
            <Amazon />
            <AntixFeatures />
            <NftPassport />
            <Creations />
            <DigitalMap />
            <AIDriven />
            <AntixToken />
            <UserFlow />
            <Tokenomics />
            <Team />
            <Advisors />
            <Roadmap />
            <JoinUs />
            <ExclusiveOffer />
            <Footer />
        </div>
    );
}
