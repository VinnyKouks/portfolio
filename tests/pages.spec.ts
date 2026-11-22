import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = [
  { path: "/", name: "Home" },
  { path: "/work", name: "Work" },
  { path: "/about", name: "About" },
];

for (const { path, name } of pages) {
  test.describe(`${name} page`, () => {
    test("loads with a main heading", async ({ page }) => {
      await page.goto(path);

      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });

    test("has no detectable accessibility issues", async ({ page }) => {
      await page.goto(path);

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();

      expect(results.violations).toEqual([]);
    });
  });
}
