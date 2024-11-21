import { useState, useEffect } from "react";
import Api from "@/utils/api"
import { useSendTransaction, useChainId } from 'wagmi'
import { useConnectWallet } from '@/hooks/useConnectWallet'
import { useNetwork } from '@/hooks/useNetwork';
import {parseUnits} from 'viem';
import { waitForTransactionReceipt } from '@wagmi/core'
import { wagmiConfig } from "@/utils/wagmiConfig"

const nativeCoins = [
	'0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
	'0x0000000000000000000000000000000000000000',
]

export const useDeposit = function () {
	const wagmiChainId = useChainId()
	const { chainId, disconnect } = useConnectWallet()
	const { switchNetwork } = useNetwork()
	const [depositDetails, setDepositDetails] = useState({ type:'DEPOSIT', amount: '0', token: '', value: 0 })
	const [depositInProgress, setDepositInProgress] = useState(false)
	const { 
		data: depositTxHash, 
		isPending: depositPending, 
		isSuccess: depositSuccess, 
		error: depositError,
		sendTransaction
	} = useSendTransaction()

	async function makeDeposit(type:'DEPOSIT' | 'BUY', amount: string, token: string) {
		if (!chainId) return

		if (Number(wagmiChainId) !== Number(chainId)) {
			disconnect()
			return
		}

		let value = 0
		if (nativeCoins.includes(token)) {
			value = Number(amount)
		}

		setDepositInProgress(true)
		setDepositDetails({type, amount, token, value})
		console.log('makeDeposit', {type, amount, token, value})
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
		if (depositError) console.error('depositError', depositError)
		if (!depositTxHash || !depositError) return
		setDepositInProgress(false)
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