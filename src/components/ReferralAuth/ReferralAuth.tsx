"use client"

import React, { useEffect } from "react";
import axios from "axios";
import useWalletStore from "@/stores/useWalletStore";
import { useReferralStore } from "@/stores/useReferralStore";

const ReferralAuth: React.FC = () => {
    const { signer, account, checkConnection } = useWalletStore();
    const { referralCode } = useReferralStore();

    useEffect(() => {
        if(account) checkConnection();
    }, []);

    useEffect(() => {
        const refAuth = async () => {
            if (referralCode && signer && account) {
                try {
                    const msg = "I am signing in to confirm my referral link";
                    const sign = await signer.signMessage(msg);

                    const tokenResponse = await axios.post(
                        "https://antix.cryptoindex.com/profile/auth",
                        { wallet: account, msg, sign, refcode: referralCode },
                        { headers: { "Content-Type": "application/json" } }
                    );
                    console.log(
                        "Authentication successful",
                        tokenResponse.data
                    );
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
