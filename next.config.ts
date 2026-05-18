import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/thecuppingfarmer",
  env: {
    NEXT_PUBLIC_BASE_PATH: "/thecuppingfarmer",
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
