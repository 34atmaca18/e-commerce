// next.config.js

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack: (config) => {
    config.cache = {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
    };

    return config;
  },
  images: {
    domains: ['images.pexels.com'],
  },

};

module.exports = nextConfig;
