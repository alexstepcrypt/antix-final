import { useState, useEffect } from "react";
import Api from "@/utils/api"
import { useSendTransaction, useChainId } from 'wagmi'
import { useConnectWallet } from '@/hooks/useConnectWallet'
import { useNetwork } from '@/hooks/useNetwork';
import {parseUnits} from 'viem';
import { waitForTransactionReceipt } from '@wagmi/core'
import { config as wagmiConfig} from "@/utils/wagmiConfig"


export const useDeposit = function () {
	const wagmiChainId = useChainId()
	const { chainId } = useConnectWallet()
	const { switchNetwork } = useNetwork()
	const [depositDetails, setDepositDetails] = useState({ type:'DEPOSIT', amount: '0', token: '', value: 0 })
	const [depositInProgress, setDepositInProgress] = useState(false)
	const { data: depositTxHash, isPending:depositPending, isSuccess:depositSuccess, sendTransaction, error: depositError } = useSendTransaction()

	async function makeDeposit(type:'DEPOSIT' | 'BUY', amount: string, token: string, value: number = 0) {
		if (!chainId) return
		setDepositInProgress(true)
		setDepositDetails({type, amount, token, value})
		
		const method = type === 'BUY' ? 'getBuyTx' : 'getDepositTx'
		
		console.log({wagmiChainId, reownChainId: chainId})

		Api[method](chainId, token, amount).then(data => {
			if (data?.error) return console.error(data?.error)
			const txData = data?.txData
			if (!txData) return

			sendTransaction({ 
				to    : data.contract as `0x${string}`, 
				data  : txData, 
				value : parseUnits(String(value || 0), 18)
			})
		}).catch(e => {
			setDepositInProgress(false)
		})
	}

	// Pending transaction
	useEffect(() => {
		if (!depositTxHash) return
		Api.saveTx({
			hash    : depositTxHash,
			stage   : "1",
			chainId : Number(chainId),
			status  : "PENDING",
			type    : depositDetails.type === 'BUY' ? 'BUY' : 'DEPOSIT',
			token   : depositDetails.token,
			amount  : String(depositDetails.amount || depositDetails.value), 
			details : { extraInfo: "Transaction details here" },
		})
	}, [depositTxHash])

	// Error transaction
	useEffect(() => {
		if (depositError) setDepositInProgress(false)
		if (!depositTxHash || !depositError) return
		Api.saveTx({
			hash   : depositTxHash, 
			status : 'ERROR'
		})
	}, [depositError])

	// Success transaction
	useEffect(() => {
		if (!depositSuccess) return

		// Wait for transaction to be confirmed
		waitForTransactionReceipt(wagmiConfig, {
			confirmations: 4, 
			hash: depositTxHash
		}).then(() => {
			setDepositInProgress(false)

			window.dispatchEvent(new CustomEvent('balance:changed', {
				detail: {
					token  : depositDetails.token,
					amount : depositDetails.amount || depositDetails.value
				}
			}))
		})

		Api.saveTx({
			hash   : depositTxHash, 
			status : 'SUCCESS'
		}).catch(console.error)
	}, [depositSuccess])

	let status:'none' | 'pending' | 'success' | 'fail' = 'none'
	if (depositInProgress) status = 'pending'
	if (depositSuccess) status = 'success'
	if (depositError) status = 'fail'

	return { 
		status,
		depositTxHash,
		depositInProgress,
		depositPending,
		depositSuccess,
		depositError,
		makeDeposit,
	}
}