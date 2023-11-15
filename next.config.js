/** @type {import('next').NextConfig} */
const nextConfig = {
  reactDevOverlay: false,
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['assets.coingecko.com'],
  },
  eslint: { 
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack: config => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  }
}

module.exports = nextConfig
