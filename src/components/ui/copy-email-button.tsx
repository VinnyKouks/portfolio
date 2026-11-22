"use client";

import { useEffect, useRef, useState } from "react";

type Status = "idle" | "copied" | "failed";

// Copies the email address in one click. The visible label changes to
// "Copied", and a hidden status message tells screen reader users too.
export function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Don't leave a timer running if the button disappears
  useEffect(() => () => clearTimeout(resetTimer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setStatus("idle"), 2000);
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label={
          status === "copied" ? "Copied email address" : "Copy email address"
        }
        className="rounded-full border border-current px-4 py-1.5 text-sm font-medium"
      >
        {status === "copied" ? "Copied" : "Copy"}
      </button>
      <span role="status" className="sr-only">
        {status === "copied" && "Email address copied"}
        {status === "failed" && `Couldn't copy. The address is ${email}`}
      </span>
    </>
  );
}
