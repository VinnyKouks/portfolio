/*
 * Temporary page for checking the design tokens: the type scale, both
 * surfaces, and every text and background pairing we plan to use. The page
 * tests scan it with axe, so a pairing that fails contrast fails CI.
 * The real home page replaces it in a later pull request.
 */
export default function Home() {
  return (
    <div className="px-gutter py-section">
      <div className="mx-auto max-w-content space-y-16">
        <header className="space-y-6">
          <p className="font-mono text-label text-muted uppercase">
            Design tokens
          </p>
          <h1 className="max-w-[18ch] text-3xl font-semibold text-balance">
            Frontend engineer building interfaces that are precise and
            beautiful.
          </h1>
          <p className="max-w-prose text-lg text-muted">
            A temporary page for checking colours and type. It gets replaced as
            the real pages are built.
          </p>
        </header>

        <section aria-labelledby="type-scale" className="space-y-4">
          <h2 id="type-scale" className="text-2xl font-semibold">
            Type scale
          </h2>
          <p className="text-xl font-medium">
            Extra large: headings within a section
          </p>
          <p className="text-lg">Large: introductions and lead paragraphs</p>
          <p>Base: body text, where most of the reading happens</p>
          <p className="text-sm text-muted">
            Small: captions and secondary details
          </p>
          <p className="font-mono text-label uppercase">
            Label: navigation and menu
          </p>
        </section>

        <section aria-labelledby="on-dark" className="space-y-6">
          <h2 id="on-dark" className="text-2xl font-semibold">
            On dark
          </h2>
          <p className="max-w-prose text-muted">Secondary text on ink.</p>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="mailto:victorokoukoni@gmail.com"
              className="rounded-full bg-orange px-6 py-3 font-medium text-ink"
            >
              Email me
            </a>
            <a
              href="#on-light"
              className="text-accent underline underline-offset-4 hover:decoration-2"
            >
              A link on dark
            </a>
          </div>
          <div className="max-w-prose space-y-2 rounded-2xl bg-raised-ink p-6">
            <p className="font-medium">A card on raised ink</p>
            <p className="text-muted">
              Secondary text on raised ink. No small orange text here: it only
              passes at large sizes.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="on-light"
          className="space-y-6 rounded-3xl surface-light p-8"
        >
          <h2 id="on-light" className="text-2xl font-semibold">
            On light
          </h2>
          <p className="max-w-prose text-muted">Secondary text on bone.</p>
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="mailto:victorokoukoni@gmail.com"
              className="rounded-full bg-deep-orange px-6 py-3 font-medium text-bone"
            >
              Email me
            </a>
            <a
              href="#on-dark"
              className="text-accent underline underline-offset-4 hover:decoration-2"
            >
              A link on light
            </a>
          </div>
          <div className="max-w-prose space-y-2 rounded-2xl bg-raised-bone p-6">
            <p className="font-medium">A card on raised bone</p>
            <p className="text-muted">
              Secondary text on raised bone, with{" "}
              <a
                href="#type-scale"
                className="text-accent underline underline-offset-4"
              >
                a link
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
