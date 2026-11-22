import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import { MotionGlobalConfig } from "motion/react";

// Animations finish instantly in unit tests, so tests don't wait on them
MotionGlobalConfig.skipAnimations = true;

// Remove whatever each test rendered, so tests can't affect each other
afterEach(() => {
  cleanup();
});
