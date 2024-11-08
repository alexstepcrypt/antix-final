import { create } from "zustand";
import { ethers } from "ethers";
import { persist } from "zustand/middleware";

interface WalletState {
    provider: ethers.BrowserProvider | null;
    signer: ethers.JsonRpcSigner | null;
    account: string | null;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
    checkConnection: () => Promise<void>;
}

const useWalletStore = create(
    persist<WalletState>(
        (set, get) => ({
            provider: null,
            signer: null,
            account: null,
            connectWallet: async () => {
                if (typeof window !== "undefined" && window.ethereum) {
                    const provider = new ethers.BrowserProvider(window.ethereum);
                    await provider.send("eth_requestAccounts", []);
                    const signer = await provider.getSigner();
                    const account = await signer.getAddress();
                    set({ provider, signer, account });
                } else {
                    console.warn("Кошелек не найден. Установите его для взаимодействия с приложением.");
                }
            },
            disconnectWallet: async () => {
                set({ provider: null, signer: null, account: null });
            },
            checkConnection: async () => {
                if (typeof window !== "undefined" && window.ethereum) {
                    const provider = new ethers.BrowserProvider(window.ethereum);
                    const accounts = await provider.listAccounts();
                    if (accounts.length > 0) {
                        const signer = await provider.getSigner();
                        const account = await signer.getAddress();
                        set({ provider, signer, account });
                    }
                }
            },
        }),
        {
            name: "wallet-storage", 
            partialize: (state) => ({ account: state.account } as WalletState),
        }
    )
);


export default useWalletStore;
