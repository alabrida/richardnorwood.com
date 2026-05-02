import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/cms/:path*",
        destination: "https://paleturquoise-butterfly-387959.hostingersite.com/:path*",
      },
      {
        source: "/wp-admin/:path*",
        destination: "https://paleturquoise-butterfly-387959.hostingersite.com/wp-admin/:path*",
      },
      {
        source: "/wp-json/:path*",
        destination: "https://paleturquoise-butterfly-387959.hostingersite.com/wp-json/:path*",
      },
      {
        source: "/wp-content/:path*",
        destination: "https://paleturquoise-butterfly-387959.hostingersite.com/wp-content/:path*",
      },
      {
        source: "/wp-includes/:path*",
        destination: "https://paleturquoise-butterfly-387959.hostingersite.com/wp-includes/:path*",
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
