
import styles from "./page.module.scss";

import Bg from "@/public/images/dashboard-bg.png";
import DashboardTop from "@/components/DashboardTop/DashboardTop";
import DashboardHeader from "@/sections/DashboardHeader/DashboardHeader";
import { DashboardBottom } from '@/components/DashboardBottom/DashboardBottom'

export default function Home() {
    return (
        <div
            className={styles.page}
            style={{ backgroundImage: `url(${Bg.src})` }}
        >
            <DashboardHeader />
            <DashboardTop />
            <DashboardBottom />
        </div>
    );
}
