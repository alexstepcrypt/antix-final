declare module 'number-currency-format' {
	interface FormatOptions {
		thousandSeparator?: string;
		decimalSeparator?: string;
		decimalsDigits?: string;
		showDecimals?: string;
	}
	
	export function format(value: number, options: FormatOptions): string;
}
