import { useState, useEffect } from "react";
import {formatUnits} from 'viem';
import { useBalance } from "wagmi";
import { useAppKitAccount, useAppKitNetwork} from '@reown/appkit/react'

import { getBalance } from '@wagmi/core'
import { wagmiConfig } from '@/utils/wagmiConfig'

export const useTokenBalance = function (tokenAddress:string|undefined, balanceChainId?:number|undefined) {
	const [amount, setAmount] = useState('0')

	const { address } = useAppKitAccount()
	const { chainId:currentChainId} = useAppKitNetwork()
   	const chainId = balanceChainId || currentChainId

	const isNativeCoin = ['0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', '0x0000000000000000000000000000000000000000'].includes(tokenAddress || '')
	const useBalanceParams:any = {chainId, address}
	if (!isNativeCoin) useBalanceParams.token = tokenAddress

	const { data } = useBalance(useBalanceParams)
	const tokenAmount = formatUnits(data?.value || BigInt(0), data?.decimals || 18) || '0'

	useEffect(() => {
		setAmount('0')
		setTimeout(() => setAmount(tokenAmount), 1)

		if (!isNativeCoin) {
			;(async ()=>{
				if (!address || !tokenAddress) return
				try {	
					// @ts-ignore
					const { value, decimals } = await getBalance(wagmiConfig, { address, token: tokenAddress })
					setAmount(formatUnits(value, decimals))
				} catch (error) {
					console.error('Error getting balance', {chainId, address, tokenAddress, error})
				}
			})()
		}
	}, [tokenAmount])

	return {
		amount, symbol: data?.symbol || '', 
	}
}
