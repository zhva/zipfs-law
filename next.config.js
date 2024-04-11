/** @type {import('next').NextConfig} */

const nextConfig = {
    compiler: {
        // Enables the styled-components SWC transform
        styledComponents: true,
    },
    images: {
        formats: ["image/avif", "image/webp"],
    },
};

module.exports = nextConfig;

