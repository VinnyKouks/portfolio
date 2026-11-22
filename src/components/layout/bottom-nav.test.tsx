import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { BottomNav } from "./bottom-nav";

// Pretend we're on a given page. Each test can change the path.
const location = vi.hoisted(() => ({ pathname: "/work" }));
vi.mock("next/navigation", () => ({
  usePathname: () => location.pathname,
}));

function renderNav() {
  const user = userEvent.setup();
  render(<BottomNav />);
  const nav = screen.getByRole("navigation", { name: "Main" });
  const menuButton = screen.getByRole("button", { name: "Menu" });
  return { user, nav, menuButton };
}

describe("BottomNav", () => {
  beforeEach(() => {
    location.pathname = "/work";
  });

  it("shows the current page in the bar", () => {
    const { nav } = renderNav();

    expect(nav).toHaveTextContent("Current page: Work");
  });

  it("counts a case study as the Work page", () => {
    location.pathname = "/work/some-project";
    const { nav } = renderNav();

    expect(nav).toHaveTextContent("Current page: Work");
  });

  it("starts closed", () => {
    const { menuButton } = renderNav();

    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByRole("link", { name: "About" }),
    ).not.toBeInTheDocument();
  });

  it("opens the menu and marks the current page", async () => {
    const { user, menuButton } = renderNav();

    await user.click(menuButton);

    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: "Work" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "About" })).not.toHaveAttribute(
      "aria-current",
    );
    expect(screen.getByRole("link", { name: "CV" })).toHaveAttribute(
      "href",
      "/cv",
    );
    expect(screen.getByRole("link", { name: "Email me" })).toHaveAttribute(
      "href",
      "mailto:victorokoukoni@gmail.com",
    );
  });

  it("closes on Escape and returns focus to the menu button", async () => {
    const { user, menuButton } = renderNav();

    await user.click(menuButton);
    await user.keyboard("{Escape}");

    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(menuButton).toHaveFocus();
    await waitFor(() => {
      expect(
        screen.queryByRole("link", { name: "About" }),
      ).not.toBeInTheDocument();
    });
  });

  it("keeps keyboard focus inside the open menu", async () => {
    const { user, menuButton } = renderNav();

    await user.click(menuButton);
    // The menu button is the last item, so Tab wraps round to the first link
    await user.tab();
    expect(screen.getByRole("link", { name: "Home" })).toHaveFocus();

    // And Shift+Tab from the first link wraps back to the menu button
    await user.tab({ shift: true });
    expect(menuButton).toHaveFocus();
  });

  it("makes the rest of the page inert while open", async () => {
    const outside = document.createElement("main");
    document.body.prepend(outside);
    const { user, menuButton } = renderNav();

    await user.click(menuButton);
    expect(outside).toHaveAttribute("inert");

    await user.keyboard("{Escape}");
    expect(outside).not.toHaveAttribute("inert");
    outside.remove();
  });
});
