import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "app", // nama service di docker
        port: "4000",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
