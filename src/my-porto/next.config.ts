import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // ubah ke https
        hostname: "fuadonetwo.my.id", // ubah ke domain Anda
        pathname: "/**",
      },
      // Untuk development/local
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/uploads/**",
      },
      // Untuk internal docker network
      {
        protocol: "http",
        hostname: "app",
        port: "4000",
        pathname: "/uploads/**",
      },
    ],
    unoptimized: true, // tambahkan ini untuk menghindari optimisasi Next.js
  },
};

export default nextConfig;
