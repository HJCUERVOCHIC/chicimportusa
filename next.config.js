/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimización de imágenes
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 días
  },

  // Headers de seguridad y caché
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        // Caché para assets estáticos
        source: '/img/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Redirecciones
  async redirects() {
    return [
      {
        source: '/drops-publicados',
        destination: '/publicaciones',
        permanent: true,
      },
      {
        source: '/drops',
        destination: '/publicaciones',
        permanent: true,
      },
    ]
  },

  // Compresión
  compress: true,

  // Optimizaciones de producción
  poweredByHeader: false,
  reactStrictMode: true,

  // Experimental
  experimental: {
    optimizePackageImports: ['@sanity/image-url', '@portabletext/react'],
  },
}

module.exports = nextConfig
