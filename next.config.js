/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tnwfnox2s2ov4nyj.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
  sassOptions: {
    prependData: '@import "~/src/frontend/styles/imports.scss";',
  },
};

module.exports = nextConfig;
