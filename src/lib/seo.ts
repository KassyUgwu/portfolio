import type { Metadata } from "next";

import { site, socials } from "@/lib/content";

export const githubUrl =
  socials.find((item) => item.label === "GitHub")?.href ?? site.url;

export const defaultOgImage = {
  url: site.ogImage,
  alt: `${site.name} portrait`,
  width: site.ogImageWidth,
  height: site.ogImageHeight,
} as const;

export const indexRobots: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

type OgImage = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
};

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "profile";
  keywords?: string[];
  images?: OgImage[];
  absoluteTitle?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  keywords,
  images,
  absoluteTitle = false,
}: PageMetaInput): Metadata {
  const ogImages = images ?? [defaultOgImage];

  const openGraph: Metadata["openGraph"] =
    type === "profile"
      ? {
          type: "profile",
          title,
          description,
          url: path,
          firstName: site.firstName,
          lastName: site.lastName,
          username: site.twitterHandle.replace(/^@/, ""),
          images: [...ogImages],
        }
      : {
          type,
          title,
          description,
          url: path,
          images: [...ogImages],
        };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: site.twitterHandle,
      creator: site.twitterHandle,
      images: ogImages.map((image) => image.url),
    },
  };
}

export function personJsonLd() {
  return {
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    givenName: site.firstName,
    familyName: site.lastName,
    jobTitle: "Frontend Engineer",
    url: site.url,
    email: `mailto:${site.email}`,
    image: `${site.url}${site.ogImage}`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "NG",
    },
    sameAs: socials.map((item) => item.href),
  };
}

export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: "en",
        publisher: { "@id": `${site.url}/#person` },
      },
      personJsonLd(),
      {
        "@type": "ProfilePage",
        "@id": `${site.url}/#profile`,
        url: site.url,
        name: site.title,
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": `${site.url}/#person` },
        mainEntity: { "@id": `${site.url}/#person` },
      },
    ],
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? site.url : `${site.url}${item.path}`,
    })),
  };
}

export function workJsonLd(project: {
  title: string;
  summary: string;
  slug: string;
  image?: { src: string };
}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personJsonLd(),
      {
        "@type": "CreativeWork",
        name: project.title,
        description: project.summary,
        url: `${site.url}/work/${project.slug}`,
        author: { "@id": `${site.url}/#person` },
        ...(project.image
          ? { image: `${site.url}${project.image.src}` }
          : {}),
      },
    ],
  };
}
