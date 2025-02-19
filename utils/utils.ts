import { format } from "number-currency-format";

export function isMobile () {
	if (typeof navigator === 'undefined') return false
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
    return regex.test(navigator.userAgent)
}

export function isIos () {
    const regex = /iPhone|iPad|iPod/i
    return regex.test(navigator.userAgent)
}

export default function numberFormat(num: number, thousandSeparator = " ", decimalSeparator = ",", decimalsDigits = "2", showDecimals = "IF_NEEDED"): string {
	return format(num, {
		thousandSeparator,
		decimalSeparator,
		decimalsDigits,
		showDecimals,
	});
}

export function formatFiat(num:any){
	if (!Number(num || 0)) return numberFormat(0)
	return numberFormat(num, " ", ".", "2", "IF_NEEDED")
}

export function formatCrypto(amount:any){
	if (!Number(amount || 0)) return 0

	let [integer, decimals] = String(amount).split('.')
	decimals = decimals || '00'
	if (integer.length > 1000) {
		amount = integer
	} else if (integer === '0'){
		amount = '0.'+decimals.substring(0, 6)
	} else {
		amount = integer+'.'+decimals.substring(0, 2)
	}

	amount = numberFormat(amount, " ", ".")

	if (Number(amount)===0){
		amount = '0.'+decimals.substring(0, 1+decimals.split('').findIndex(i => i !== '0'))
	}

	return amount
}

export function toFixed(numStr:string, decimals=2, spaces=false):string {
	const matchedPortion = String(numStr).match(
		new RegExp(String.raw`^-?\d+(?:\.\d{0,${decimals}})?`, "g")
	);

	let truncated = String(matchedPortion ? Number(matchedPortion[0]) : numStr);
	if (spaces) {
		truncated = numberFormat(Number(truncated), " ", ".")
	}
	if (truncated.split(".").length === 1) {
		truncated = truncated + '.' + "0".repeat(decimals);
	}

	return truncated
}


export const formatAddress = (address: string) => {
    if (!address) return "";
    const start = address.slice(0, 6);
    const end = address.slice(-4);
    return `${start}…..${end}`;
};


export const explorerUrls: {[key: number]: string} = {
	1    : 'https://etherscan.io',
	56   : 'https://bscscan.com',
	8453 : 'https://basescan.org/'
}


export const sendGAEvent = (opts:any) => {
	if (typeof window === 'undefined') return
	if (!['presale.antix.in','tokensale.antix.in','token.antix.in'].includes(window.location.host)) return
	window.dataLayer?.push(opts)
}

export const sendGA4Event = (eventName:string) => {
	sendGAEvent({
		'event': 'GA4_event',
		'event_name': eventName
	});
}
export const sendSocialGAEvent = (platform:string) => {
	sendGA4Event('social_'+ platform)
}

