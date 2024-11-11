import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IReferralStore {
    referralCode: string;
    setReferralCode: (referralCode: string) => void;
}

export const useReferralStore = create(
    persist<IReferralStore>(
        (set) => ({
            referralCode: "",
            setReferralCode: (referralCode: string) => set({ referralCode }),
        }),
        {
            name: "referral-storage",
            partialize: (state) => ({
                referralCode: state.referralCode,
            } as IReferralStore),
        }
    )
);
