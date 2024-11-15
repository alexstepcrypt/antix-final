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
        WALLET_CONNECT_ID: '27b55ee19b0f3a94b191600ee9d30cd5',
        REFERRAL_LINK: 'https://token.antix.in/?refcode=',
        API_URL: 'https://antix.cryptoindex.com'
        // API_URL: 'http://localhost:3001'
    },
};

export default withVideos({
    ...nextConfig,
});
