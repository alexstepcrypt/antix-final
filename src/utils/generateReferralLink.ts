import axios from "axios";
import { JsonRpcSigner } from "ethers";
import { auth } from "./auth";

type Props = {
    wallet: string;
    signer: JsonRpcSigner;
};

export async function generateReferralLink({
    wallet,
    signer,
}: Props): Promise<string | null> {
    if (!wallet) throw new Error("Wallet address is required");

    try {
        const token = await auth({ wallet, signer });
        const authorization = `Bearer ${token}`;
        console.log(authorization);

        const refcodeResponse = await axios.get(
            "https://antix.cryptoindex.com/profile/refcode",
            { headers: { Authorization: authorization } }
        );
        console.log("refcodeResponse" + refcodeResponse);


        const referralCode = refcodeResponse.data.refcode;

        return `${window.location.origin}/?refcode=${referralCode}`;
    } catch (error) {
        console.error("Ошибка при генерации ссылки:", error);
        return null;
    }
}
