import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // 10 files × 5MB each worst case — adjust as needed
    },
  },
  allowedDevOrigins: ['172.16.156.107']
};
export default nextConfig;
