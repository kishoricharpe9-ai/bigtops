const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images.pexels.com', pathname: '/**' },
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
    ],
  },
  async redirects() {
    return [
      { source: '/projects', destination: '/project', permanent: true },
      { source: '/projects/:slug*', destination: '/project/:slug*', permanent: true },
      { source: '/service', destination: '/services', permanent: true },
      { source: '/service/:slug*', destination: '/services/:slug*', permanent: true },
      { source: '/team', destination: '/about', permanent: true },
    ];
  },
  outputFileTracingRoot: path.join(__dirname),
};

module.exports = nextConfig;
