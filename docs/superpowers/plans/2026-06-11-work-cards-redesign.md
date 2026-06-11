# Work Cards Redesign + Nav Font Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace generic bordered CaseCards with Feature Cards that lead with the impact stat, and update the nav logo to use the Manufacturing Consent blackletter font.

**Architecture:** Two isolated file changes — `CaseCard.tsx` is a full component rewrite, `Nav.tsx` is a single class swap. No new files, no data model changes.

**Tech Stack:** Next.js App Router, Tailwind CSS v4, custom font utilities (`font-inter`, `font-fraunces`, `font-queenellie-display`)

---

### Task 1: Redesign CaseCard.tsx

**Files:**
- Modify: `components/CaseCard.tsx`

The card layout order: impact stat → impact label → company/year → title → summary → tags. Pink left border replaces the all-around border. No index number or arrow icon.

- [ ] **Step 1: Replace the full contents of `components/CaseCard.tsx`**

```tsx
import Link from "next/link";
import type { Case } from "@/content/cases";

export default function CaseCard({ c, index: _index }: { c: Case; index: number }) {
  return (
    <Link
      href={`/work/${c.slug}`}
      className="group flex flex-col bg-white rounded-xl border-l-[3px] border-[#f0407a] p-6 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Impact stat — Inter extrabold, matches hero stats */}
      <div
        className="font-inter font-extrabold text-[#f0407a] leading-none tracking-tight"
        style={{ fontSize: c.impact.length > 6 ? "1.3rem" : "2rem" }}
      >
        {c.impact}
      </div>
      <p className="text-[9px] uppercase tracking-widest text-[#bbb] mt-1 mb-4">
        {c.impactLabel}
      </p>

      {/* Meta */}
      <p className="text-[9px] uppercase tracking-widest text-[#ccc] mb-1">
        {c.company} · {c.year}
      </p>

      {/* Title — Fraunces upright weight 500 */}
      <h3 className="font-fraunces font-medium text-[1rem] leading-snug tracking-tight text-[#111] mb-3 flex-1">
        {c.title}
      </h3>

      {/* Summary */}
      <p className="text-[12px] text-[#888] leading-relaxed mb-4">
        {c.summary}
      </p>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap">
        {c.tags.map((tag) => (
          <span
            key={tag}
            className="text-[9px] uppercase tracking-wide px-2 py-1 bg-[#f5f5f5] text-[#aaa] rounded-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Verify in browser**

Open `http://localhost:3000/work`. Confirm:
- Each card has a pink left border, no all-around border
- Impact stat is large, pink, Inter extrabold (matches hero stat style)
- Title is Fraunces upright (not italic)
- Tags have no border, just `#f5f5f5` background
- Cards lift slightly on hover

---

### Task 2: Update Nav logo font

**Files:**
- Modify: `components/Nav.tsx:40`

- [ ] **Step 1: Swap the font class on the nav logo link**

Find this in `components/Nav.tsx`:
```tsx
className="site-nav-logo block min-w-0 max-w-full truncate text-left font-fraunces no-underline transition-colors hover:no-underline sm:text-[15px]"
```

Replace with:
```tsx
className="site-nav-logo block min-w-0 max-w-full truncate text-left font-queenellie-display no-underline transition-colors hover:no-underline sm:text-[15px]"
```

- [ ] **Step 2: Verify in browser**

Check every page (home, `/work`). Confirm "Elisa Carrillo" renders in the Gothic blackletter font. Confirm it's legible at all viewport sizes — if it feels too large at small screens, note it for follow-up but don't adjust font-size in this task.
