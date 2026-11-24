import { expect, test } from "@playwright/test";

test("the portrait is the first image to load", async ({ page }) => {
  await page.goto("/");
  const portrait = page.getByRole("img", { name: "Victor Okoukoni" });

  // The browser fetches it first, ahead of scripts and other images, and
  // it's the largest thing painted when the page loads
  await expect(portrait).toHaveAttribute("fetchpriority", "high");
  await expect(portrait).toHaveAttribute("loading", "eager");
  // The browser reports a new "largest paint" each time something bigger
  // appears. Wait (up to 5 seconds) for the portrait to become the largest.
  const largestElement = await page.evaluate(
    () =>
      new Promise<string | undefined>((resolve) => {
        let largest: string | undefined;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as (PerformanceEntry & {
            element?: Element;
          })[]) {
            largest =
              entry.element?.getAttribute("alt") ?? entry.element?.tagName;
          }
          if (largest === "Victor Okoukoni") resolve(largest);
        }).observe({ type: "largest-contentful-paint", buffered: true });
        setTimeout(() => resolve(largest), 5000);
      }),
  );
  expect(largestElement).toBe("Victor Okoukoni");
});

test("the headline sits clear of the navigation bar", async ({ page }) => {
  await page.goto("/");
  const headline = page.getByRole("heading", { level: 1 });
  const nav = page.getByRole("navigation", { name: "Main" });

  const headlineBox = await headline.boundingBox();
  const navBox = await nav.locator("> div").boundingBox();
  if (!headlineBox || !navBox) {
    throw new Error("The headline or the navigation bar isn't on screen");
  }
  expect(headlineBox.y + headlineBox.height).toBeLessThanOrEqual(navBox.y);
  await expect(headline).toBeInViewport({ ratio: 1 });
});
