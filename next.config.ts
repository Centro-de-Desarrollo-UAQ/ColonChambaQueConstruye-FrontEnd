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
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'https://emplea-colon-back-afcg-production.up.railway.app/api/v1/:path*',
      },
    ];
  },
  // experimental: {
  //   serverComponentsExternalPackages: ["@react-pdf/renderer"],
  // },
  // // serverExternalPackages: ["@react-pdf/renderer"],
};

export default nextConfig;
