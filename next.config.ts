import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const isPreview = process.env.VERCEL_ENV === "preview";

const robotsHeader = {
  key: "X-Robots-Tag",
  value: isPreview
    ? "noindex, nofollow"
    : "index, follow, max-image-preview:large",
};

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [...securityHeaders, robotsHeader],
      },
    ];
  },
};

export default nextConfig;
