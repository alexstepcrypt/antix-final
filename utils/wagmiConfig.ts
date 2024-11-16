import {createConfig, http} from 'wagmi'
import {bsc, mainnet} from 'wagmi/chains'

const chains = [mainnet, bsc] as const

export const config = createConfig({
	chains,
	ssr: false,
	transports: {
		[mainnet.id]: http('https://rpc.ankr.com/eth'),
		[bsc.id]: http('https://bsc-dataseed.binance.org')
	}
})