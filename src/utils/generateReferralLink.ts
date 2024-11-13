import axios from "axios";
import { JsonRpcSigner } from "ethers";
import { auth } from "./auth";
import { useReferralStore } from "@/stores/useReferralStore";

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

        const refcodeResponse = await axios.get(
            "https://antix.cryptoindex.com/profile/refcode",
            { headers: { Authorization: authorization } }
        );
        const referralCode = refcodeResponse.data.refcode;
        const referralLink = `${window.location.origin}/?refcode=${referralCode}`;

        const { setReferralCode, setReferralLink } = useReferralStore.getState();
        setReferralCode(referralCode);
        setReferralLink(referralLink);

        return referralLink;
    } catch (error) {
        console.error("Ошибка при генерации ссылки:", error);
        return null;
    }
}
