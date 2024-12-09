import { useState, useEffect } from "react";
import Api from "@/utils/api"
import { useSendTransaction, useChainId } from 'wagmi'
import { useConnectWallet } from '@/hooks/useConnectWallet'
import { useNetwork } from '@/hooks/useNetwork';
import {parseUnits} from 'viem';
import { waitForTransactionReceipt } from '@wagmi/core'
import { wagmiConfig } from "@/utils/wagmiConfig"


export const useClaimReward = function () {
	const wagmiChainId = useChainId()
	const { chainId, disconnect } = useConnectWallet()
	const { switchNetwork } = useNetwork()
	const [claimInProgress, setClaimInProgress] = useState(false)
	const { 
		data: claimTxHash, 
		isPending: claimPending, 
		isSuccess: claimSuccess, 
		error: claimError,
		sendTransaction
	} = useSendTransaction()

	async function makeClaim() {
		if (!chainId) return

		if (chainId!==56) await switchNetwork(56)

		if (Number(wagmiChainId) !== Number(chainId)) {
			disconnect()
			return
		}

		setClaimInProgress(true)

		Api.getClaimRewardTx().then(data=>{
			if (data?.error) return console.error(data?.error)
			const txData = data?.txData
			if (!txData) return

			sendTransaction({ 
				to    : data.contract as `0x${string}`, 
				data  : txData, 
				value : parseUnits('0', 18)
			})
		}).catch(e => {
			setClaimInProgress(false)
		})
	}


	// Error transaction
	useEffect(() => {
		if (claimError) console.error('claimError', claimError)
		if (!claimTxHash || !claimError) return
		setClaimInProgress(false)
	}, [claimError])

	// Success transaction
	useEffect(() => {
		if (!claimSuccess) return

		// Wait for transaction to be confirmed
		waitForTransactionReceipt(wagmiConfig, {
			confirmations: 4, 
			hash: claimTxHash
		}).then(() => {
			setClaimInProgress(false)
		})
	}, [claimSuccess])

	let status:'none' | 'pending' | 'success' | 'fail' = 'none'
	if (claimInProgress) status = 'pending'
	if (claimSuccess) status = 'success'
	if (claimError) status = 'fail'

	return { 
		status,
		claimTxHash,
		claimInProgress,
		claimPending,
		claimSuccess,
		claimError,
		makeClaim,
	}
}