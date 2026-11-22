import { site } from "@/content/site";

// Placeholder: the full footer arrives in pull request 7. It already has
// id="contact", so "Get in touch" has somewhere to jump to.
export function SiteFooter() {
  return (
    <footer id="contact" className="px-gutter py-section">
      <div className="mx-auto max-w-content space-y-3">
        <h2 className="text-2xl font-semibold">Get in touch</h2>
        <a
          href={`mailto:${site.email}`}
          className="text-lg text-accent underline underline-offset-4"
        >
          {site.email}
        </a>
      </div>
    </footer>
  );
}
