/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    images: {
      unoptimized: true,
    },
  },
  trailingSlash: true, // https://stackoverflow.com/a/44264855
};

module.exports = nextConfig;
