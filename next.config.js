/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "25478",
        pathname: "/files/**",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "/api/portraits/**",
      },
    ],
  },
  sassOptions: {
    prependData: '@import "~/src/frontend/styles/imports.scss";',
  },
};

module.exports = nextConfig;
