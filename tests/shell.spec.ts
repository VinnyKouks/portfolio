import { expect, test } from "@playwright/test";

test("the skip link is the first thing keyboard focus reaches", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");

  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();

  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
});

test("Get in touch jumps to the contact details", async ({
  page,
  isMobile,
}) => {
  await page.goto("/work");
  const getInTouch = page.locator("header").getByText("Get in touch");

  if (isMobile) {
    // Hidden on phones: contact is in the menu panel and the footer
    await expect(getInTouch).toBeHidden();
    return;
  }

  await getInTouch.click();

  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator("#contact")).toBeInViewport();
});

test("/cv redirects to the CV file", async ({ request }) => {
  const redirect = await request.get("/cv", { maxRedirects: 0 });
  expect(redirect.status()).toBe(307);
  expect(redirect.headers()["location"]).toBe("/victor-okoukoni-cv.pdf");

  const file = await request.get("/cv");
  expect(file.ok()).toBe(true);
  expect(file.headers()["content-type"]).toContain("application/pdf");
});

test("buttons show the hand cursor", async ({ page }) => {
  await page.goto("/");
  const buttons = [
    page.getByRole("button", { name: "Menu" }),
    page.getByRole("button", { name: "Copy email address" }),
  ];

  for (const button of buttons) {
    await expect(button).toHaveCSS("cursor", "pointer");
  }
});
