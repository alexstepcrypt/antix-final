import withVideos from "next-videos";

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    transpilePackages: ['gsap'],
    output: 'export',
    images: {
        unoptimized: true, 
    },
    env: {
        // WALLET_CONNECT_ID: '27b55ee19b0f3a94b191600ee9d30cd5',
        WALLET_CONNECT_ID: 'd193e168fb88acc351bc3e4027699fa7',
        REFERRAL_LINK: 'https://token.antix.in/?refcode=',
        API_URL: 'https://antix.cryptoindex.com',
        // API_URL: 'http://localhost:3001',

        TOKENSALE_ETH: '0x35b8f67107b7C04Cef5a3ab92170ac16Ca61BEd6',
        TOKENSALE_BSC: ''
    },
};

export default withVideos({
    ...nextConfig,
});
