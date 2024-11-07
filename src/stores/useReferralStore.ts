import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IReferralStore {
    referralLink: string;
    referralCode: string;
    setReferralLink: (referralLink: string) => void;
    setReferralCode: (referralCode: string) => void;
}

export const useReferralStore = create(
    persist<IReferralStore>(
        (set) => ({
            referralLink: "",
            referralCode: "",
            setReferralLink: (referralLink: string) => set({ referralLink }),
            setReferralCode: (referralCode: string) => set({ referralCode }),
        }),
        {
            name: "referral-storage",
            partialize: (state) => ({
                referralLink: state.referralLink,
                referralCode: state.referralCode,
            } as IReferralStore),
        }
    )
);
