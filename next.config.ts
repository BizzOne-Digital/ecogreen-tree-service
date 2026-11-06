import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Setting localPatterns restricts next/image to these same-origin paths.
    localPatterns: [{ pathname: "/api/uploads/**" }, { pathname: "/images/**" }],
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
