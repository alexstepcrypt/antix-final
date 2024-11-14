import axios from "axios";

interface BalanceResponse {
    balance: string;
}

const getBalance = async (chainId: string, wallet: string): Promise<string> => {
    try {
        const response = await axios.get<BalanceResponse>(
            `https://antix.cryptoindex.com/profile/balance/${chainId}/${wallet}`
        );
        return response.data.balance;
    } catch (error) {
        console.error("Error fetching balance:", error);
        throw new Error("Failed to fetch balance");
    }
};

export default getBalance;
