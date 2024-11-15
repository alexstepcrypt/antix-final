import { useState, useEffect } from "react";
import { formatCrypto } from "@/utils/utils";
import { useTokenBalance } from "@/hooks/useTokenBalance";

export interface TokenBalanceParams {
	tokenAddress: string | undefined
	onChange?: (amount: string) => void
}

export default function TokenBalance({tokenAddress, onChange = () => {}}: TokenBalanceParams) {
	const [upd, setUpd] = useState(0)
	const {amount, symbol} = useTokenBalance(tokenAddress)

	useEffect(() => {
		onChange(String(amount))
	}, [amount])

	useEffect(() => {
		function handleBalanceChanged({detail: {token, amount}}:any){
			if (token.toLowerCase() !== tokenAddress?.toLowerCase()) return
			setUpd(upd+1)
		}
		window.addEventListener("balance:changed", handleBalanceChanged);
		return () => {
			window.removeEventListener("balance:changed", handleBalanceChanged);
		}
	  }, [tokenAddress])

	return `${formatCrypto(amount)} ${symbol}`
}
