import withVideos from "next-videos";

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true, 
    },
};

export default withVideos({
    ...nextConfig,
});
