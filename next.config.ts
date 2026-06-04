import type { NextConfig } from "next";

const isExport = process.env.STATIC_EXPORT === 'true';

const nextConfig: NextConfig = {
  output: isExport ? 'export' : undefined,
  trailingSlash: isExport ? true : undefined,
  basePath: '/glamora-salon',
  images: {
    unoptimized: isExport,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
  async redirects() {
    if (isExport) return [];
    return [
      {
        source: '/',
        destination: '/glamora-salon/',
        basePath: false,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

