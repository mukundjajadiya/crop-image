/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: true,
  },
  images: {
    unoptimized: true, // For static export if needed
  },
  // Enable static export for deployment
  output: "export",
  trailingSlash: true,
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Custom webpack config if needed
  webpack: (config, { dev, isServer }) => {
    // Optimize for production
    if (!dev && !isServer) {
      config.optimization.splitChunks.chunks = "all";
    }
    return config;
  },
  // Environment variables
  env: {
    NEXT_PUBLIC_GA_ID: "G-2CWQH0QFZW",
  },
};

module.exports = nextConfig;
