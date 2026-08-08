# Contributing to Ghost Link

We are designing the interface for a job that does not exist yet. There is no
spec, no incumbent, and no one more qualified than you. That is the whole
premise — so the bar for contributing is deliberately low.

## Five minutes to a pull request

```bash
git clone https://github.com/EtainClub/ghost-link.git
cd ghost-link
pnpm install
pnpm dev          # http://localhost:3000
```

Open any file in `app/`, change something, and open a PR. Really.

- Every page is a single file. `app/marketplace/page.tsx` *is* the marketplace.
- Mock data lives at the top of each page file. Edit it freely.
- No backend, no database, no auth. Visuals are the product.
- Vibe-coded output is welcome. Point your AI at a page and ask for something
  wilder than what is there.

## What we actually want

**Screens that this world implies and we have not built.** A dispute panel. A
consent flow for a shell working in someone's home. A shift-handover between two
operators. An incident review. Open a
[screen proposal](https://github.com/EtainClub/ghost-link/issues/new/choose) or
just build it.

**Roleplay issues.** File a bug as if it happened in 2041. There is a
[template](https://github.com/EtainClub/ghost-link/issues/new/choose) with fields
for operator ID and latency. The interesting field is *"what the interface should
have done"* — that is the design work.

**Arguments.** The landing page has a Utopia/Dystopia toggle because both
readings of this future are honest. If you think we are romanticising or
catastrophising, say so in an issue and change the copy.

## House rules

**Every number on this site is invented, and the site says so.** The
`SPECULATIVE PROTOTYPE` banner is not decoration — it is what makes the fiction
safe to build. Do not add anything that would work as a real solicitation:

- no wallet connection that actually connects to anything
- no token sale, presale, waitlist, or airdrop mechanics
- no claim that the company, protocol or hardware exists
- no impersonation of a real company or person

The one page that must be true is `/contributors` — it reads real people from
the GitHub API. When GitHub is down it shows nothing rather than inventing
someone.

## Conventions

Match what is already there rather than introducing a new stack.

- **Next.js 16 App Router**, TypeScript, `'use client'` on interactive pages
- **Inline styles** for component styling, with design tokens from
  `app/globals.css` (`--accent-cyan`, `--bg-card`, `--nav-h`, …)
- Utility classes from `globals.css` — `.card`, `.btn-primary`, `.btn-jack`,
  `.badge-*`, `.mono`
- **Keep the reset inside `@layer base`.** Tailwind v4 puts utilities in
  `@layer utilities`, and an unlayered declaration beats every layer — so
  hoisting `* { margin: 0; padding: 0 }` out of its layer silently kills every
  `p-*` and `m-*` class in the project. This was a real bug here; see
  `docs/CONCEPT-IMPROVEMENT.md` §1.6a.
- Tailwind v4 centres with the individual `translate` property, not `transform`.
  To override `-translate-y-1/2`, remove the class rather than fighting it in CSS.

Before opening a PR:

```bash
pnpm build        # must pass
pnpm lint         # do not add new errors
```

The repo has pre-existing lint errors. Leave them at least no worse than you
found them.

## Where the thinking is written down

`docs/CONCEPT-IMPROVEMENT.md` holds the current diagnosis of what the site
communicates badly and a prioritised plan. If you disagree with it, that
disagreement is itself a good first issue.
