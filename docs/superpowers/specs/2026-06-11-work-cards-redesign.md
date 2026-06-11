# Work Cards Redesign + Nav Font

**Date:** 2026-06-11

## Summary

Redesign the work page case study cards from generic bordered boxes to Feature Cards that lead with the impact stat. Update nav logo font to match the hero wordmark.

---

## Design Decisions

### 1. Card Layout — Feature Cards

Each card has a **pink left border** (`border-left: 3px solid #f0407a`) instead of an all-around border. No drop shadow by default; subtle lift on hover.

Layout order (top to bottom):
1. Impact stat (large, pink)
2. Impact label (tiny uppercase, muted)
3. Company · Year (tiny uppercase, very muted)
4. Project title
5. Summary text
6. Tags

Background: white. Container background: `#f5f5f5` (matches page). Grid: 3 columns on desktop, 1 on mobile.

### 2. Typography

| Element | Font | Weight | Style | Color |
|---|---|---|---|---|
| Impact stat | Inter | 800 (extrabold) | normal | `#f0407a` |
| Impact label | Inter | 400 | uppercase | `#bbb` |
| Company · Year | Inter | 400 | uppercase | `#ccc` |
| Project title | Fraunces | 500 | normal (upright) | `#111` |
| Summary | Inter | 400 | normal | `#888` |
| Tags | Inter | 400 | uppercase | `#aaa` on `#f5f5f5` |

This mirrors the hero stats (Inter extrabold) for the number and uses Fraunces upright weight 500 consistently with the page headings ("The Work", "In the Wild", org names).

### 3. Nav Logo Font

Change the nav logo ("Elisa Carrillo") from `font-fraunces` to `font-queenellie-display` (Manufacturing Consent / Gothic blackletter) — matching the "Queenellie" hero wordmark. Text content unchanged.

---

## Files to Change

- `components/CaseCard.tsx` — full redesign to Feature Card layout
- `components/Nav.tsx` — swap `font-fraunces` → `font-queenellie-display` on the logo link

---

## Out of Scope

- Work page header, "In the Wild" section, case study detail pages — no changes
- Mobile grid breakpoints beyond 1-column stacking
