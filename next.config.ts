import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/cms/:path*",
        destination: "http://212.1.212.41/:path*",
      },
      {
        source: "/wp-admin/:path*",
        destination: "http://212.1.212.41/cms/wp-admin/:path*",
      },
      {
        source: "/wp-json/:path*",
        destination: "http://212.1.212.41/cms/wp-json/:path*",
      },
      {
        source: "/wp-content/:path*",
        destination: "http://212.1.212.41/cms/wp-content/:path*",
      },
      {
        source: "/wp-includes/:path*",
        destination: "http://212.1.212.41/cms/wp-includes/:path*",
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
