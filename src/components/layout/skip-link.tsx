// Hidden until a keyboard user presses Tab, then appears top left.
// Lets them jump past the header straight to the page content.
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only rounded-full bg-action px-5 py-3 font-medium text-action-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
    >
      Skip to content
    </a>
  );
}
