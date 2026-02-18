# Ghost Link — AI Coding Guide

## Project Overview
Ghost Link is a **Next.js 16 web application** simulating a decentralized human-robot labor relay marketplace. Operators remotely control robotic avatars to perform physical tasks and earn crypto yields in real time.

## Tech Stack
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript + TSX
- **Styling**: Vanilla CSS (inline styles + global CSS variables in `app/globals.css`)
- **Package Manager**: pnpm
- **Deployment**: Vercel (`https://ghostlink.work/`)

## Project Structure
```
app/
  globals.css          # Design system: CSS variables, utility classes, animations
  layout.tsx           # Root layout with metadata and font imports
  page.tsx             # Landing page (Hero, Stats, Live Jobs, Global Node Map)
  components/
    Navbar.tsx         # Shared navigation bar
    Footer.tsx         # Shared footer
  marketplace/page.tsx # Job listings with filters and JACK IN button
  dashboard/page.tsx   # Operator dashboard with earnings and proficiency matrix
  leaderboard/page.tsx # Global operator rankings
  wallet/page.tsx      # Rewards, balance, and hardware staking
  vr/page.tsx          # Full-screen VR interface with live telemetry HUD
```

## Design System
All design tokens are defined in `app/globals.css`:
- **Background**: `#080c14` (deep navy)
- **Accent**: `#00e5ff` (cyan)
- **Success**: `#10b981` (green)
- **Warning**: `#f59e0b` (amber)
- **Danger**: `#ef4444` (red)
- **Card bg**: `#0d1420`
- **Border**: `#1e2d45`

### Key CSS Classes
- `.card` — dark card with border
- `.glow-cyan` — cyan glow box-shadow
- `.btn-primary` — cyan filled button
- `.btn-secondary` — outlined button
- `.btn-jack` — purple gradient "Jack In" CTA
- `.badge`, `.badge-cyan`, `.badge-green`, `.badge-orange`, `.badge-red`, `.badge-purple` — status badges
- `.mono` — monospace font for data values
- `.grid-bg` — dot-grid background pattern

## Token System
- **CRED** — task payment credits
- **ROBO** — robot staking token
- **LABR** — labor yield token

## Dev Commands
```bash
pnpm dev      # Start dev server (localhost:3000)
pnpm build    # Production build
pnpm start    # Serve production build
vercel --prod # Deploy to Vercel
```

## Key Conventions
- All pages use `'use client'` directive (client-side rendering)
- Inline styles are used extensively for component-level styling
- Mock/static data is defined at the top of each page file
- No external UI libraries — pure CSS and inline styles only
- Animations use CSS `@keyframes` defined in `globals.css` or `<style jsx>`
