import { create } from "zustand"
import { useState, useEffect } from "react";
import {useChainId, useSignMessage, useDisconnect} from "wagmi";
import { useAppKit, useAppKitAccount} from '@reown/appkit/react'
import Api from "@/utils/api";

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

export const useConnectWallet = function () {
	const { open, close } = useAppKit()
	const { isConnected, status, address } = useAppKitAccount()
    const { disconnect } = useDisconnect()
	const chainId = useChainId()
	const { profile, setProfile } = useProfileStore()
	const [ web3modalOpen, setWeb3modalOpen ] = useState(false)
	const { data: signMessageData, signMessage, variables, error: signError } = useSignMessage()
	const [ ready, setReady ] = useState(isConnected || !!status || !!profile)

	const checkAuth = () => {
        if (!address || !Api.hasAuthToken()) return
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
			disconnect(); close()
		}
	}, [signError])

	const connect = () => {
		if (!address || !isConnected) {
			disconnect()
			close()
			setTimeout(()=>{
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
        Api.login({
            wallet  : address, 
            msg     : String(variables.message), 
            sign    : signMessageData,
            refcode : localStorage.refcode
        }).then((profileInfo:any)=>{
			if (profileInfo.error) {
				console.log('Auth error', profileInfo.error)
				return
			}
			setProfile(profileInfo)
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
			localStorage.removeItem('authToken')
			setTimeout(()=>{
				window.location.href = '/'
			}, 1111)
		}
	}
}