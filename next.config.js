/** @type {import('next').NextConfig} */

const nextConfig = {
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true,
    },
    images: {
        domains: [ "localhost"],
        formats: ["image/avif", "image/webp"],
    },
    // Other Next.js configuration options...
};

module.exports = nextConfig;
