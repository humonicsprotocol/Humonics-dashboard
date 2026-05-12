/** @type {import('next').NextConfig} */
const nextConfig = {
  // @humonics/sdk is ESM — transpile it for Next.js
  transpilePackages: ['@humonics/sdk'],
};

module.exports = nextConfig;
