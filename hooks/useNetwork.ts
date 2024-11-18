import { useAppKitNetwork, useAppKitAccount } from '@reown/appkit/react'
import { mainnet, bsc } from '@reown/appkit/networks'
import { AppKitNetwork } from '@reown/appkit-common';
import { useEffect } from 'react';

export interface Network {
   chain   : AppKitNetwork;
   chainId : number;
   label   : string;
   value   : string;
   icon    : string;
}

export const networks: Record<number, Network> = {
   1: {
      chain  : mainnet,
      chainId: 1,
      label  : 'Ethereum',
      value  : 'ETH',
      icon   : '/svg/ether-icon.svg',
   },
   56: {
      chain  : bsc,
      chainId: 56,
      label  : 'BNB Smart Chain',
      value  : 'BSC',
      icon   : '/svg/bnb-icon.svg',
   },
}

interface UseNetwork {
   network: Network;
   switchNetwork: (chainId: number | string) => void;
   networks: Network[];
}

export function useNetwork(): UseNetwork {
   const { chainId, switchNetwork } = useAppKitNetwork()
   const { isConnected } = useAppKitAccount()


   useEffect(() => {
      if (!chainId || !isConnected) return
      if (Object.keys(networks).includes(String(chainId))) {
         try {
            switchNetwork(networks[chainId as keyof typeof networks].chain)
         } catch (error) {
            console.error('Error switching network', error)
         }
      }
   }, [chainId, isConnected])


   if (!chainId) {
      return {
         network: networks[1],
         switchNetwork: () => {},
         networks: Object.values(networks),
      }
   }

   return {
      switchNetwork: (chainId: number | string) => {
         if (!isConnected) return
         try {
            switchNetwork(networks[chainId as keyof typeof networks || 1].chain)
         } catch (error) {
            console.error('Error switching network', error)
         }
      },

      network: networks[chainId as keyof typeof networks || 1],

      networks: Object.values(networks),
   }
}
