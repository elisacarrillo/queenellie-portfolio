# Landing Page Redesign — Queenellie Portfolio

**Date:** 2026-05-23  
**Reference:** Figma mockup provided by user

---

## Overview

Redesign the homepage landing page to match the provided Figma. The core visual direction: hot pink hero with a full-bleed portrait photo on the left, large gothic blackletter "Queenellie" wordmark on the right, inline stats and tagline, dark nav with "Elisa Carrillo" branding, and an updated footer with social icons.

---

## 1. Nav (`components/Nav.tsx`)

**Changes:**
- Logo text: "Elisa Carrillo" (bold Syne) replacing "Portfolio"
- "lets talk :)" button: `bg-[#111]` with white text (was pink `bg-[#f0407a]`)
- Homepage (at top, not scrolled): transparent background, **dark text** (`text-[#111]`)
- Scrolled / inner pages: white background, dark text (no change from current behavior, just color flip)

**Why:** The Figma nav sits on top of the pink hero with dark/black text, giving a clean high-contrast look. The dark CTA button differentiates from the pink background.

---

## 2. Hero (`components/Hero.tsx`)

**Layout:** Full viewport height (`100vh`), pink background (`#f0407a`), `overflow-hidden`.

**Photo (left column):**
- `position: absolute`, flush to left edge, full height
- Width: ~42vw on desktop, hidden or 100% overlay (behind content) on mobile
- `object-fit: cover`, `object-position: top center`
- Source: `/photo.jpg` (existing asset)

**Content (right side, ~58% width, vertically centered):**
1. "Queenellie" heading — `UnifrakturMaguntia` blackletter font (replace `Great_Vibes`), dark `#111` color, `clamp(80px, 14vw, 180px)`, full bleed right
2. Stats row:
   - `375M+` / Users Reached
   - `+1.89%` / View Time
   - `+$40K` / Raised
   - Layout: horizontal flex, evenly spaced, stat value bold ~2rem, label small muted
3. Tagline: "building things that spark joy, invoke creativity, and empower community" — dark, ~1.6rem, centered/right-aligned, below stats

**Font change:** Remove `Great_Vibes` import from `layout.tsx`, add `UnifrakturMaguntia`. Update `--font-queenellie-display` CSS variable.

**Mobile:** Photo collapses behind content (or hides), content goes full-width, text scales down via clamp.

---

## 3. Bio section (`app/page.tsx`)

**Remove entirely.** The bio section (name row, metrics, bio text, photo) is deleted. Metrics and photo are now in the hero. Page jumps from hero directly to case studies.

---

## 4. Case Studies section (`app/page.tsx`)

No changes.

---

## 5. CTA Strip (`app/page.tsx`)

No changes.

---

## 6. Footer (`components/Footer.tsx`)

**Social icons:** Update to match Figma — Facebook, LinkedIn, YouTube, Instagram (currently LinkedIn, GitHub, Email).

SVG paths to use:
- Facebook: standard `f` icon path
- LinkedIn: existing path (keep)
- YouTube: play button in rectangle path
- Instagram: camera outline path

**Link columns:** Keep existing Work, Takes, Connect columns and their links unchanged.

---

## Files Changed

| File | Change |
|------|--------|
| `app/layout.tsx` | Swap `Great_Vibes` → `UnifrakturMaguntia` |
| `components/Nav.tsx` | Logo text, button color, homepage text color |
| `components/Hero.tsx` | Full rewrite — photo left, content right, new stats/tagline |
| `app/page.tsx` | Remove bio section |
| `components/Footer.tsx` | Update social icons |

---

## Out of Scope

- Case studies content or layout
- CTA strip
- Inner pages (`/work`, `/takes`, `/built`)
