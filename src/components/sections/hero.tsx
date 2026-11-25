import Image from "next/image";

import heroPortrait from "@/assets/hero-placeholder.png";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[calc(100svh-var(--spacing-header))] flex-col items-center justify-end overflow-hidden bg-background px-gutter pb-nav-clearance sm:min-h-[max(calc(100svh-var(--spacing-header)),36rem)]"
    >
      {/*
        The portrait. On phones it spans the full width, nudged up slightly so
        the face stays clear of the headline. From 640px wide it fills the hero's
        height, centred, with ink on either side.
        mix-blend-lighten keeps whichever is lighter, the photo or the ink
        behind it, so the photo's near-black background becomes exactly our
        ink and its edges disappear. The bottom fades out under the headline.
      */}
      <div className="absolute inset-x-0 top-0 -z-10 aspect-2/3 translate-y-[-8%] mask-b-from-60% mix-blend-lighten sm:inset-x-auto sm:inset-y-0 sm:left-1/2 sm:h-full sm:-translate-x-1/2 sm:translate-y-0">
        <Image
          src={heroPortrait}
          alt="Victor Okoukoni"
          fill
          loading="eager"
          fetchPriority="high"
          placeholder="blur"
          sizes="(min-width: 640px) 67vh, 100vw"
          className="object-cover"
        />
      </div>

      <h1
        id="hero-heading"
        className="max-w-[36ch] text-center text-2xl font-semibold text-balance"
      >
        {site.headline}
      </h1>
    </section>
  );
}
