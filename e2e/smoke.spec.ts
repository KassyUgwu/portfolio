import { expect, test } from "@playwright/test";
import { projects } from "../src/lib/content/projects";

test("home returns 200 and the main heading", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole("heading", { level: 1, name: /people actually use/i }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeAttached();
});

test("home featured work is one link per project", async ({ page }) => {
  await page.goto("/");
  const featured = page.getByRole("link", { name: /read the case study$/i });
  await expect(featured).toHaveCount(5);
  const moreWorkLinks = page.getByRole("link", { name: "View more work" });
  await expect(moreWorkLinks).toHaveCount(2);
  await expect(moreWorkLinks.last()).toHaveAttribute("href", "/work");
});

test("work and about pages load", async ({ page }) => {
  const work = await page.goto("/work");
  expect(work?.status()).toBe(200);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /from the public site to the screens behind it/i,
    }),
  ).toBeVisible();

  const about = await page.goto("/about");
  expect(about?.status()).toBe(200);
  await expect(
    page.getByRole("heading", { level: 1, name: /kasie ugwu/i }),
  ).toBeVisible();
});

test("resume has a readable HTML version and a PDF download", async ({ page }) => {
  const response = await page.goto("/resume");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1, name: "Ugwu Kasie" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Experience" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Download PDF" })).toHaveAttribute("href", "/kasie-ugwu-cv.pdf");
});

test("a case study renders and unknown slugs 404", async ({ page }) => {
  const wicrypt = await page.goto("/work/wicrypt");
  expect(wicrypt?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1, name: "Wicrypt" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Website" })).toBeVisible();

  const missing = await page.goto("/work/not-a-real-project");
  expect(missing?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("here");
});

test("theme toggle updates color-scheme", async ({ page }) => {
  await page.goto("/");
  const toggle = page.getByRole("button", { name: /switch to (dark|light) theme/i });
  await expect(toggle).toBeEnabled();
  const before = await page.locator("html").evaluate((el) =>
    getComputedStyle(el).colorScheme,
  );
  await toggle.click();
  await expect
    .poll(async () =>
      page.locator("html").evaluate((el) => getComputedStyle(el).colorScheme),
    )
    .not.toBe(before);
});

test("mobile menu marks Work as the current page on a case study", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/work/wicrypt");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("navigation", { name: "Mobile" }).getByRole("link", { name: "Work" })).toHaveAttribute(
    "aria-current",
    "page",
  );
});

test("home content remains visible without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto("/");
    await page.waitForTimeout(2700);
    await expect(
      page.getByRole("heading", { level: 1, name: /people actually use/i }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Things I’ve shipped." })).toBeVisible();
  } finally {
    await context.close();
  }
});

test("mobile navigation works without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  try {
    const page = await context.newPage();
    await page.goto("/");
    const nav = page.getByRole("navigation", {
      name: "Primary navigation without JavaScript",
    });
    await expect(page.getByRole("button", { name: "Open menu" })).toBeHidden();
    await expect(nav.getByRole("link", { name: "Work" })).toBeVisible();
    await nav.getByRole("link", { name: "Work" }).click();
    await expect(page).toHaveURL(/\/work$/);
  } finally {
    await context.close();
  }
});

test("keyboard can skip to content and dismiss the mobile menu", async ({ page, browserName }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.keyboard.press(browserName === "webkit" ? "Alt+Tab" : "Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main#main")).toBeFocused();

  const menu = page.getByRole("button", { name: "Open menu" });
  await menu.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("navigation", { name: "Mobile" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
});

test("work stays readable and navigable when project images fail", async ({ page }) => {
  await page.route("**/*", async (route) => {
    if (route.request().resourceType() === "image") {
      await route.abort();
    } else {
      await route.continue();
    }
  });
  await page.goto("/work");
  const project = page.getByRole("link", { name: /OHealth\+ — read the case study/ });
  await expect(project).toBeVisible();
  await project.click();
  await expect(page.getByRole("heading", { level: 1, name: "OHealth+" })).toBeVisible();
});

test("main routes have no automated accessibility violations", async ({ page }) => {
  test.setTimeout(120_000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const colorScheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme });
    for (const path of ["/", "/work", ...projects.map(({ slug }) => `/work/${slug}`), "/about", "/resume", "/work/missing"]) {
      await page.goto(path);
      if (colorScheme === "dark") await expect(page.locator("html")).toHaveClass(/dark/);
      await page.addScriptTag({ path: "node_modules/axe-core/axe.min.js" });
      const violations = await page.evaluate(async () => {
        const axe = (window as unknown as { axe: { run: () => Promise<{ violations: { id: string; nodes: { target: string[] }[] }[] }> } }).axe;
        return (await axe.run()).violations.map(({ id, nodes }) => ({
          id,
          targets: nodes.map(({ target }) => target),
        }));
      });
      expect(violations, `accessibility violations on ${path} in ${colorScheme} theme`).toEqual([]);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.addScriptTag({ path: "node_modules/axe-core/axe.min.js" });
    const menuViolations = await page.evaluate(async () => {
      const axe = (window as unknown as { axe: { run: () => Promise<{ violations: { id: string; nodes: { target: string[] }[] }[] }> } }).axe;
      return (await axe.run()).violations.map(({ id, nodes }) => ({
        id,
        targets: nodes.map(({ target }) => target),
      }));
    });
    expect(menuViolations, `mobile menu violations in ${colorScheme} theme`).toEqual([]);
    await page.keyboard.press("Escape");
  }
});

test("layout contains long project content and enlarged text", async ({ page }) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 800 });
    for (const path of ["/", "/work", "/work/ohealth", "/about", "/resume"]) {
      await page.goto(path);
      await page.evaluate(() => {
        const heading = document.querySelector("h1");
        if (heading) heading.textContent = "AnExceptionallyLongUnbrokenProjectTitle".repeat(4);
        document.documentElement.style.fontSize = "200%";
      });

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      if (overflow > 1) {
        const offenders = await page.evaluate(() =>
          [...document.querySelectorAll("body *")]
            .filter((element) => element.getBoundingClientRect().right > window.innerWidth + 1)
            .slice(0, 8)
            .map((element) => `${element.tagName.toLowerCase()}.${element.className || ""}: ${Math.round(element.getBoundingClientRect().right)}`),
        );
        const internal = await page.evaluate(() => [...document.querySelectorAll("body *")].filter((element) => element.scrollWidth > element.clientWidth + 1).slice(0, 12).map((element) => `${element.tagName.toLowerCase()}.${element.className || ""}: ${element.scrollWidth}/${element.clientWidth}`));
        const dimensions = await page.evaluate(() => ({html: document.documentElement.scrollWidth, body: document.body.scrollWidth, inner: window.innerWidth, client: document.documentElement.clientWidth}));
        expect(overflow, `horizontal overflow on ${path} at ${width}px: ${offenders.join(" | ")} internal: ${internal.join(" | ")} dimensions: ${JSON.stringify(dimensions)}`).toBeLessThanOrEqual(1);
      }
    }
  }
});

test("text spacing can be enlarged without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  for (const path of ["/", "/work", "/work/ohealth", "/about", "/resume"]) {
    await page.goto(path);
    await page.addStyleTag({ content: `
      body { letter-spacing: 0.12em !important; word-spacing: 0.16em !important; }
      p { line-height: 1.5 !important; }
      p + p { margin-top: 2em !important; }
    ` });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow, `text spacing overflow on ${path}`).toBeLessThanOrEqual(1);
  }
});
