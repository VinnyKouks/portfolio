import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  async redirects() {
    return [
      {
        // A short, stable link to share. If the file name ever changes,
        // only this line does.
        source: "/cv",
        destination: "/victor-okoukoni-cv.pdf",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
