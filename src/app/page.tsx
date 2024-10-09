import Header from "@/sections/Header/Header";
import styles from "./page.module.scss";
import HeroSection from "@/sections/HeroSection/HeroSection";
import FeaturedIn from "@/sections/FeaturedIn/FeaturedIn";
import PlatformToReplace from "@/sections/PlatformToReplace/PlatformToReplace";
import MarketLeader from "@/sections/MarketLeader/MarketLeader";
import Why from "@/sections/Why/Why";
import Quote from "@/sections/Quote/Quote";
import Statistics from "@/sections/Statistics/Statistics";
import ReplacingHumans from "@/sections/ReplacingHumans/ReplacingHumans";
import Amazon from "@/sections/Amazon/Amazon";
import AntixFeatures from "@/sections/AntixFeatures/AntixFeatures";

export default function Home() {
    return (
        <div className={styles.container}>
            <Header />
            <HeroSection />
            <FeaturedIn />
            <PlatformToReplace />
            <MarketLeader />
            <Why />
            <Quote />
            <Statistics />
            <ReplacingHumans />
            <Amazon />
            <AntixFeatures />
        </div>
    );
}
