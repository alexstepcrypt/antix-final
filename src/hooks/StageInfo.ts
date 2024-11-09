"use client";

import useStageStore from "@/stores/useStageStore";
import { useEffect } from "react";
import axios from "axios";

const API_URL = "https://antix.cryptoindex.com/sale/1/info";

export default function StageInfo() {
    const { setStageData } = useStageStore();

    const fetchStageData = async () => {
        try {
            const response = await axios.get(API_URL);
            const data = response.data;

            setStageData({
                currentStage: data.currentStage,
                price: data.price,
                start: new Date(data.start * 1000).toLocaleString(),
                end: new Date(data.end * 1000).toLocaleString(),
                vesting: data.vesting,
            });
            console.error("fsafas", data);

        } catch (err) {
            console.error("Error:", err);
        }
    };

    useEffect(() => {
        fetchStageData();
        const interval = setInterval(fetchStageData, 60000);
        return () => clearInterval(interval);
    }, []);

    return null;
}
