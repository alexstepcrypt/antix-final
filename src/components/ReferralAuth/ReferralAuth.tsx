"use client";

import React, { useEffect } from "react";
import axios from "axios";
import useWalletStore from "@/stores/useWalletStore";
import { useReferralStore } from "@/stores/useReferralStore";

const trackReferralReward = async (account: string, refcode: string) => {
    try {
        const rewardResponse = await axios.post(
            "https://antix.cryptoindex.com/referral/reward",
            { wallet: account, refcode },
            { headers: { "Content-Type": "application/json" } }
        );

        if (rewardResponse.data.success) {
            console.log("Referral reward granted!");
        } else {
            console.log("Referral reward tracking failed.");
        }
    } catch (error) {
        console.error("Error tracking referral reward:", error);
    }
};

const ReferralAuth: React.FC = () => {
    const { signer, account, checkConnection } = useWalletStore();
    const { referralCode } = useReferralStore();

    useEffect(() => {
        if (account) checkConnection();
    }, []);

    useEffect(() => {
        const refAuth = async () => {
            if (referralCode && signer && account) {
                try {
                    const msg = "I am signing in to confirm my referral link";
                    const sign = await signer.signMessage(msg);

                    // Отправка данных для авторизации и регистрации реферального кода
                    const tokenResponse = await axios.post(
                        "https://antix.cryptoindex.com/profile/auth",
                        { wallet: account, msg, sign, refcode: referralCode },
                        { headers: { "Content-Type": "application/json" } }
                    );
                    console.log(
                        "Authentication successful",
                        tokenResponse.data
                    );

                    // Пожертвование реферального бонуса (до 10%) на основе покупок
                    await trackReferralReward(account, referralCode);

                    useReferralStore.persist.clearStorage();
                } catch (err) {
                    console.warn("Authentication error", err);
                }
            }
        };
        refAuth();
    }, [signer]);

    return null;
};

export default ReferralAuth;
