import { Eip1193Provider, formatEther, parseEther, parseUnits } from "ethers";
import { Smart } from "./interface";

export class SeedSaleSmart {
    SEED_SALE_ADDRESS: string;
    ABI: any;
    USER_ADDRESS?: string;
    smart: Smart;

    constructor(seedSaleAddress: string, abi: any) {
        this.SEED_SALE_ADDRESS = seedSaleAddress;
        this.ABI = abi;
        this.smart = new Smart(this.SEED_SALE_ADDRESS, this.ABI, "");
    }

    guardProperty() {
        const { USER_ADDRESS } = this;
        if (!USER_ADDRESS) throw new Error("User address is undefined");
        return { USER_ADDRESS };
    }

    async init(walletProvider: Eip1193Provider, userAddress: string) {
        await this.smart.init(walletProvider);
        this.USER_ADDRESS = userAddress;
    }

    // Read contracts
    async chainlinkBNB() {
        return await this.smart.callMethod('chainlinkBNB');
    }

    async getAllUsersToken(saleNumber: number) {
        return await this.smart.callMethod('getAllUsersToken', saleNumber);
    }

    async getBNBPrice() {
        const bnbPrice = await this.smart.callMethod<bigint>('getBNBPrice');
        return String(bnbPrice);
    }

    async getBlxAmountForBnb(saleNumber: number, amount: number) {
        const amountValue = String(parseInt(String(parseEther(String(amount)))))
        const blxAmountForBnb = await this.smart.callMethod<bigint>('getBlxAmountForBnb', saleNumber, amountValue);
        return formatEther(blxAmountForBnb)
    }

    async getBlxAmountForUsdt(saleNumber: number, amount: number) {
        const blxAmountForUsdt = await this.smart.callMethod<bigint>('getBlxAmountForUsdt', saleNumber, parseEther(String(amount)));
        return formatEther(blxAmountForUsdt);
    }

    async getUserTokens(saleNumber: number, account: string) {
        const userTokens = await this.smart.callMethod<bigint>('getUserTokens', saleNumber, account);
        return formatEther(userTokens);
    }

    async owner() {
        return await this.smart.callMethod<string>('owner');
    }

    async sales(input: number) {
        const sales = await this.smart.callMethod('sales', input);
        return sales;
    }

    async token() {
        return await this.smart.callMethod<string>('token');
    }

    // Write contracts
    async addUser(saleNumber: number, account: string, amount: number) {
        const tx = await this.smart.callMethod('addUser', saleNumber, account, amount);
        await tx.wait();
    }

    async buyTokens(saleNumber: number, amount: string) {
        const amountValue = parseUnits(amount, 18)
        const tx = await this.smart.callMethod('buyTokens', saleNumber, amountValue);
        await tx.wait();
    }

    async buyTokensInBNB(amount: string, saleNumber: number) {
        const amountValue = String(parseInt(String(parseFloat(String(parseEther(amount))))));
        const amountObj = {value: amountValue};
        const tx = await this.smart.callMethod('buyTokensInBNB', saleNumber, amountObj);
        await tx.wait();
    }

    async createSale(
        saleNumber: number,
        startDate: number,
        endDate: number,
        tokenPrice: number,
        pool: number,
        max: number,
        min: number
    ) {
        const tx = await this.smart.callMethod(
            'createSale',
            saleNumber,
            startDate,
            endDate,
            parseEther(String(tokenPrice)),
            pool,
            max,
            min
        );
        await tx.wait();
    }

    async renounceOwnership() {
        const tx = await this.smart.callMethod('renounceOwnership');
        await tx.wait();
    }

    async setEndTime(saleNumber: number, newTime: number) {
        const tx = await this.smart.callMethod('setEndTime', saleNumber, newTime);
        await tx.wait();
    }

    async setPrice(saleNumber: number, newPrice: number) {
        const tx = await this.smart.callMethod('setPrice', saleNumber, parseEther(String(newPrice)));
        await tx.wait();
    }

    async setStartTime(saleNumber: number, newTime: number) {
        const tx = await this.smart.callMethod('setStartTime', saleNumber, newTime);
        await tx.wait();
    }

    async setToken(_token: string) {
        const tx = await this.smart.callMethod('setToken', _token);
        await tx.wait();
    }

    async transferBNB(account: string, amount: number) {
        const amountValue = parseEther(String(amount));
        const tx = await this.smart.callMethod('transferBNB', account, amountValue);
        await tx.wait();
    }

    async transferOwnership(newOwner: string) {
        const tx = await this.smart.callMethod('transferOwnership', newOwner);
        await tx.wait();
    }

    async transferTokens(account: string, amount: number) {
        const amountValue = parseEther(String(amount));
        const tx = await this.smart.callMethod('transferTokens', account, amountValue);
        await tx.wait();
    }
}
