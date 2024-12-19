import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  experimental: {
    // ppr: 'incremental',
    // after: true
  },
  devIndicators: {
    appIsrStatus: true,
    buildActivityPosition: "bottom-right",
    buildActivity: true
  }
};

export default nextConfig;
