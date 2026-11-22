import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Victor Okoukoni's story, how he works, his experience and skills.",
};

export default function AboutPage() {
  return (
    <div className="px-gutter py-section">
      <div className="mx-auto max-w-content space-y-6">
        <h1 className="text-3xl font-semibold">About</h1>
        <p className="max-w-prose text-lg text-muted">
          Victor&apos;s story, experience and skills will appear here.
        </p>
      </div>
    </div>
  );
}
