import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
    metadataBase: new URL("https://token.antix.in"),
    title: "Antix: Tokensale",
    description: "Antix: Tokensale platform for ICO and investment",
    keywords: ["antix", "tokensale", "ico", "platform", "investment"],
    openGraph: {
        title: "Antix: Tokensale",
        description: "Antix: Tokensale",
        images: [
            {
                url: "/Open Graph.png",
                width: 1200,
                height: 630,
                alt: "Antix Tokensale Preview Rectangular",
            },
            {
                url: "/Open Graph-1.png",
                width: 800,
                height: 800,
                alt: "Antix Tokensale Preview Square",
            },
        ],
        type: "website",
        url: "token.antix.in",
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
        images: ["/Open Graph-1.png"],
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
    return (
        <html lang="en">
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="canonical" href="https://token.antix.in" />
            </head>
            <body className={`${poppins.className}`}>{children}</body>
        </html>
    );
}
