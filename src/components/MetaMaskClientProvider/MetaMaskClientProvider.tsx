"use client";

import { MetaMaskProvider } from "@metamask/sdk-react";
import React from "react";

export default function MetaMaskClientProvider({
    children,
}: {
    children: React.ReactNode;
}) {
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
        <MetaMaskProvider sdkOptions={sdkOptions}>{children}</MetaMaskProvider>
    );
}
