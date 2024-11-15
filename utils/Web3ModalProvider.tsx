import { createWeb3Modal } from "@web3modal/wagmi/react"
import {config, projectId} from "./wagmiConfig";
import {WagmiProvider} from "wagmi";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactNode} from "react";

interface Web3ModalProviderProps {
	children: ReactNode
}

/**
 * Web3ModalProvider Component
 * @constructor
 */
export default function Web3ModalProvider({children}: Web3ModalProviderProps) {
	const queryClient = new QueryClient()
	if (!projectId) throw new Error('Project ID is not defined')
	createWeb3Modal({
		wagmiConfig: config,
		projectId,
		enableAnalytics: false,
		enableOnramp: true,
		featuredWalletIds: [],
		includeWalletIds: [],
		excludeWalletIds: []
	})
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</WagmiProvider>
	)
}
