# AGENTS.md

## Project Overview

This is a personal blog project built with Next.js 16, React 19, TypeScript, Tailwind CSS v4, and shadcn/ui.

This repository uses the shadcn `base-nova` style. Always inspect the local components in `src/components/ui/` because individual wrappers may use different primitives.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## shadcn skill

Use the shadcn skill for all work involving shadcn/ui components, styling, composition, registries, presets, or `components.json`.

If the skill is not available, install it with:

```bash
npx skills add shadcn/ui
```

The skill contains the component, styling, composition, accessibility, and CLI rules. Do not duplicate those rules here. Always inspect the local component source before using it.

Do not modify files inside `src/components/ui/`. Keep these components intact and apply styling or customization where they are used.

## Code conventions

- TypeScript strict mode is enabled. Use precise types and avoid `any`.
- Use the existing `@/` import aliases.
- Avoid unnecessary dependencies.
- Keep changes focused and do not refactor unrelated files.
