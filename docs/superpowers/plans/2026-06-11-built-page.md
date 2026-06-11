# Built Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a living `/built` page with a bento-grid layout that showcases side projects, tools, and skills — starting with grind.lc and the golden-rule-verification skill.

**Architecture:** Markdown files in `content/built/` are parsed by a `getBuilt()` function (mirroring the `content/takes.ts` pattern using `gray-matter` + `remark`). The page renders a bento grid: the featured item spans full width, remaining items fill a 2-column grid. A `BuiltCard` component handles both variants.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS v4, gray-matter, remark, remark-html

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `content/built/grind-lc.md` | Content for grind.lc |
| Create | `content/built/golden-rule-verification.md` | Content for the skill |
| Create | `content/built.ts` | `getBuilt()` parser — reads `content/built/`, parses frontmatter + markdown |
| Create | `components/BuiltCard.tsx` | Card UI — accepts `item: Built` and `featured: boolean` |
| Create | `app/built/page.tsx` | Page — calls `getBuilt()`, renders bento grid |

---

## Task 1: Create the content markdown files

**Files:**
- Create: `content/built/grind-lc.md`
- Create: `content/built/golden-rule-verification.md`

- [ ] **Step 1: Create `content/built/grind-lc.md`**

```markdown
---
title: grind.lc
category: website
tags: [Next.js, TypeScript]
link: https://doaleetcode.vercel.app
featured: true
---

I wanted a resource that taught algorithms by pattern, not by problem. Most prep platforms throw hundreds of random problems at you — this one teaches the underlying patterns so each problem clicks faster. Built it for myself, opened it up.
```

- [ ] **Step 2: Create `content/built/golden-rule-verification.md`**

```markdown
---
title: golden-rule-verification
category: skill
tags: [Claude Code]
link: https://github.com/elisacarrillo/golden-rule-verification
featured: false
---

A Claude Code skill that enforces verifying behavior at the actual running app surface before calling anything done. Stops the "the code looks right" trap dead in its tracks.
```

> **Note:** Update the `link` in golden-rule-verification.md to the real GitHub URL before shipping.

---

## Task 2: Create `content/built.ts`

**Files:**
- Create: `content/built.ts`

- [ ] **Step 1: Create `content/built.ts`**

Mirror the pattern from `content/takes.ts` exactly. The key differences: more frontmatter fields, sorting puts the featured item first (then by filename order for the rest).

```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const builtDir = path.join(process.cwd(), "content/built");

export type Built = {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  link: string;
  screenshot?: string;
  featured: boolean;
  contentHtml: string;
};

const processor = remark().use(html, { sanitize: true });

export async function getBuilt(): Promise<Built[]> {
  if (!fs.existsSync(builtDir)) return [];

  const files = fs.readdirSync(builtDir).filter((f) => f.endsWith(".md"));

  const items: Built[] = await Promise.all(
    files.map(async (filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(builtDir, filename), "utf8");
      const { data, content } = matter(raw);

      if (!data.title || !data.category || !data.link) {
        throw new Error(
          `built/${filename} is missing required frontmatter (title, category, link)`
        );
      }

      const processed = await processor.process(content);

      return {
        slug,
        title: data.title as string,
        category: data.category as string,
        tags: (data.tags as string[]) ?? [],
        link: data.link as string,
        screenshot: data.screenshot as string | undefined,
        featured: (data.featured as boolean) ?? false,
        contentHtml: processed.toString(),
      };
    })
  );

  // Featured item first, then preserve filesystem order
  return items.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });
}
```

- [ ] **Step 2: Verify TypeScript is happy**

Run: `npx tsc --noEmit`

Expected: no errors. If there are errors, read the message and fix before continuing.

---

## Task 3: Create `components/BuiltCard.tsx`

**Files:**
- Create: `components/BuiltCard.tsx`

- [ ] **Step 1: Create `components/BuiltCard.tsx`**

The component renders two variants based on the `featured` prop. Featured: two-column layout with write-up left, screenshot/placeholder right. Regular: single column, no image.

