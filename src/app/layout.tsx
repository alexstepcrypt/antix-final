import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
    title: "Antix: Tokensale",
    description: "Antix: Tokensale",
    keywords: ["antix", "tokensale", "ico", "platform", "investment"],
    openGraph: {
        title: "Antix: Tokensale",
        description: "Antix: Tokensale",
        images: "",
        type: "website",
        url: "https://token.antix.in",
    }
};

const poppins = Poppins({
    subsets: ["latin"],
    display: "swap",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/svg/logo-small.svg" />
            </head>
            <body className={`${poppins.className}`}>{children}</body>
        </html>
    );
}
