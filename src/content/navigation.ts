// The site's pages, in menu order. Adding a page to the menu means adding it here.
export const pages = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
] as const;

// The CV is a file, not a page, so it isn't part of "current page" matching
export const cvLink = { href: "/cv", label: "CV" } as const;

// Which page a URL belongs to. Case studies (/work/...) count as Work.
export function currentPage(pathname: string) {
  return pages.find((page) =>
    page.href === "/"
      ? pathname === "/"
      : pathname === page.href || pathname.startsWith(`${page.href}/`),
  );
}
