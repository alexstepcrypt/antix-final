import { useState, useEffect } from "react";
import {useChainId, useSignMessage, useDisconnect} from "wagmi";
import { useAppKit, useAppKitAccount} from '@reown/appkit/react'
import Api from "@/utils/api";

export const useConnectWallet = function () {
	const [connected, setConnected] = useState(false)
	const [account, setAccount] = useState<any>(null)

	const { open, close } = useAppKit()
	const { isConnected, status, address } = useAppKitAccount()
    const { disconnect } = useDisconnect()
	const chainId = useChainId()
	const [ profile, setProfile ] = useState<any>(null)
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

	useEffect(()=>{
		if (!address) return
		// console.log('setConnected', profile ? isConnected : false)
		setConnected(profile ? isConnected : false)
	}, [isConnected, address, profile])

	useEffect(()=>{
		if (!isConnected) return
		// console.log('setAccount', profile ? (address || profile.wallet) : null)
		setAccount(profile ? (address || profile.wallet) : null)
	}, [address, profile, isConnected])

	return {
		isReady: ready,
		isConnected: isConnected, 
		account:address, address, 
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