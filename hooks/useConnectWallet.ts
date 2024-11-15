import { useState, useEffect } from "react";
import {useAccount, useChainId, useSignMessage, useDisconnect} from "wagmi";
import {useWeb3Modal} from "@web3modal/wagmi/react";
import Api from "@/utils/api";

export const useConnectWallet = function () {
	const { open } = useWeb3Modal()
    const { disconnect } = useDisconnect()
	const { address } = useAccount()
	const chainId = useChainId()
	const [ profile, setProfile ] = useState({})
	const [ web3modalOpen, setWeb3modalOpen ] = useState(false)
	const { data: signMessageData, signMessage, variables } = useSignMessage()

	const checkAuth = () => {
        if (!address) return
		Api.getUserProfile().then(res => {
			setProfile(res)
        }).catch(() => {
            signToLogin()
        })
	}
	useEffect(() => checkAuth(), [address])

	const signToLogin = () => {
        signMessage({message: 'I am signing in to Antix digital twins'})
	}

	const connect = () => {
		if (!address) {
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

	return { connect, chainId, profile, address, account:address, disconnect: ()=>{
		disconnect()
		localStorage.removeItem('authToken')
	}}
}