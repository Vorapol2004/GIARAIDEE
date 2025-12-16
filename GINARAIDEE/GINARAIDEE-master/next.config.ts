import type { NextConfig } from "next";

const nextConfig = {
    experimental: {
        allowedDevOrigins: ["http://localhost:3000", "http://192.168.1.234:3000"],
    },
};

export default nextConfig;
