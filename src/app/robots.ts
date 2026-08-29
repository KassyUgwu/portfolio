import type { MetadataRoute } from "next";

import { site } from "@/lib/content";

const isPreview = process.env.VERCEL_ENV === "preview";

export default function robots(): MetadataRoute.Robots {
  if (isPreview) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url.replace(/^https?:\/\//, ""),
  };
}
