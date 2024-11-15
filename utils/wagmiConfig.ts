// import {coinbaseWallet, walletConnect} from 'wagmi/connectors'
import {walletConnect} from 'wagmi/connectors'
import {createConfig, http} from 'wagmi'
import {bsc, mainnet} from 'wagmi/chains'

export const projectId = process.env.WALLET_CONNECT_ID

const metadata:any = {
	name: 'Antix.in',
	description: 'The new era of AI-powered digital humans is here',
	url: process.env.WEB as string,
	// icons: ['https://token.antix.in/_next/static/media/logo-full.723219c1.svg']
}

const chains = [mainnet, bsc] as const

export const config = createConfig({
	chains,
	connectors: [
		walletConnect({ projectId: String(projectId), metadata, showQrModal: false }),
		// coinbaseWallet({
		// 	appName: metadata.name,
		// 	appLogoUrl: metadata.icons[0]
		// })
	],
	ssr: true,
	transports: {
		[mainnet.id]: http('https://rpc.ankr.com/eth'),
		[bsc.id]: http('https://bsc-dataseed.binance.org')
	}
})