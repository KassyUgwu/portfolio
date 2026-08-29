import type { MetadataRoute } from "next";

import { site } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.title,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F5F0E6",
    theme_color: "#7A2E28",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
