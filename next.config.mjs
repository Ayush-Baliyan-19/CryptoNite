/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname: "coin-images.coingecko.com",
            pathname: '/**',
        }],
    },
    reactStrictMode: false,
};

export default nextConfig;
