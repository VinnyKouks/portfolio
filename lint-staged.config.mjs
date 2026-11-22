/**
 * Runs before each commit, on the staged files only.
 * Fixes what it can; stops the commit if a problem can't be fixed.
 *
 * @type {import("lint-staged").Configuration}
 */
const config = {
  "*.{js,mjs,cjs,ts,tsx}": [
    "eslint --fix --no-warn-ignored",
    "prettier --write",
  ],
  "*.{json,md,mdx,css,yml,yaml}": "prettier --write",
};

export default config;
