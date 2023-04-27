/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["plus.unsplash.com", "images.unsplash.com"],
  },
};

module.exports = nextConfig;
