import axios from "axios";

interface BalanceResponse {
    balance: string;
}

const getBalance = async (chainId: string, wallet: string): Promise<string> => {
    try {
        const response = await axios.get(
            `https://antix.cryptoindex.com/profile/balance/${chainId}/${wallet}`
        );
        return Object.values(response.data)[0] as string;
    } catch (error) {
        console.error("Error fetching balance:", error);
        throw new Error("Failed to fetch balance");
    }
};

export default getBalance;
