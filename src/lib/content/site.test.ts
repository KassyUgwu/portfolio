import { afterEach, describe, expect, it, vi } from "vitest";

import { pathIsActive, resolveSiteUrl } from "./site";

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("resolveSiteUrl", () => {
  it("prefers NEXT_PUBLIC_SITE_URL and strips a trailing slash", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://kassy.dev/");
    vi.stubEnv("VERCEL_URL", "ignored.vercel.app");
    expect(resolveSiteUrl()).toBe("https://kassy.dev");
  });

  it("falls back to the Vercel host", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_URL", "portfolio-abc.vercel.app");
    expect(resolveSiteUrl()).toBe("https://portfolio-abc.vercel.app");
  });

  it("falls back to localhost", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "");
    expect(resolveSiteUrl()).toBe("http://localhost:3000");
  });
});

describe("pathIsActive", () => {
  it("treats home as exact", () => {
    expect(pathIsActive("/", "/")).toBe(true);
    expect(pathIsActive("/work", "/")).toBe(false);
  });

  it("matches nested work routes", () => {
    expect(pathIsActive("/work", "/work")).toBe(true);
    expect(pathIsActive("/work/wicrypt", "/work")).toBe(true);
    expect(pathIsActive("/about", "/work")).toBe(false);
  });
});
