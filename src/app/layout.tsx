import type { Metadata, Viewport } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import { BottomNav } from "@/components/layout/bottom-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";

import "@/styles/globals.css";

// Fonts are downloaded at build time and served from this site. Their fallback
// fonts are adjusted to the same size, so text doesn't jump when they load.
const dmSans = DM_Sans({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-dm-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

// Every page must be fully static. The build fails if anything would need
// rendering per request.
export const ensureStatic = "navigation";

export const metadata: Metadata = {
  title: {
    default: "Victor Okoukoni · Frontend engineer",
    template: "%s · Victor Okoukoni",
  },
  description:
    "Frontend engineer in Lagos, Nigeria, building interfaces that are precise and beautiful.",
  applicationName: "Victor Okoukoni",
  authors: [{ name: "Victor Okoukoni" }],
  creator: "Victor Okoukoni",
};

export const viewport: Viewport = {
  themeColor: "#111110", // ink: colours the browser bar on phones
  colorScheme: "dark",
  // Let the page use the whole screen on phones with a notch or home bar;
  // the env(safe-area-inset-*) values keep content clear of them
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${geistMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="surface-dark pb-nav-clearance text-base antialiased">
        <SkipLink />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <BottomNav />
      </body>
    </html>
  );
}
