import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Home from "./page";

// In the real build, importing an image gives Next.js its size and a blurred
// preview. Unit tests don't run that step, so give them the same shape.
vi.mock("@/assets/hero-placeholder.png", () => ({
  default: {
    src: "/hero-placeholder.png",
    width: 1024,
    height: 1536,
    blurDataURL: "data:image/png;base64,iVBORw0KGgo=",
  },
}));

describe("Home page", () => {
  it("leads with the headline as the page's main heading", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Frontend engineer building interfaces that are precise and beautiful.",
    );
  });

  it("shows Victor's portrait with a text alternative", () => {
    render(<Home />);

    expect(screen.getByRole("img", { name: "Victor Okoukoni" })).toBeVisible();
  });
});
