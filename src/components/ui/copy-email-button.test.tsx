import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { CopyEmailButton } from "./copy-email-button";

const email = "victorokoukoni@gmail.com";

describe("CopyEmailButton", () => {
  it("copies the email address", async () => {
    const user = userEvent.setup();
    render(<CopyEmailButton email={email} />);

    await user.click(
      screen.getByRole("button", { name: "Copy email address" }),
    );

    expect(await navigator.clipboard.readText()).toBe(email);
  });

  it("shows and announces that it copied", async () => {
    const user = userEvent.setup();
    render(<CopyEmailButton email={email} />);

    expect(screen.getByRole("status")).toBeEmptyDOMElement();
    await user.click(
      screen.getByRole("button", { name: "Copy email address" }),
    );

    expect(
      screen.getByRole("button", { name: "Copied email address" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Email address copied",
    );
  });
});
