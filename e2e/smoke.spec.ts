import { expect, test } from "@playwright/test";

test("home returns 200 and the main heading", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole("heading", { level: 1, name: /people actually touch/i }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeAttached();
});

test("home featured work is one link per project", async ({ page }) => {
  await page.goto("/");
  const featured = page.getByRole("link", { name: /read the case study$/i });
  await expect(featured).toHaveCount(4);
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
