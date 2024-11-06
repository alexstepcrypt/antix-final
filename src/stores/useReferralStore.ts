import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IReferralStore {
    referralLink: string;
    setReferralLink: (referralLink: string) => void;
}

export const useReferralStore = create(
    persist<IReferralStore>(
        (set) => ({
            referralLink: "",
            setReferralLink: (referralLink: string) => set({ referralLink }),
        }),
        {
            name: "referral-storage",
            partialize: (state) =>
                ({ referralLink: state.referralLink } as IReferralStore),
        }
    )
);
