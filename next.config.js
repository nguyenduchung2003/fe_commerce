/** @type {import('next').NextConfig} */
const nextConfig = {
    // webpack(config) {
    //     config.infrastructureLogging = { debug: /PackFileCache/ }
    //     return config
    // },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.dummyjson.com",
            },
            {
                protocol: "http",
                hostname: "localhost",
            },
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
            },
            {
                protocol: "https",
                hostname: "storage.googleapis.com",
            },
        ],
    },
}

module.exports = nextConfig
