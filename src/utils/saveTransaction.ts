import axios from "axios";

type statusParams = "PENDING" | "SUCCESS" | "ERROR";
type typeParams = "DEPOSIT" | "CANCEL" | "BUY" | "CLAIM";

type SaveTransactionParams = {
    hash: string;
    stage: string;
    status: statusParams;
    type: typeParams;
    token: string;
    amount: number;
    details: Record<string, any>;
};

export const saveTransaction = async (
    params: SaveTransactionParams
): Promise<void> => {
    try {
        const response = await axios.post("https://antix.cryptoindex.com/profile/saveTx", params);

        if (response.status !== 200) {
            throw new Error("Ошибка сохранения транзакции");
        }
    } catch (error) {
        console.error("Ошибка вызова saveTransaction:", error);
        throw error;
    }
};
