# Victor Okoukoni, portfolio

Source code for the new portfolio of Victor Okoukoni, a frontend engineer in Lagos, Nigeria. It goes live at [victorokoukoni.vercel.app](https://victorokoukoni.vercel.app) at launch.

> Work in progress. This README will be completed before launch.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) and React 19
- TypeScript in strict mode
- Tailwind CSS v4
- Hosted on [Vercel](https://vercel.com)

## Getting started

You need Node.js 26 and pnpm 12.

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000.

## Scripts

| Command             | What it does                                |
| ------------------- | ------------------------------------------- |
| `pnpm dev`          | Start the development server                |
| `pnpm build`        | Build for production                        |
| `pnpm start`        | Serve the production build                  |
| `pnpm lint`         | Lint with ESLint                            |
| `pnpm lint:fix`     | Lint and fix what ESLint can fix by itself  |
| `pnpm typecheck`    | Check TypeScript types                      |
| `pnpm format`       | Format all files with Prettier              |
| `pnpm format:check` | Check formatting without changing files     |
| `pnpm check`        | Lint, type-check and format check in one go |

## Workflow

- One short-lived branch and pull request per section, squash-merged into `main`
- Commit messages follow [Conventional Commits](https://www.conventionalcommits.org), checked by commitlint
- Staged files are linted and formatted before each commit, by Husky and lint-staged

## License

The code is released under the [MIT License](LICENSE).

The written content, photos and other media on the site are not covered by that license. They are © Victor Okoukoni, all rights reserved.
