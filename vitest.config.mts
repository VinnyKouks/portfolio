import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Lets tests use the "@/..." import alias defined in tsconfig.json
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    // Unit tests sit next to the code they test. Playwright's page tests
    // live in tests/ and run separately.
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
