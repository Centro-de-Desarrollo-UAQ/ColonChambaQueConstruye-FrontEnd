import type { NextConfig } from 'next';
/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
      },
    ],
  },
  // experimental: {
  //   serverComponentsExternalPackages: ["@react-pdf/renderer"],
  // },
  // // serverExternalPackages: ["@react-pdf/renderer"],
};

export default nextConfig;
