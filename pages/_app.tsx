import "./globals.scss";
import type {AppProps} from "next/app";
import { useEffect } from "react";
import Web3ModalProvider from "@/utils/Web3ModalProvider";
import Head from 'next/head'
import { Poppins } from "next/font/google";
import { useIsomorphicLayoutEffect } from "react-use";
import {useRouter} from "next/router";


const poppins = Poppins({
	subsets: ["latin"],
	display: "swap",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})
  
export default function App({Component, pageProps: { session, ...pageProps }}: AppProps) {
	const {query} = useRouter()

	useIsomorphicLayoutEffect(() => {
		document.body.style.setProperty("--font-family", poppins.style.fontFamily);
		document.body.className = poppins.className
	}, []);

	// запоминаем рефку по которой впервые пришел пользователь
	useEffect(()=>{
		const refcode = query?.refcode
		if (!refcode || typeof window === 'undefined') return
		if (!localStorage.refcode) return
		localStorage.refcode = refcode
	}, [query])

	return <>
		<Head>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
		</Head>
		<Web3ModalProvider>
			<Component {...pageProps} />
		</Web3ModalProvider>
	</>
}
