import { useState, useEffect } from "react";
import {formatUnits} from 'viem';
import {useAccount, useBalance, useChainId} from "wagmi";
import { getBalance } from '@wagmi/core'
import { config } from '@/utils/wagmiConfig'

export const useTokenBalance = function (tokenAddress:string|undefined, balanceChainId?:number|undefined) {
	const [amount, setAmount] = useState('0')

	const account = useAccount()
	const currentChainId = useChainId()
   	const chainId = balanceChainId || currentChainId

	const isNativeCoin = tokenAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
	const useBalanceParams:any = {chainId, address: account.address}
	if (!isNativeCoin) useBalanceParams.token = tokenAddress

	const { data } = useBalance(useBalanceParams)
	const tokenAmount = formatUnits(data?.value || BigInt(0), data?.decimals || 18) || '0'

	useEffect(() => {
		setAmount('0')
		setTimeout(() => setAmount(tokenAmount), 1)

		if (!isNativeCoin) {
			;(async ()=>{
				if (!account?.address || !tokenAddress) return
				// @ts-ignore
				const { value, decimals } = await getBalance(config, { address:account.address, token: tokenAddress })
				setAmount(formatUnits(value, decimals))
			})()
		}
	}, [tokenAmount])

	return {
		amount, symbol: data?.symbol || '', 
	}
}
