import { cacheLife } from "next/cache";
import Image from "next/image";
import { siGithub } from "simple-icons";

import { CopyEmailButton } from "@/components/ui/copy-email-button";
import { site } from "@/content/site";
import linkedinLogo from "@/assets/linkedin-in-black.png";

// The year for the copyright line. Pages are static, so this is worked out
// when the site is built and refreshed at least once a month after that.
async function getCurrentYear() {
  "use cache";
  cacheLife("max");
  return new Date().getFullYear();
}

export async function SiteFooter() {
  const year = await getCurrentYear();
  const [firstName, lastName] = site.name.split(" ");

  return (
    <footer
      id="contact"
      className="surface-orange px-gutter pt-section pb-nav-clearance"
    >
      <div className="mx-auto max-w-content">
        <div className="grid gap-12 md:grid-cols-2 md:items-end">
          <div className="space-y-5">
            <h2 className="text-2xl font-semibold">
              {site.callToAction.question}
            </h2>
            <p className="max-w-prose text-lg">{site.callToAction.line}</p>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex rounded-full bg-ink px-6 py-3 font-medium text-bone"
            >
              Email me
            </a>
          </div>

          <address className="space-y-2 not-italic md:justify-self-end md:text-right">
            <div className="flex flex-wrap items-center gap-3 md:justify-end">
              <a
                href={`mailto:${site.email}`}
                className="text-lg font-medium underline underline-offset-4"
              >
                {site.email}
              </a>
              <CopyEmailButton email={site.email} />
            </div>
            <p>{site.location}</p>
            <p>{site.availability}</p>
          </address>
        </div>

        {/* The name as a poster. Its size is the footer's width divided by the
            name's width in ems (measured in DM Sans at weight 1000), so it
            fills the width exactly at every screen size. Screen readers skip
            it: the name is already in the header and the copyright line. */}
        <div
          aria-hidden="true"
          data-testid="footer-name"
          className="@container mt-section"
        >
          <p className="text-[calc(100cqi/4.25)] leading-[0.85] font-[1000] tracking-[-0.04em] whitespace-nowrap sm:text-[calc(100cqi/7.1)]">
            <span className="block sm:inline">{firstName}</span>{" "}
            <span className="block sm:inline">{lastName}</span>
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-sm">
            © {year} {site.name}
          </p>
          <ul className="-mr-3 flex items-center">
            <li>
              <a
                href={site.socials.linkedin}
                aria-label="LinkedIn"
                className="grid size-11 place-items-center"
              >
                <Image
                  src={linkedinLogo}
                  alt=""
                  sizes="24px"
                  className="h-6 w-auto"
                />
              </a>
            </li>
            <li>
              <a
                href={site.socials.github}
                aria-label="GitHub"
                className="grid size-11 place-items-center"
              >
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="size-6"
                  fill="#000"
                >
                  <path d={siGithub.path} />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
