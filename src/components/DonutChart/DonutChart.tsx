"use client";

import { PieChart, Pie, Cell } from "recharts";
import { memo, useMemo, useEffect, useState } from "react";
import styles from "./DonutChart.module.scss";

const data = [
    { name: "Pre-sales", value: 26 },
    { name: "Ecosystem growth", value: 31.5 },
    { name: "Team & Advisors", value: 15 },
    { name: "Liquidity", value: 8 },
    { name: "Community rewards", value: 14 },
    { name: "Airdrop", value: 2.5 },
    { name: "Public round", value: 2 },
    { name: "KOL round", value: 1 },
];

const COLORS = [
    "#0AD4C9",
    "#FFFFFF",
    "#032A28",
    "#055550",
    "#0A8078",
    "#0DAAA1",
    "#61ADB1",
    "#86A3A1",
];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
}) => {
    if (percent * 100 < 2.5) return null;

    const radius = innerRadius + (outerRadius - innerRadius) / 2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const formattedPercent = (percent * 100).toFixed(1);

    return (
        <text
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            className={styles.chartsLabel}
            fill={index !== 1 ? "#fff" : "#032A28"}
        >
            {`${formattedPercent}%`}
        </text>
    );
};

const DonutChart: React.FC = memo(() => {
    const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const chartData = useMemo(() => data, []);

    const innerRadius = screenWidth < 1280 ? 100 : 100;
    const outerRadius = screenWidth < 1280 ? 260 : 265;

    return (
        <div className={styles.chartWrapper}>
            <PieChart width={540} height={540} className={styles.chart}>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    dataKey="value"
                    stroke="none"
                    label={renderCustomizedLabel}
                    labelLine={false}
                    isAnimationActive={false}
                >
                    {chartData.map((_, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
            </PieChart>
        </div>
    );
});

export default DonutChart;
