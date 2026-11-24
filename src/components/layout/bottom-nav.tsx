"use client";

import { AnimatePresence, LazyMotion, m, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { cvLink, currentPage, pages } from "@/content/navigation";
import { site } from "@/content/site";

const FOCUSABLE = "a[href], button:not([disabled])";
const EASE_OUT_SOFT = [0.22, 1, 0.36, 1] as const; // same curve as --ease-out-soft

// Load the animation features separately, after the page (see motion-features.ts)
const loadMotionFeatures = () =>
  import("./motion-features").then((module) => module.default);

export function BottomNav() {
  const pathname = usePathname();
  const current = currentPage(pathname);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const panelId = useId();

  const rootRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  // While the menu is open: the rest of the page can't be focused, clicked,
  // read by screen readers or scrolled; Escape closes the menu; and Tab
  // cycles through the menu instead of leaving it.
  useEffect(() => {
    const root = rootRef.current;
    const nav = navRef.current;
    if (!open || !root || !nav) return;

    const outside = Array.from(document.body.children).filter(
      (element) => !element.contains(root),
    );
    outside.forEach((element) => element.setAttribute("inert", ""));

    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = Array.from(
        nav.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      outside.forEach((element) => element.removeAttribute("inert"));
      html.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  // Visitors who ask their device for less motion get an instant change
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: EASE_OUT_SOFT };

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <div ref={rootRef}>
        <AnimatePresence>
          {open && (
            <m.div
              key="backdrop"
              aria-hidden="true"
              className="fixed inset-0 z-40 bg-ink/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
              onClick={close}
            />
          )}
        </AnimatePresence>

        <nav
          ref={navRef}
          aria-label="Main"
          className="fixed inset-x-0 bottom-0 z-50 px-gutter pb-[max(1rem,env(safe-area-inset-bottom))]"
        >
          <div className="mx-auto max-w-md overflow-hidden rounded-3xl border border-bone/10 bg-raised-ink">
            <AnimatePresence initial={false}>
              {open && (
                <m.div
                  key="panel"
                  id={panelId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={transition}
                >
                  <div className="space-y-8 px-6 pt-8 pb-4">
                    <ul>
                      {pages.map((page) => {
                        const isCurrent = page.href === current?.href;
                        return (
                          <li key={page.href}>
                            <Link
                              href={page.href}
                              aria-current={isCurrent ? "page" : undefined}
                              onClick={() => setOpen(false)}
                              className="flex items-center gap-3 py-1 text-2xl font-semibold"
                            >
                              {page.label}
                              {isCurrent && (
                                <span
                                  aria-hidden="true"
                                  className="size-2 rounded-full bg-orange"
                                />
                              )}
                            </Link>
                          </li>
                        );
                      })}
                      <li>
                        <a
                          href={cvLink.href}
                          onClick={() => setOpen(false)}
                          className="flex items-center py-1 text-2xl font-semibold"
                        >
                          {cvLink.label}
                        </a>
                      </li>
                    </ul>

                    <ul className="space-y-2 text-sm">
                      <li>
                        <a
                          href={`mailto:${site.email}`}
                          className="underline-offset-4 hover:underline"
                        >
                          {site.email}
                        </a>
                      </li>
                      <li>
                        <a
                          href={site.socials.linkedin}
                          className="underline-offset-4 hover:underline"
                        >
                          LinkedIn
                        </a>
                      </li>
                      <li>
                        <a
                          href={site.socials.github}
                          className="underline-offset-4 hover:underline"
                        >
                          GitHub
                        </a>
                      </li>
                    </ul>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <p className="text-sm text-muted">{site.availability}</p>
                      <a
                        href={`mailto:${site.email}`}
                        className="rounded-full bg-orange px-5 py-2.5 font-medium text-ink"
                      >
                        Email me
                      </a>
                    </div>
                  </div>
                </m.div>
              )}
            </AnimatePresence>

            <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center px-6">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="justify-self-start font-semibold"
              >
                VO<span className="sr-only">, Victor Okoukoni, home</span>
              </Link>

              {current && (
                <p className="font-mono text-label uppercase">
                  <span className="sr-only">Current page: </span>
                  {current.label}
                </p>
              )}

              <button
                ref={buttonRef}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => (open ? close() : setOpen(true))}
                className="col-start-3 -mr-3 grid size-11 place-items-center justify-self-end"
              >
                <span className="sr-only">Menu</span>
                <span aria-hidden="true" className="relative block h-3 w-5">
                  <span
                    className={`absolute top-1/2 left-0 -mt-px h-0.5 w-5 bg-current transition-transform duration-300 ease-out-soft ${open ? "rotate-45" : "-translate-y-1"}`}
                  />
                  <span
                    className={`absolute top-1/2 left-0 -mt-px h-0.5 w-5 bg-current transition-transform duration-300 ease-out-soft ${open ? "-rotate-45" : "translate-y-1"}`}
                  />
                </span>
              </button>
            </div>
          </div>
        </nav>
      </div>
    </LazyMotion>
  );
}
