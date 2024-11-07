"use client"
import { useReferralStore } from "@/stores/useReferralStore";
import { useEffect } from "react";

const ReferralHandler = () => {
    const { setReferralCode } = useReferralStore();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search); 
            const refcode = urlParams.get("refcode");

            if (refcode) {
                console.log(refcode);
                setReferralCode(refcode); 
            }
        }
    }, [setReferralCode]);

    return null;
};

export default ReferralHandler;
