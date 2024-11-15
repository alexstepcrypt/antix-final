import { useEffect } from "react";
import { formatCrypto } from "@/utils/utils";
import { useTokenBalance } from "@/hooks/useTokenBalance";

export interface TokenBalanceParams {
	tokenAddress: string | undefined
	onChange?: (amount: string) => void
}

export default function TokenBalance({tokenAddress, onChange = () => {}}: TokenBalanceParams) {

	const {amount, symbol} = useTokenBalance(tokenAddress)

	useEffect(() => {
		onChange(String(amount))
	}, [amount])

	return `${formatCrypto(amount)} ${symbol}`
}
