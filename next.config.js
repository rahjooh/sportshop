/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    i18n: {
        locales: ['fa', 'en'],
        defaultLocale: 'fa',
        localeDetection: true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com'
            },
            {
                protocol: 'https',
                hostname: 'cdn.shopify.com'
            }
        ]
    }
};

module.exports = nextConfig;
