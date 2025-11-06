import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  /* config options here */
  images: {
    domains: ['example.com', 'yourcdn.com', 'res.cloudinary.com', 'localhost'],
  },
};

export default nextConfig;
