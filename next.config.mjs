import withVideos from "next-videos";

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true, 
    },
    env: {
        CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
    },
};

export default withVideos({
    ...nextConfig,
});
