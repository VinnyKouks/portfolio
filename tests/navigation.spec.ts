import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";

// Phones are tested with a tap, desktops with a mouse click
async function press(button: Locator, isMobile: boolean) {
  if (isMobile) {
    await button.tap();
  } else {
    await button.click();
  }
}

test("the menu opens, moves between pages and closes", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main" });
  const menuButton = nav.getByRole("button", { name: "Menu" });
  await expect(nav).toContainText("Current page: Home");

  await press(menuButton, isMobile);
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");

  await press(nav.getByRole("link", { name: "Work" }), isMobile);
  await expect(page).toHaveURL(/\/work$/);
  await expect(nav).toContainText("Current page: Work");
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
});

test("Escape closes the menu and returns focus to the menu button", async ({
  page,
}) => {
  await page.goto("/about");
  const menuButton = page.getByRole("button", { name: "Menu" });

  await menuButton.focus();
  await page.keyboard.press("Enter");
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");

  await page.keyboard.press("Escape");
  await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  await expect(menuButton).toBeFocused();
});

test("keyboard focus can't leave the open menu", async ({ page }) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main" });
  const menuButton = nav.getByRole("button", { name: "Menu" });

  await menuButton.focus();
  await page.keyboard.press("Enter");
  await expect(menuButton).toHaveAttribute("aria-expanded", "true");

  // More presses than there are links, so focus has to wrap round
  for (let i = 0; i < 15; i++) {
    await page.keyboard.press("Tab");
    await expect(nav.locator(":focus")).toHaveCount(1);
  }
});

// With reduced motion the menu opens instantly, so these tests see it fully
// open (an axe scan mid-animation would measure half-faded text)
test.describe("with reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("the open menu has no detectable accessibility issues", async ({
    page,
  }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main" });
    await nav.getByRole("button", { name: "Menu" }).click();
    await expect(nav.getByRole("link", { name: "Email me" })).toBeVisible();

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test("the menu opens without animating", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main" });
    await nav.getByRole("button", { name: "Menu" }).click();

    // No animation: the panel is fully open straight away
    const emailMe = nav.getByRole("link", { name: "Email me" });
    await expect(emailMe).toBeVisible({ timeout: 100 });
  });
});