```tsx
import type { Built } from "@/content/built";

interface BuiltCardProps {
  item: Built;
  featured?: boolean;
}

export default function BuiltCard({ item, featured = false }: BuiltCardProps) {
  if (featured) {
    return (
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group col-span-2 grid grid-cols-1 sm:grid-cols-[1fr_220px] overflow-hidden rounded-[10px] border border-[#ebebeb] transition-shadow hover:shadow-sm no-underline"
      >
        {/* Left: content */}
        <div className="p-6">
          <div className="mb-3 flex flex-wrap gap-1.5">
            <span className="rounded px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest bg-[#fff0f5] text-[#f0407a]">
              {item.category}
            </span>
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide bg-[#f5f5f5] text-[#666]"
              >
                {tag}
              </span>
            ))}
          </div>
          <h2 className="font-fraunces font-medium italic text-[1.05rem] text-[#111] mb-2">
            {item.title}
          </h2>
          <div
            className="text-[12px] text-[#666] leading-relaxed mb-4 [&_p]:mb-2 [&_p:last-child]:mb-0"
            dangerouslySetInnerHTML={{ __html: item.contentHtml }}
          />
          <span className="text-[10px] font-bold uppercase tracking-wide text-[#f0407a] after:content-['↗'] after:ml-1">
            {item.link.replace(/^https?:\/\//, "")}
          </span>
        </div>

        {/* Right: screenshot or placeholder */}
        {item.screenshot ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.screenshot}
            alt={`${item.title} screenshot`}
            className="h-full w-full object-cover hidden sm:block"
          />
        ) : (
          <div className="hidden sm:flex items-center justify-center bg-gradient-to-br from-[#fff0f5] to-[#ffd6e7]" />
        )}
      </a>
    );
  }

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-[10px] border border-[#ebebeb] p-5 transition-shadow hover:shadow-sm no-underline"
    >
      <div className="mb-3 flex flex-wrap gap-1.5">
        <span className="rounded px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest bg-[#fff0f5] text-[#f0407a]">
          {item.category}
        </span>
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="rounded px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide bg-[#f5f5f5] text-[#666]"
          >
            {tag}
          </span>
        ))}
      </div>
      <h2 className="font-fraunces font-medium italic text-[1.05rem] text-[#111] mb-2">
        {item.title}
      </h2>
      <div
        className="text-[12px] text-[#666] leading-relaxed flex-1 [&_p]:mb-2 [&_p:last-child]:mb-0"
        dangerouslySetInnerHTML={{ __html: item.contentHtml }}
      />
      <span className="mt-4 text-[10px] font-bold uppercase tracking-wide text-[#f0407a] after:content-['↗'] after:ml-1">
        View
      </span>
    </a>
  );
}
```

- [ ] **Step 2: Verify TypeScript is happy**

Run: `npx tsc --noEmit`

Expected: no errors.

---

## Task 4: Create `app/built/page.tsx`

**Files:**
- Create: `app/built/page.tsx`

- [ ] **Step 1: Read the Next.js docs for any App Router page conventions**

Check `node_modules/next/dist/docs/` for any page-level conventions that apply. At minimum, confirm `export const metadata` and `export default async function` are the right patterns (they match the `/takes/page.tsx` in this repo, so this is likely fine).

- [ ] **Step 2: Create `app/built/page.tsx`**

```tsx
import BuiltCard from "@/components/BuiltCard";
import { getBuilt } from "@/content/built";

export const metadata = {
  title: "Built — Queenellie",
  description: "Side projects, tools, and skills I've built.",
};

export default async function BuiltPage() {
  const items = await getBuilt();
  const featured = items[0];
  const rest = items.slice(1);

  return (
    <div className="mx-auto min-w-0 max-w-2xl px-4 pb-20 pt-24 sm:px-8 min-h-screen">
      <div className="mb-10">
        <p className="text-[10px] uppercase tracking-widest text-[#bbb] mb-1">
          Side Projects & Tools
        </p>
        <h1 className="font-fraunces font-medium text-[2rem] tracking-tight">
          Cool things I built
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {featured && <BuiltCard item={featured} featured />}

        {rest.map((item) => (
          <BuiltCard key={item.slug} item={item} />
        ))}

        {/* Placeholder shown when rest count is odd so the grid fills evenly */}
        {rest.length % 2 !== 0 && (
          <div className="flex items-center justify-center rounded-[10px] border border-dashed border-[#e0e0e0] bg-[#fafafa] min-h-[140px]">
            <span className="text-[10px] uppercase tracking-widest text-[#ccc] font-semibold">
              more coming soon
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify TypeScript is happy**

Run: `npx tsc --noEmit`

Expected: no errors.

---

## Task 5: Verify the page at runtime

**Files:** none — verification only

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`

- [ ] **Step 2: Screenshot the /built page**

Run: `npx playwright screenshot --browser chromium http://localhost:3000/built /tmp/built-check.png`

Open `/tmp/built-check.png` and verify:
- Page header "Cool things I built" renders
- grind.lc appears as the wide featured card (left: text, right: pink gradient)
- golden-rule-verification appears as a regular card in the grid
- "more coming soon" placeholder fills the empty grid cell
- Tags render in the correct colors (category: pink, tech: grey)
- Links are present

- [ ] **Step 3: Check the nav link works**

Run: `npx playwright screenshot --browser chromium http://localhost:3000 /tmp/home-nav-check.png`

Verify the "cool things i built" nav link is visible and points to `/built`.

- [ ] **Step 4: Fix any issues and re-verify**

If anything looks wrong, fix it and re-run the screenshot. Only stop when the page matches the spec.
