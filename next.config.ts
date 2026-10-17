import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A lockfile exists in a parent folder; pin tracing to this project.
  outputFileTracingRoot: process.cwd(),
  images: {
    formats: ["image/avif", "image/webp"],
    // Temporary photography source. Replace with official DAMA assets in /public when available.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  async redirects() {
    return [{ source: "/", destination: "/en", permanent: false }];
  },
};

export default nextConfig;
