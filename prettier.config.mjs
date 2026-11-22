/**
 * Prettier formats the code. The Tailwind plugin sorts class names
 * into Tailwind's recommended order.
 *
 * @type {import("prettier").Config & import("prettier-plugin-tailwindcss").PluginOptions}
 */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  // Tailwind v4 has no tailwind.config.js. The plugin reads the theme
  // from the CSS entry file instead (path relative to this file).
  tailwindStylesheet: "./src/app/globals.css",
};

export default config;
