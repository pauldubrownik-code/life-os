import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Use PORT env var from Render */
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
