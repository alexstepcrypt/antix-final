import axios from "axios";

type statusParams = "PENDING" | "SUCCESS" | "ERROR";
type typeParams = "DEPOSIT" | "CANCEL" | "BUY" | "CLAIM";

type SaveTransactionParams = {
    hash: string;
    stage: string;
    chainId: number;
    status: statusParams;
    type: typeParams;
    token: string;
    amount: number;
    details: Record<string, any>;
    tokenAuthorization: string;
};

export const saveTransaction = async ({
    hash,
    stage,
    chainId,
    status,
    type,
    token,
    amount,
    details,
    tokenAuthorization,
}: SaveTransactionParams): Promise<void> => {
    try {
        const response = await axios.post(
            "https://antix.cryptoindex.com/profile/saveTx",
            { hash, stage, chainId, status, type, token, amount, details },
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + tokenAuthorization,
                },
            }
        );

        if (response.status !== 200) {
            throw new Error("Ошибка сохранения транзакции");
        }
    } catch (error) {
        console.error("Ошибка вызова saveTransaction:", error);
        throw error;
    }
};
