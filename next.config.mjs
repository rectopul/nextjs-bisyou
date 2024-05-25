/** @type {import('next').NextConfig} */

const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.shopify.com",
            },
            {
                protocol: "https",
                hostname: "placehold.co",
            },
            {
                protocol: "https",
                hostname: "nextjs-bisyou.vercel.app",
            },
            {
                protocol: "https",
                hostname: "img.youtube.com",
            },
        ],
    },
};

export default nextConfig;
