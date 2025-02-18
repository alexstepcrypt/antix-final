import { useState, useEffect } from "react";
import Api from "@/utils/api"
import { useSendTransaction, useChainId } from 'wagmi'
import { useConnectWallet } from '@/hooks/useConnectWallet'
import { useNetwork } from '@/hooks/useNetwork';
import {parseUnits} from 'viem';
import { waitForTransactionReceipt } from '@wagmi/core'
import { wagmiConfig } from "@/utils/wagmiConfig"
import { sendGAEvent } from "@/utils/utils";

declare global {
	interface Window {
	  dataLayer: Record<string, any>[];
	}
}

const nativeCoins = [
	'0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
	'0x0000000000000000000000000000000000000000',
]

export const useDeposit = function () {
	const wagmiChainId = useChainId()
	const { chainId, address, disconnect } = useConnectWallet()
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
			chainId : Number(chainId),
			status  : "PENDING",
			type    : depositDetails.type === 'BUY' ? 'BUY' : 'DEPOSIT',
			token   : depositDetails.token,
			amount  : String(depositDetails.amount || depositDetails.value), 
			details : { extraInfo: "Transaction details here" },
		})

		sendGAEvent({event:'perfu_congrats', conversionValue:depositDetails.token })

		;(async ()=>{
			const [info, rates] = await Promise.all([
				Api.stagesInfo(1),
				Api.getTokensRate()
			])
			
			const amount = depositDetails.amount || depositDetails.value
			const rate = rates[chainId || 1]?.[depositDetails.token] || 0.08
			const vAntixAmount = Number(amount)/rate
			const vAntixPrice  = info.stages[info.stage.current].prices[0]
			const amountUSD = (vAntixAmount*vAntixPrice).toFixed(2)
			sendGAEvent({
				event: "purchase",
				ecommerce: {
				  transaction_id: depositTxHash,
				  value: amountUSD,  //общая сумма депозита в USD
				  currency: "USD",
				  items: [
				  {
					item_id: depositTxHash,
					item_name: "vAntix",
					item_category: depositDetails.type === 'BUY' ? 'Buy' : 'Deposit',
					price: vAntixPrice,  //цена за один токен
					quantity: vAntixAmount  //количество токенов
				  }]
				}
			})

			window.dataLayer.push({
				event          : 'custom_event',
				event_category : 'forms',
				event_action   : 'success',
				event_label    : 'buy',
				event_content  : 'step_3',
				event_context  : 'application_process',
				bought_tokens  : vAntixAmount,
				transaction_id : address?.substring(3)
			})

			Api.postback({
				status: 'sale',
				profit: amountUSD
			})
		})()

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
		window.dataLayer.push({
			event          : 'custom_event',
			event_category : 'forms',
			event_action   : 'rejected',
			event_label    : 'buy',
			event_content  : 'step_3',
			event_context  : 'application_process'
		})
	}, [depositError])

	// Success transaction
	useEffect(() => {
		if (!depositSuccess) return
		let timestrart = Date.now()
		// Wait for transaction to be confirmed
		waitForTransactionReceipt(wagmiConfig, {
			confirmations: 9, 
			hash: depositTxHash
		}).then(() => {
			let timediff = (11 * 60 * 1000) - (Date.now() - timestrart)
			if (timediff < 0) timediff = 0
			setTimeout(() => {
				setDepositInProgress(false)

				window.dispatchEvent(new CustomEvent('balance:changed', {
					detail: {
						token  : depositDetails.token,
						amount : depositDetails.amount || depositDetails.value
					}
				}))
			}, timediff)
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