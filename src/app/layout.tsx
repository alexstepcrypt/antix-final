import { Poppins } from "next/font/google";
import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
    title: "Antix: Tokensale Platform",
    description: "Antix: Tokensale Platform",
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
            <body className={`${poppins.className}`}>{children}</body>
        </html>
    );
}
