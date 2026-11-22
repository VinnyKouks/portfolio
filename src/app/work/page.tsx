import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description: "Projects and case studies by Victor Okoukoni.",
};

export default function WorkPage() {
  return (
    <div className="px-gutter py-section">
      <div className="mx-auto max-w-content space-y-6">
        <h1 className="text-3xl font-semibold">Work</h1>
        <p className="max-w-prose text-lg text-muted">
          Projects and case studies will appear here.
        </p>
      </div>
    </div>
  );
}
