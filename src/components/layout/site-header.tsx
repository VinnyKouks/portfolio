import Link from "next/link";

import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="grid grid-cols-[1fr_auto_1fr] items-center px-gutter py-5">
      <Link href="/" className="col-start-2 font-medium">
        {site.name}
      </Link>
      <a
        href="#contact"
        className="justify-self-end text-sm font-medium underline-offset-4 hover:underline"
      >
        Get in touch
      </a>
    </header>
  );
}
