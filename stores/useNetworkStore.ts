import { create } from 'zustand'

export interface Network {
   label: string;
   value: string;
   icon: string;
}

interface NetworkStore {
   network: Network;
   setNetwork: (network: Network) => void;
}

export const useNetworkStore = create<NetworkStore>(set => ({
   network: {
      label: "Ethereum",
      value: "ETH",
      icon: "/svg/ether-icon.svg",
   },
   setNetwork: n => set({ network: n }),
}));