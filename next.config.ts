import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.ufs.sh',
        pathname: '/f/*'
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
        pathname: '/f/*'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**/*'
      },
      {
        protocol: 'https',
        hostname: '**.uploadthing.com',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
