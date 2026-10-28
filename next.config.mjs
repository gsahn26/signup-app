/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: "export",
  basePath: "/signup-app",
  assetPrefix: "/signup-app/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
