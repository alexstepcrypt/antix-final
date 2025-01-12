import { create } from "zustand"
import { useState, useEffect } from "react";
import { useSignMessage, useDisconnect } from "wagmi";
import { useAppKit, useAppKitAccount, useAppKitNetwork, useWalletInfo} from '@reown/appkit/react'
import Api from "@/utils/api";
import { sendGAEvent, sendGA4Event } from "@/utils/utils";

declare global {
	interface Window {
	  dataLayer: Record<string, any>[];
	}
}
interface ProfileState {
    profile: any;
    setProfile: (data: any) => void;
}
const useProfileStore = create<ProfileState>((set) => ({
	profile: null,
	setProfile: (data:any) => set({ profile: data }),
}))

interface ConnectedState {
    connected: any;
    setConnected: (data: boolean) => void;
}
const useConnectedStore = create<ConnectedState>((set) => ({
	connected: false,
	setConnected: (data:boolean) => set({ connected: data }),
}))

interface AccountState {
    account: string|null;
    setAccount: (data: string) => void;
}
const useAccountStore = create<AccountState>((set) => ({
	account: null,
	setAccount: data => set({ account: data }),
}))

function clearLocalStorage(){
	const utms = localStorage.utms
	const subid = localStorage.subid
	localStorage.clear()
	localStorage.utms = utms
	localStorage.subid = subid
	sessionStorage.clear()
}

export const useConnectWallet = function (): {
	isReady: boolean,
	isConnected: boolean,
	status: string | undefined,
	chainId: number | string | undefined,
	account: string|null,
	address: string|null,
	profile: any,
	connect: () => void,
	disconnect: () => void
} {
	const { open, close } = useAppKit()
	const { isConnected, status, address } = useAppKitAccount()
	const { chainId } = useAppKitNetwork()
	const { walletInfo } = useWalletInfo()
    const { disconnect } = useDisconnect()
	const { profile, setProfile } = useProfileStore()
	const [ web3modalOpen, setWeb3modalOpen ] = useState(false)
	const { data: signMessageData, signMessage, variables, error: signError } = useSignMessage()
	const [ ready, setReady ] = useState(isConnected || !!status || !!profile)


	useEffect(()=>{
		if (!walletInfo?.name) return
		const walletType = ['metamask', 'coinbase', 'walletconnect'].find(wallet => walletInfo?.name?.includes(wallet))
		sendGA4Event(walletType ? 'select_wallet_'+ walletType : 'select_wallet')
	}, [walletInfo])

	const checkAuth = () => {
        if (!address) return
		Api.getUserProfile().then((profileInfo:any)=>{
			if (profileInfo.error) {
				console.log('Auth error', profileInfo.error)
				return
			}
			setProfile(profileInfo)
        }).catch(() => {
            signToLogin()
        })
	}
	useEffect(() => checkAuth(), [address])
	
	const signToLogin = () => {
		signMessage({message: 'I am signing in to Antix digital twins'})
	}
	useEffect(() => {
		if (signError) {
			console.log('signError', signError)
			disconnect(); close()
			clearLocalStorage()
			setTimeout(()=>{
				window.location.reload()
			},999)
		}
	}, [signError])

	const connect = () => {
		if (!address || !isConnected) {
			disconnect()
			close()
			clearLocalStorage()
			setTimeout(()=>{
				sendGA4Event('click_connect_wallet')
				setWeb3modalOpen(true)
				open()
			},333)
		} else {
			signToLogin()
		}
	}

	useEffect(() => {
		if (web3modalOpen) {
			setWeb3modalOpen(false)
			signToLogin()
		}
	}, [address])

	useEffect(() => {
		if (!signMessageData || !address || !variables?.message) return

		let utms = {}
		try {
			utms = JSON.parse(localStorage.utms)
		} catch {}

        Api.login({
            wallet  : address,
            msg     : String(variables.message), 
            sign    : signMessageData,
			host    : window.location?.host || document.documentURI?.split('/')?.[2],
            refcode : localStorage.refcode,
			utms    : utms
        }).then((profileInfo:any)=>{
			if (profileInfo.error) {
				console.log('Auth error', profileInfo.error)
				return
			}
			setProfile(profileInfo)

			sendGAEvent({event:'perfu_connect', conversionAddress:address })

			Api.postback({ status: 'lead' })
        }).catch(error => console.log(error))
	}, [signMessageData])


	useEffect(()=>{
		if (ready) (()=>{})
		const timeoutId = setTimeout(()=>{
			setReady(true)
		}, 1111)
		return () => clearTimeout(timeoutId);
	}, [])

	const {connected, setConnected} = useConnectedStore()
	const {account, setAccount} = useAccountStore()
	useEffect(()=>{
		if (!address) return
		setConnected(profile ? isConnected : false)
	}, [isConnected, address, profile])

	useEffect(()=>{
		if (!isConnected) return
		setAccount(profile ? (address || profile.wallet) : null)
	}, [address, profile, isConnected])

	
	return {
		isReady: ready,
		isConnected: connected, 
		account, address:account, 
		status, 
		connect, 
		chainId, 
		profile,
		disconnect: ()=>{
			disconnect(); close()
			clearLocalStorage()
			setTimeout(()=>{
				window.location.href = '/'
			}, 1111)
		}
	}
}