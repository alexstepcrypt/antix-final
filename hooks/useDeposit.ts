import { useState, useEffect } from "react";
import Api from "@/utils/api"
import { useSendTransaction, useChainId } from 'wagmi'
import {parseUnits} from 'viem';
import { waitForTransactionReceipt } from '@wagmi/core'
import { config } from "@/utils/wagmiConfig"


export const useDeposit = function () {
	const chainId = useChainId()

	const [depositDetails, setDepositDetails] = useState({ type:'DEPOSIT', amount: '0', token: '', value: 0 })
	const [depositInProgress, setDepositInProgress] = useState(false)
	const { data: depositTxHash, isPending:depositPending, isSuccess:depositSuccess, sendTransaction, error: depositError } = useSendTransaction()

	function makeDeposit(type:'DEPOSIT' | 'BUY', amount: string, token: string, value: number = 0) {
		setDepositInProgress(true)
		setDepositDetails({type, amount, token, value})
		
		const method = type === 'BUY' ? 'getBuyTx' : 'getDepositTx'
		
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
			chainId : chainId,
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

		Api.saveTx({
			hash   : depositTxHash, 
			status : 'SUCCESS'
		})

		// Wait for transaction to be confirmed
		waitForTransactionReceipt(config, {
			confirmations: 9, 
			hash: depositTxHash
		}).then(() => {
			setDepositInProgress(false)
		})

	}, [depositSuccess])


	return { 
		depositTxHash,
		depositInProgress,
		depositPending,
		depositSuccess,
		depositError,
		makeDeposit,
	}
}