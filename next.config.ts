import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Add the company's real image host(s) here once photography is supplied.
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        // Never index intermediate booking states or the confirmation page (contains a booking reference).
        source: "/boka/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
      {
        source: "/tack",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};

export default nextConfig;
