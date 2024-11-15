import axios from "axios";
import { JsonRpcSigner } from "ethers";

type AuthProps = {
    wallet: string;
    signer: JsonRpcSigner;
    refcode?: string;
};

export async function auth({
    wallet,
    signer,
    refcode,
}: AuthProps): Promise<string | null> {
    const savedToken = localStorage.getItem("accessToken");
    if (savedToken && !refcode) return savedToken;

    try {
        const msg = "I am signing in to Antix digital twins";
        const sign = await signer.signMessage(msg);

        const data = { wallet, msg, sign, ...(refcode && { refcode }) };

        const response = await axios.post(
            "https://antix.cryptoindex.com/profile/auth",
            data,
            { headers: { "Content-Type": "application/json" } }
        );

        const accessToken = response.data.accessToken;
        localStorage.setItem("accessToken", accessToken);

        return accessToken;
    } catch (error) {
        console.error("Ошибка при аутентификации:", error);
        return null;
    }
}
