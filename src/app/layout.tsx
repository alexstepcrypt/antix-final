import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import "./globals.scss";
import MetaMaskClientProvider from "@/components/MetaMaskClientProvider/MetaMaskClientProvider";

export const metadata: Metadata = {
    metadataBase: new URL("https://token.antix.in"),
    title: "Antix: Tokensale",
    description: "Antix: Tokensale platform for ICO and investment",
    keywords: ["antix", "tokensale", "ico", "platform", "investment"],
    openGraph: {
        title: "Antix: Tokensale",
        description: "Antix: Tokensale",
    },
    icons: {
        icon: [
            { rel: "icon", type: "image/x-icon", url: "/favicon.ico" },
            {
                rel: "icon",
                type: "image/png",
                sizes: "32x32",
                url: "/favicon-32x32.png",
            },
            {
                rel: "icon",
                type: "image/png",
                sizes: "16x16",
                url: "/favicon-16x16.png",
            },
            {
                rel: "icon",
                type: "image/png",
                sizes: "192x192",
                url: "/android-chrome-192x192.png",
            },
            {
                rel: "icon",
                type: "image/png",
                sizes: "512x512",
                url: "/android-chrome-512x512.png",
            },
        ],
        apple: "/apple-touch-icon.png",
        other: [{ rel: "manifest", url: "/site.webmanifest" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Antix: Tokensale",
        description: "Antix: Tokensale",
        images: "https://token.antix.in/og-1.png",
        site: "@antix_in",
    },
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
    const host =
        typeof window !== "undefined" ? window.location.host : "defaultHost";

    const sdkOptions = {
        logging: { developerMode: false },
        checkInstallationImmediately: false,
        dappMetadata: {
            name: "Next-Metamask-Boilerplate",
            url: host,
        },
    };

    return (
        <html lang="en">
            <head>
                <meta
                    property="og:image"
                    content="https://token.antix.in/og.png"
                />
                <meta
                    property="og:image"
                    content="https://token.antix.in/og-1.png"
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://token.antix.in" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="canonical" href="https://token.antix.in" />
            </head>
            <body className={`${poppins.className}`}>
                <MetaMaskClientProvider>{children}</MetaMaskClientProvider>
            </body>
        </html>
    );
}
