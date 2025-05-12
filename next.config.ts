import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google profile pictures
        pathname: "/**", // allow all paths
      },
    ],
  },
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Adjust this based on your needs
    },
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb", // Increase for server actions if needed
    },
  },
};

export default nextConfig;