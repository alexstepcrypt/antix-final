import {
    BrowserProvider,
    Contract,
    Eip1193Provider,
    Interface,
    InterfaceAbi,
    JsonRpcProvider,
    JsonRpcSigner
} from "ethers";

interface ISmartProperties {
    SMART_ADDRESS: string
    ABI: Interface | InterfaceAbi;
    ETHER_PROVIDER?: BrowserProvider
    SIGNER?: JsonRpcSigner
    CONTRACT?: Contract
    STATIC_READ_CONTRACT?: Contract
    JSON_RPC_PROVIDER?: JsonRpcProvider
}

export interface ISmart extends ISmartProperties  {
    init(provider: Eip1193Provider): void
    guardProperty(): Partial<ISmartProperties>
    guardStaticReadProperty(): Partial<ISmartProperties>
    callMethod(name: string, data?: any): any
    callStaticReadMethod(name: string, data?: any): any
}

export class Smart implements ISmart {
    SMART_ADDRESS: string
    ABI: any;
    ETHER_PROVIDER?: BrowserProvider
    SIGNER?: JsonRpcSigner
    CONTRACT?: Contract
    JSON_RPC_PROVIDER?: JsonRpcProvider
    STATIC_READ_CONTRACT?: Contract


    constructor(address: string, abi: Interface | InterfaceAbi, rpcUrl: string) {
        this.SMART_ADDRESS = address
        this.ABI = abi
        this.JSON_RPC_PROVIDER = new JsonRpcProvider(rpcUrl)
        this.STATIC_READ_CONTRACT = new Contract(address, abi, this.JSON_RPC_PROVIDER)
    }

    async init(provider: Eip1193Provider) {
        this.ETHER_PROVIDER = new BrowserProvider(provider)
        this.SIGNER = await this.ETHER_PROVIDER.getSigner()
        this.CONTRACT = new Contract(this.SMART_ADDRESS, this.ABI, this.SIGNER)
    }

    guardProperty()  {
        const {ETHER_PROVIDER, SIGNER, CONTRACT} = this
        if (!ETHER_PROVIDER) throw new Error("Ethers provider is undefined")
        if (!SIGNER) throw new Error("Signer is undefined")
        if (!CONTRACT) throw new Error("Contract is undefined")
        return {ETHER_PROVIDER, SIGNER, CONTRACT}
    }

    guardStaticReadProperty() {
        const {JSON_RPC_PROVIDER, STATIC_READ_CONTRACT} = this
        if(!JSON_RPC_PROVIDER) throw new Error("JSON RPC Provider is undefined")
        if(!STATIC_READ_CONTRACT) throw new Error("STATIC_READ_CONTRACT is undefined")
        return {JSON_RPC_PROVIDER, STATIC_READ_CONTRACT}
    }

    callMethod<T = any>(name: string, ...data: any[]): Promise<T> {
        const ctx = this.guardProperty()
        return ctx.CONTRACT[name.trim()](...data)
    }

    callStaticReadMethod<T = any>(name: string, ...data: any[]): Promise<T> {
        const ctx = this.guardStaticReadProperty()
        return ctx.STATIC_READ_CONTRACT[name.trim()](...data)
    }
}