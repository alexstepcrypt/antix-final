import axios from "axios";

type Props = {
    wallet: string;
    msg: string;
    sign: string;
};

export async function generateReferralLink({
    wallet,
    sign,
    msg,
}: Props): Promise<string | null> {
    if (!wallet) throw new Error("Wallet address is required");

    try {
        const tokenResponse = await axios.post(
            'https://antix.cryptoindex.com/profile/auth',
            { wallet, msg, sign },
            { headers: { 'Content-Type': 'application/json' } }
        );
        
        const token = tokenResponse.data;

        const refcodeResponse = await axios.get(
            'https://antix.cryptoindex.com/profile/refcode',
            { headers: { Authorization: `Bearer ${token.accessToken}` } }
        );

        const referralCode = refcodeResponse.data.refcode;

        return `https://antix/referral?code=${referralCode}`;
    } catch (error) {
        console.error("Ошибка при генерации ссылки:", error);
        return null;
    }
}
