import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/static/covers/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/static/profile/**',
      },
            {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/static/UI/**',
      },
    ],
  },
};

export default nextConfig;
