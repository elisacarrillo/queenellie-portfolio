# /built Page Design

**Date:** 2026-06-11  
**Status:** Approved

## Overview

A living "cool things I built" page at `/built` showcasing personal side projects, tools, and skills. Distinct from `/work` (professional case studies) — this is personal, experimental, and grows over time.

## Data Model

Each project is a `.md` file in `content/built/`. Frontmatter holds all structured fields; markdown body is the write-up, parsed to HTML.

```markdown
---
title: grind.lc
category: website          # website | tool | skill
tags: [Next.js, TypeScript, Tailwind]
link: https://doaleetcode.vercel.app
screenshot: /built/grind-lc.png   # optional
featured: true                      # at most one item; if none, first item is featured
---

Short write-up as markdown.
```

`content/built.ts` exports a `getBuilt()` async function that reads all `.md` files from `content/built/`, parses frontmatter + markdown body to HTML, and returns items sorted with the featured item first.

## Initial Content

**`content/built/grind-lc.md`**
- title: grind.lc
- category: website
- tags: Next.js, TypeScript
- link: https://doaleetcode.vercel.app
- featured: true
- write-up: pattern-based algorithm learning platform

**`content/built/golden-rule-verification.md`**
- title: golden-rule-verification
- category: skill
- tags: Claude Code
- link: GitHub URL
- featured: false
- write-up: Claude Code skill that enforces verifying behavior at the running app surface

## Page Layout — Bento Grid

`app/built/page.tsx` renders:

1. **Page header** — eyebrow ("Side Projects & Tools"), h1 "Cool things I built"
2. **Bento grid** — 2-column grid, 12px gap:
   - Featured item spans full width (`grid-column: 1 / -1`): write-up left, screenshot right (pink gradient placeholder if no screenshot)
   - Remaining items fill the 2-column grid as regular cards
   - If remaining count is odd, the last cell shows a dashed "more coming soon" placeholder

## Card Design

**Featured card:**
- Left: category tag (pink), tech stack tags (grey), title in Fraunces italic, write-up, external link
- Right: screenshot image, or pink gradient placeholder

**Regular card:**
- Category tag, tech stack tags, title in Fraunces italic, write-up, external link
- No image

**Shared elements:**
- Border: `1.5px solid #ebebeb`, `border-radius: 10px`
- Category tag: `#fff0f5` background, `#f0407a` text
- Tech tags: `#f5f5f5` background, `#666` text
- Title: Fraunces italic, `1.05rem`, `#111`
- Write-up: `12px`, `#666`, `line-height: 1.65`
- Link: `10px` uppercase pink with `↗`

## Components

- `components/BuiltCard.tsx` — accepts a `built` item and a `featured` boolean prop; renders the appropriate variant
- `app/built/page.tsx` — calls `getBuilt()`, separates featured from rest, renders bento grid

## What's Not In Scope

- No individual detail pages (no `/built/[slug]`) — all content is readable inline
- No filtering or sorting UI
- No pagination (not needed until the list is very long)
