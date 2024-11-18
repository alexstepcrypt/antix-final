import { useState, useEffect } from "react";
import Api from "@/utils/api"
import { toFixed } from "@/utils/utils";
import { useConnectWallet } from '@/hooks/useConnectWallet'



let fetchBalancesTimeout:any = null

export const useUserDepositedBalance = function () {
	const { chainId, profile } = useConnectWallet();
	const [balances, setBalances] = useState({usdt:0, usdc:0, vesting:0});

	function fetchBalances() {
		clearTimeout(fetchBalancesTimeout)
		fetchBalancesTimeout = setTimeout(()=>{
			Api.getUserBalances(Number(chainId)).then((res:any)=>{
                // @ts-ignore
            setBalances(Object.values(res).reduce((acc:any, token:any)=>{
                acc[token.symbol] = toFixed(token.balance?.amount || 0, 2)
                return acc
				},{}))
			}).catch(console.error)
		}, 333)
	}
	
	useEffect(() => {
		if (!profile) return
        fetchBalances()
    }, [profile, chainId]);

	useEffect(() => {
		window.addEventListener("balance:changed", fetchBalances);
		return () => {
			window.removeEventListener("balance:changed", fetchBalances);
		}
	}, [])

	return { balances }
}