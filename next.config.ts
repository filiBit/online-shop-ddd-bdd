import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn-images.italist.com",
                port: "",
                // pathname: "/account123/**",
                search: "",
            },
        ],
    },
};

export default nextConfig;
