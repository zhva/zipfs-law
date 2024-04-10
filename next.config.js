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
    exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
        return {
          '/': { page: '/' },
          '/dashboard': { page: '/dashboard' },
        }
    }

};

module.exports = nextConfig;
