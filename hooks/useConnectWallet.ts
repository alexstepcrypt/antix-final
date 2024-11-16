import { useState, useEffect } from "react";
import {useChainId, useSignMessage, useDisconnect} from "wagmi";
import { useAppKit, useAppKitAccount} from '@reown/appkit/react'
import Api from "@/utils/api";

let getProfileReq:any = null
export const useConnectWallet = function () {
	const { open, close } = useAppKit()
	const { isConnected, status, address } = useAppKitAccount()
    const { disconnect } = useDisconnect()
	const chainId = useChainId()
	const [ profile, setProfile ] = useState({})
	const [ web3modalOpen, setWeb3modalOpen ] = useState(false)
	const { data: signMessageData, signMessage, variables } = useSignMessage()

	const checkAuth = () => {
        if (!address) return
		getProfileReq = getProfileReq || Api.getUserProfile()
		getProfileReq.then(setProfile).catch(() => {
            signToLogin()
        }).finally(()=>{
			getProfileReq = null
		})
	}
	useEffect(() => checkAuth(), [address])

	const signToLogin = () => {
        signMessage({message: 'I am signing in to Antix digital twins'})
	}

	const connect = () => {
		if (!address || !isConnected) {
			setWeb3modalOpen(true)
			open()
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
        }).then(profileInfo=>{
			setProfile(profileInfo)
        }).catch(error => console.log(error))
	}, [signMessageData])

	return { isConnected, status, connect, chainId, profile, address, account:address, 
		disconnect: ()=>{
			disconnect()
			close()
			localStorage.removeItem('authToken')
			setTimeout(()=>{
				window.location.href = '/'
			}, 1111)
		}
	}
}