"use client"
import styles from "./DepositButton.module.scss";
import { useConnectWallet } from '@/hooks/useConnectWallet'
import { useDeposit } from '@/hooks/useDeposit'
import {useAccount, useSwitchChain, useReadContract, useWriteContract, useWaitForTransactionReceipt} from "wagmi";
import { useState, useEffect} from "react";
import { parseUnits, formatUnits } from 'viem';
import DepositStatusModal from './DepositModal/StatusModal'

const contractsAddresses:any = {
    1  : process.env.TOKENSALE_ETH,
    56 : process.env.TOKENSALE_BSC,
}

const erc20minABI = [{
	name            : 'allowance',
	type            : 'function',
	inputs          : [{ name: '_owner', type: 'address' }, { name: '_spender', type: 'address' }],
	outputs         : [{ name: '', type: 'uint256' }],
	constant        : true,
	payable         : false,
	stateMutability : 'view'
  }, {
	name            : 'approve',
	type            : 'function',
	inputs          : [{ name: '_spender', type: 'address' }, { name: '_value', type: 'uint256' }],
	outputs         : [],
	constant        : false,
	payable         : false,
	stateMutability : 'nonpayable'
  }
]



const tokensDecimals:any = {
	// eth/bsc native coin
    '0x0000000000000000000000000000000000000000': 18,
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee': 18,
	// usdt
    '0xdAC17F958D2ee523a2206206994597C13D831ec7': 6,
	// usdc
    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': 6,
}


interface IDepositButton {
    amount: string|number
    type: 'BUY' | 'DEPOSIT'
    tokenAddress: `0x${string}`
}

export default function DepositButton({amount, type, tokenAddress}:IDepositButton){
    const account = useAccount()
    const { address, chainId, connect } = useConnectWallet()
    const { switchChain } = useSwitchChain()
    const contractAddress = contractsAddresses[chainId]

    const allowanceResult:any = useReadContract({
        chainId: chainId,
		address: tokenAddress, 
		abi: erc20minABI,
		functionName: 'allowance',
		args: [ address, contractAddress ],
	})
	const [approveData, setApproveData] = useState({ approved: false, amount: 0 })
	const allowance = approveData.approved ? approveData.amount : Number(formatUnits(allowanceResult?.data || '0', tokensDecimals[tokenAddress]))

	// Approve
	const [apprveInProgress, setApproveInProgress] = useState(false)
	const { data: approveTxHash, writeContract: approveWriteContract, error:appoveError, isError: isApproveError } = useWriteContract()
	const { isSuccess: isApproveConfirmed } = useWaitForTransactionReceipt({ hash: approveTxHash })

	function approve(){
		if (Number(amount) === 0) {
			return alert('Please enter stake amount')
		}
		setApproveData({ approved: false, amount: Number(amount) })
		setApproveInProgress(true)

		approveWriteContract({
			address: tokenAddress,
			abi: erc20minABI,
			functionName: 'approve',
			args: [ contractAddress, parseUnits(String(amount), tokensDecimals[tokenAddress]) ],
		})
	}
	
	useEffect(() => {
		if (!isApproveError) return
        console.error(appoveError)
		setApproveInProgress(false)
	}, [isApproveError])

	useEffect(() => {
		if (!approveTxHash) return
		setApproveInProgress(false)
		setApproveData({ ...approveData, approved: isApproveConfirmed })
	}, [isApproveConfirmed])


    const { depositTxHash, status, depositError, makeDeposit } = useDeposit()
    function deposit(){
        makeDeposit(type, String(amount), tokenAddress)
    }

	// First connect wallet
	if (!address) {
		return <button onClick={() => connect()} className={styles.depositBtn}>
			Connect wallet
		</button>
	}

	// Switch network
	if (![1,56].includes(Number(account.chainId))) {
		return <button onClick={() => switchChain({ chainId: 1 })} className={styles.depositBtn}>
			Switch network
		</button>
	}

	// Approve amount
	if (allowance < Number(amount) || Number(amount) === 0) {
		return <button onClick={() => approve()} disabled={apprveInProgress || Number(amount) <= 0} className={styles.depositBtn}>
            {Number(amount) <= 0 
                ? 'Enter amount' 
                : apprveInProgress ? 'Please confirm TX...' : 'Approve Deposit'
            }
        </button>
	}

    // Deposit
    return <>
        <button onClick={deposit} className={styles.depositBtn} disabled={!Number(amount)}>
            {status==='pending' ? "Processing..." : "Deposit Now"}
        </button>

		<DepositStatusModal txHash={String(depositTxHash)} status={status} retryFn={deposit} />
    </>
}