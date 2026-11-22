import { expect, test } from "@playwright/test";

const widths = [320, 375, 640, 768, 1280, 1920];

test.describe("the footer name", () => {
  // Each test sets its own screen width, so one browser setup is enough
  test.skip(({ isMobile }) => isMobile, "Covers every width on its own");

  for (const width of widths) {
    test(`fills the width at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await page.evaluate(() => document.fonts.ready);

      // Measure the letters themselves, from the left edge of "Victor" to
      // the right edge of the widest line, against the footer's width
      const { containerWidth, textWidth } = await page
        .getByTestId("footer-name")
        .evaluate((container) => {
          const rects = [...container.querySelectorAll("span")].map((span) => {
            const range = document.createRange();
            range.selectNodeContents(span);
            return range.getBoundingClientRect();
          });
          const left = Math.min(...rects.map((rect) => rect.left));
          const right = Math.max(...rects.map((rect) => rect.right));
          return {
            containerWidth: container.getBoundingClientRect().width,
            textWidth: right - left,
          };
        });

      const fill = textWidth / containerWidth;
      expect(fill).toBeGreaterThan(0.97);
      expect(fill).toBeLessThanOrEqual(1.005);

      // And nothing spills past the edge of the screen
      const overflows = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
      expect(overflows).toBe(false);
    });
  }
});

test("copying the email address is confirmed", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  const footer = page.locator("#contact");

  await footer.getByRole("button", { name: "Copy email address" }).click();

  await expect(footer.getByRole("status")).toHaveText("Email address copied");
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toBe("victorokoukoni@gmail.com");
});
