/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "plus.unsplash.com",
      "images.unsplash.com",
      "cdn.pixabay.com",
      "api.pexels.com",
      "images.pexels.com",
    ],
  },
};

module.exports = nextConfig;
