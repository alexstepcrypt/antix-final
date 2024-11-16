import { useState, useEffect } from "react";
import Api from "@/utils/api"
import { toFixed } from "@/utils/utils";
import { useConnectWallet } from '@/hooks/useConnectWallet'

export const useUserDepositedBalance = function () {
	const { chainId, profile, isConnected, address } = useConnectWallet();
	const [balances, setBalances] = useState({usdt:0, usdc:0});

	function fetchBalances(){
		Api.getUserBalances(chainId).then((res:any)=>{
            // @ts-ignore
            setBalances(Object.values(res).reduce((acc:any, token:any)=>{
                acc[token.symbol] = toFixed(token.balance?.amount || 0, 2)
                return acc
            },{}))
        }).catch(console.error)
	}

	useEffect(() => {
        if (!profile) return
        fetchBalances()
    }, [profile, isConnected, address]);

	useEffect(() => {
		window.addEventListener("balance:changed", fetchBalances);
		return () => {
			window.removeEventListener("balance:changed", fetchBalances);
		}
	}, [])

	return { balances }
}