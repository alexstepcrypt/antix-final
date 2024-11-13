import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IReferralStore {
    referralCode: string;
    setReferralCode: (referralCode: string) => void;
    referralLink: string;
    setReferralLink: (referralLink: string) => void;
}

export const useReferralStore = create(
    persist<IReferralStore>(
        (set) => ({
            referralCode: "",
            setReferralCode: (referralCode: string) => set({ referralCode }),
            referralLink: "",
            setReferralLink: (referralLink: string) => set({ referralLink }),
        }),
        {
            name: "referral-storage",
            partialize: (state) => ({
                referralCode: state.referralCode,
                referralLink: state.referralLink,
            } as IReferralStore),
        }
    )
);
