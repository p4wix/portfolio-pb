import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.60"],
  images: {
    qualities: [75, 95],
  },
};

export default nextConfig;
