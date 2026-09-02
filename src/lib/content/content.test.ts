import { describe, expect, it } from "vitest";

import {
  getArchiveProjects,
  getFeaturedProjects,
  getProject,
  projects,
  socials,
  site,
} from "./index";

function isAllowedHref(href: string) {
  return (
    href.startsWith("https://") ||
    href.startsWith("http://") ||
    href.startsWith("mailto:") ||
    href.startsWith("/")
  );
}

describe("project content", () => {
  it("has unique slugs", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("splits featured and archive without overlap", () => {
    const featured = getFeaturedProjects();
    const archive = getArchiveProjects();

    expect(featured.every((project) => project.featured)).toBe(true);
    expect(archive.every((project) => !project.featured)).toBe(true);
    expect(featured.length + archive.length).toBe(projects.length);
  });

  it("returns a project by slug", () => {
    expect(getProject("wicrypt")?.title).toBe("Wicrypt");
    expect(getProject("missing")).toBeUndefined();
  });

  it("uses http(s) or mailto for public links", () => {
    const hrefs = [
      site.resumeUrl,
      ...socials.map((item) => item.href),
      ...projects.flatMap((project) => project.links.map((link) => link.href)),
    ];

    expect(hrefs.every(isAllowedHref)).toBe(true);
  });
});
