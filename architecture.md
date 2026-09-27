# Architecture

Tech decisions and design tokens. **Owned by a human.** The agent reads this before writing
UI or data code and must not change a decision here without asking. Each decision records
who made it and when, so a later reader knows it was deliberate.

## Decisions

| Area                         | Decision                                                                             | Decided by / date  |
| ---------------------------- | ------------------------------------------------------------------------------------ | ------------------ |
| Framework                    | Vite 8 + React 19 + TypeScript 6 (strict)                                            | starter default    |
| Styling                      | Tailwind CSS 4                                                                       | arafat, 2026-09-28 |
| UI component library         | shadcn/ui (base-lyra on Base UI, Phosphor icons; primitives in `src/components/ui/`) | arafat, 2026-09-28 |
| Server state / data fetching | RTK Query (fixed rule, see CLAUDE.md)                                                | starter default    |
| Client / UI state            | Zustand (fixed rule)                                                                 | starter default    |
| Forms + validation           | React Hook Form + Zod (fixed rule)                                                   | starter default    |
| Routing                      | React Router 7, lazy route per page                                                  | starter default    |
| Config / env                 | `VITE_*` validated by Zod in `src/lib/env.ts`                                        | starter default    |
| Auth transport               | Bearer token, held in memory (Zustand)                                               | starter default    |
| Quality floors               | Coverage ≥80% lines; ≤180 kB gzip per JS chunk                                       | starter default    |

Replace "starter default" with a name and date when your team confirms or changes a row.

## API contract

| Domain | Source                                                                                                                    | Case (CLAUDE.md)   | Mocked? |
| ------ | ------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------- |
| books  | Zod schemas in `src/features/books/schema.ts` (to be written by `/feature`); storage (backend vs localStorage) still open | 3 — frontend-first | MSW     |

When a real backend ships, record its base URL and who owns the contract on that side.

| Environment | `VITE_API_URL`          | Owner |
| ----------- | ----------------------- | ----- |
| local       | `/api` (mocks or proxy) |       |
| staging     | _unset_                 |       |
| production  | _unset_                 |       |

## Design (Claude Design)

| Artifact       | Link                                                |
| -------------- | --------------------------------------------------- |
| Design System  | <https://claude.ai/artifact/QSR18u2Nb43tMqRMkgFkJf> |
| Project canvas | <https://claude.ai/artifact/LH5bPhi8E3mx4bntBG6wdg> |

Breakpoints designed for: mobile 390, desktop 1280.
The repo copy of what's built lives in `design/` — see CLAUDE.md → UI design.

## Design tokens

Tokens come from the Design System above and flow into the `@theme` block in `src/styles/index.css` (Tailwind 4). Never hand-copy values into
components.

| Token        | Light                   | Dark                   | Notes                                              |
| ------------ | ----------------------- | ---------------------- | -------------------------------------------------- |
| paper        | `oklch(0.985 0.008 85)` | `oklch(0.18 0.012 60)` | page background (`bg-background` / `bg-paper`)     |
| card         | `oklch(1 0 0)`          | `oklch(0.22 0.014 60)` | book rows, form, dialogs                           |
| ink          | `oklch(0.22 0.02 60)`   | `oklch(0.95 0.01 85)`  | text                                               |
| ink-muted    | `oklch(0.48 0.02 60)`   | `oklch(0.74 0.015 80)` | author, helper text                                |
| line         | `oklch(0.88 0.012 80)`  | `oklch(0.34 0.014 60)` | hairlines (decorative)                             |
| field-border | `oklch(0.62 0.015 70)`  | `oklch(0.54 0.015 70)` | input outlines, ≥3:1                               |
| primary      | `oklch(0.45 0.09 160)`  | `oklch(0.74 0.11 160)` | library green: action, selected filter, focus      |
| primary-soft | `oklch(0.94 0.03 160)`  | `oklch(0.3 0.05 160)`  | Finished chip background                           |
| reading      | `oklch(0.47 0.11 70)`   | `oklch(0.8 0.12 75)`   | Reading chip text (amber)                          |
| reading-soft | `oklch(0.95 0.05 85)`   | `oklch(0.3 0.05 70)`   | Reading chip background                            |
| want-soft    | `oklch(0.93 0.01 80)`   | `oklch(0.28 0.012 60)` | Want to read chip background                       |
| danger       | `oklch(0.52 0.18 27)`   | `oklch(0.7 0.17 25)`   | errors, Remove                                     |
| font.display | Fraunces (Google Fonts) |                        | page title, headings, book titles (`font-display`) |
| font.body    | Inter (Google Fonts)    |                        | everything else (`font-sans`)                      |
| radius.base  | 8px (`--radius`)        |                        | sm 4px chips · md 8px buttons/cards · full pills   |
| spacing      | 4px base                |                        | gutter 16px mobile / 24px desktop                  |

## Open decisions

Things the team hasn't settled yet. The agent asks about these instead of picking one.

- Hosting / preview deploys (docs assume Vercel; nothing is wired yet). Whatever host is
  chosen must serve `index.html` for unknown paths (SPA fallback) or deep links will 404.
- Token refresh: `src/services/baseQuery.ts` signs out on 401; refresh-and-retry needs the
  backend's refresh endpoint.
- Error monitoring (e.g. Sentry) — `RouteError` logs to the console only.
