import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const origin = process.env.WP_ORIGIN_URL || "https://origin.richardnorwood.com";
    return [
      {
        source: "/cms/:path*",
        destination: `${origin}/:path*`,
      },
      {
        source: "/wp-admin/:path*",
        destination: `${origin}/wp-admin/:path*`,
      },
      {
        source: "/wp-json/:path*",
        destination: `${origin}/wp-json/:path*`,
      },
      {
        source: "/wp-content/:path*",
        destination: `${origin}/wp-content/:path*`,
      },
      {
        source: "/wp-includes/:path*",
        destination: `${origin}/wp-includes/:path*`,
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
