import type { NextConfig } from 'next'

const STRAPI_URL = process.env.STRAPI_API_URL || 'http://localhost:1337'
const strapiHostname = new URL(STRAPI_URL).hostname

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https: http:",
      "media-src 'self' https:",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com",
      "frame-src 'self' https://www.google.com https://maps.google.com https://www.google.com/maps https://www.instagram.com https://instagram.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join('; '),
  },
]

const RNB_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
const STRAPI_INTERNAL_URL = process.env.STRAPI_INTERNAL_URL || 'http://localhost:1337'

const nextConfig: NextConfig = {
  basePath: RNB_BASE_PATH || undefined,
  trailingSlash: false,
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: strapiHostname,
        port: '',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: strapiHostname,
        port: '',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/rnb-clinic/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
        port: '3000',
        pathname: '/rnb-clinic/uploads/**',
      },
    ],
  },
  async rewrites() {
    const prefixedRoutes = RNB_BASE_PATH
      ? [
          { source: `${RNB_BASE_PATH}/admin/:path*`, destination: `${STRAPI_INTERNAL_URL}/admin/:path*` },
          { source: `${RNB_BASE_PATH}/api/:path*`, destination: `${STRAPI_INTERNAL_URL}/api/:path*` },
          { source: `${RNB_BASE_PATH}/uploads/:path*`, destination: `${STRAPI_INTERNAL_URL}/uploads/:path*` },
        ]
      : []

    return [
      ...prefixedRoutes,
      // Strapi admin XHR/asset endpoints that may be requested from absolute root paths
      { source: '/admin/:path*', destination: `${STRAPI_INTERNAL_URL}/admin/:path*` },
      { source: '/api/:path*', destination: `${STRAPI_INTERNAL_URL}/api/:path*` },
      { source: '/uploads/:path*', destination: `${STRAPI_INTERNAL_URL}/uploads/:path*` },
      { source: '/content-manager/:path*', destination: `${STRAPI_INTERNAL_URL}/content-manager/:path*` },
      { source: '/users-permissions/:path*', destination: `${STRAPI_INTERNAL_URL}/users-permissions/:path*` },
      { source: '/i18n/:path*', destination: `${STRAPI_INTERNAL_URL}/i18n/:path*` },
    ]
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
