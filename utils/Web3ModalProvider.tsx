import { wagmiConfig } from "@/utils/wagmiConfig";
import { WagmiProvider } from "wagmi";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactNode} from "react";

const queryClient = new QueryClient()

interface Web3ModalProviderProps {
	children: ReactNode
}

/**
 * Web3ModalProvider Component
 * @constructor
 */
export default function Web3ModalProvider({children}: Web3ModalProviderProps) {
	return <WagmiProvider config={wagmiConfig}>
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	</WagmiProvider>
}
