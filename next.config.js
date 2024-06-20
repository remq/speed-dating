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
      {
        protocol: "https",
        hostname: "speed-dating-blob.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
  sassOptions: {
    prependData: '@import "~/src/frontend/styles/imports.scss";',
  },
};

module.exports = nextConfig;
