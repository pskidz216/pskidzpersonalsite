import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/MothersDay", destination: "/MothersDay/index.html" },
    ];
  },
};

export default nextConfig;
