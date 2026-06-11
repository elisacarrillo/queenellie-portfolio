# Takes Page Design

**Date:** 2026-06-11

## Summary

A "Takes" page at `/takes` where short markdown-based opinions on tech and product are listed in reverse-chronological order. No individual take pages — everything lives on one scrollable page.

---

## Content Structure

Takes are stored as individual `.md` files in `content/takes/`. Each file has YAML frontmatter and a short markdown body:

```md
---
title: CSS-in-JS was never the problem
date: 2025-06-01
---

We confused styling tools with architecture decisions. CSS-in-JS was a symptom, not the cause.
```

**Frontmatter fields:**
- `title` — string, required
- `date` — ISO date string (YYYY-MM-DD), required

Body is short prose markdown — no images, no complex formatting expected.

---

## Data Layer

**File:** `content/takes.ts`

Exports a `getTakes()` function that:
1. Reads all `.md` files from `content/takes/`
2. Parses frontmatter with `gray-matter`
3. Converts markdown body to HTML with `remark` + `remark-html`
4. Returns an array sorted newest-first

**Type:**
```ts
export type Take = {
  slug: string;       // filename without extension
  title: string;
  date: string;       // formatted for display, e.g. "Jun 2025"
  contentHtml: string;
};
```

---

## Page

**File:** `app/takes/page.tsx`

- Static page (no `generateStaticParams` needed — single route)
- Calls `getTakes()` at build time
- Renders the editorial list layout

**Layout:**
- Page header: eyebrow ("Hot Takes") + Fraunces 500 title ("Takes") — matches work page header pattern
- Each take:
  - Date: `text-[9px] uppercase tracking-widest text-[#f0407a]`
  - Title: `font-fraunces font-medium italic text-[1.1rem] text-[#111]`
  - Body: `dangerouslySetInnerHTML` with the rendered HTML, `text-[13px] text-[#666] leading-relaxed`
  - Ruled separator between takes (`border-b border-[#ebebeb]`)
- Top border on first take, bottom border on each take
- Max width: `max-w-2xl` (narrower than the work grid — prose reads better constrained)
- Page padding: matches work page (`px-4 pb-20 pt-24 sm:px-8`)

---

## Dependencies

Add to `package.json`:
- `gray-matter` — frontmatter parsing
- `remark` — markdown processor
- `remark-html` — converts remark output to HTML string

---

## Files Created / Modified

| File | Action |
|---|---|
| `content/takes/` | New directory with at least one sample `.md` file |
| `content/takes.ts` | New — loader/parser |
| `app/takes/page.tsx` | New — page component |
| `package.json` | Modified — add 3 dependencies |

---

## Out of Scope

- Individual take detail pages
- Tags or filtering
- Search
- Pagination (all takes on one page)
- CMS or admin UI
