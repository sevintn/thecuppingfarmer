import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/thecuppingfarmer",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
