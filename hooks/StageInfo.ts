"use client";

import useStageStore from "../stores/useStageStore";
import { useEffect } from "react";
import Api from '@/utils/api'
import { useChainId } from "wagmi";

export default function StageInfo() {
    const { setStageData } = useStageStore();
    const chainId = useChainId()

    const fetchStageData = async () => {
        try {
            const data = await Api.stagesInfo(chainId)

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
