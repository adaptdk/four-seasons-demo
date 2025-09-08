/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: `images.ctfassets.net`,
        protocol: `https`,
      },
    ],
  },
};
