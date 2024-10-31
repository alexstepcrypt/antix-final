import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IAuthStore {
    isConnected: boolean;
    walletAdress: string;
    setIsConnected: (connected: boolean) => void;
    setWalletAdress: (walletAdress: string) => void;
}

export const useAuthStore = create(
    persist<IAuthStore>(
        (set) => ({
            isConnected: false,
            walletAdress: "",
            setIsConnected: (isConnected: boolean) => set({ isConnected }),
            setWalletAdress: (walletAdress: string) => set({ walletAdress }),
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({ isConnected: state.isConnected, walletAdress: state.walletAdress }) as IAuthStore,
        }
    )
);
