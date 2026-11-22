import Link from "next/link";

import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="grid grid-cols-[1fr_auto_1fr] items-center px-gutter py-5">
      <Link href="/" className="col-start-2 font-medium">
        {site.name}
      </Link>
      {/* Hidden on phones: there, contact lives in the menu panel and the footer */}
      <a
        href="#contact"
        className="hidden justify-self-end text-sm font-medium underline-offset-4 hover:underline sm:block"
      >
        Get in touch
      </a>
    </header>
  );
}
