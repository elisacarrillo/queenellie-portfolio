# Takes Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a `/takes` page that lists short markdown-based opinions sorted newest-first in an editorial layout.

**Architecture:** Markdown files in `content/takes/` are parsed at build time by `content/takes.ts` using `gray-matter` + `remark-html`. `app/takes/page.tsx` calls the loader and renders the editorial list. No dynamic routes — everything is one page.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS v4, `gray-matter`, `remark`, `remark-html`

---

### Task 1: Install dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install the three parsing packages**

```bash
npm install gray-matter remark remark-html
```

- [ ] **Step 2: Verify they appear in `package.json` dependencies**

```bash
grep -E "gray-matter|remark" package.json
```

Expected output: lines showing `gray-matter`, `remark`, and `remark-html` in dependencies.

---

### Task 2: Create the takes content loader

**Files:**
- Create: `content/takes.ts`

- [ ] **Step 1: Create `content/takes.ts`**

```ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const takesDir = path.join(process.cwd(), "content/takes");

export type Take = {
  slug: string;
  title: string;
  date: string;
  contentHtml: string;
};

function formatDate(raw: string): string {
  const d = new Date(raw);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export async function getTakes(): Promise<Take[]> {
  const files = fs.readdirSync(takesDir).filter((f) => f.endsWith(".md"));

  const takes = await Promise.all(
    files.map(async (filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(takesDir, filename), "utf8");
      const { data, content } = matter(raw);
      const processed = await remark().use(html).process(content);
      return {
        slug,
        title: data.title as string,
        date: formatDate(data.date as string),
        contentHtml: processed.toString(),
      };
    })
  );

  return takes.sort((a, b) => {
    const aFile = files.find((f) => f.startsWith(a.slug)) ?? "";
    const bFile = files.find((f) => f.startsWith(b.slug)) ?? "";
    return bFile.localeCompare(aFile);
  });
}
```

- [ ] **Step 2: Verify the file was written correctly by reading it back**

Check that the import paths, `Take` type, `formatDate`, and `getTakes` are all present.

---

### Task 3: Add sample takes content

**Files:**
- Create: `content/takes/` (directory + 3 sample files)

- [ ] **Step 1: Create `content/takes/2025-06-01-css-in-js.md`**

```md
---
title: CSS-in-JS was never the problem
date: 2025-06-01
---

We confused styling tools with architecture decisions. CSS-in-JS was a symptom, not the cause — the real problem was that nobody agreed on where styles belonged.
```

- [ ] **Step 2: Create `content/takes/2025-05-10-pms-who-cant-code.md`**

```md
---
title: PMs who can't code ship slower
date: 2025-05-10
---

Not because they're less smart. The feedback loop is just broken. Every translation layer — from idea to spec to engineer to PR — adds latency and drops context. The closer you are to the code, the faster you can iterate.
```

- [ ] **Step 3: Create `content/takes/2025-04-03-metrics-and-taste.md`**

```md
---
title: Metrics are a lagging indicator of taste
date: 2025-04-03
---

By the time the data shows your product is boring, your best users have already left. Good taste is what you exercise before the data arrives.
```

---

### Task 4: Build the takes page

**Files:**
- Create: `app/takes/page.tsx`

- [ ] **Step 1: Create `app/takes/page.tsx`**

```tsx
import { getTakes } from "@/content/takes";

export default async function TakesPage() {
  const takes = await getTakes();

  return (
    <div className="mx-auto min-w-0 max-w-2xl px-4 pb-20 pt-24 sm:px-8">
      <div className="mb-10">
        <p className="text-[10px] uppercase tracking-widest text-[#bbb] mb-1">
          Hot Takes
        </p>
        <h1 className="font-fraunces font-medium text-[2rem] tracking-tight">
          Takes
        </h1>
      </div>

      <div>
        {takes.map((take) => (
          <div
            key={take.slug}
            className="border-t border-[#ebebeb] py-8 last:border-b"
          >
            <p className="text-[9px] uppercase tracking-widest text-[#f0407a] mb-2">
              {take.date}
            </p>
            <h2 className="font-fraunces font-medium italic text-[1.1rem] text-[#111] leading-snug mb-3">
              {take.title}
            </h2>
            <div
              className="text-[13px] text-[#666] leading-relaxed prose-p:mb-3"
              dangerouslySetInnerHTML={{ __html: take.contentHtml }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify the page renders at `http://localhost:3000/takes`**

Check that:
- "Hot Takes" eyebrow and "Takes" heading appear
- All 3 sample takes are listed newest-first (Jun → May → Apr)
- Each take shows a pink date, italic Fraunces title, and body text
- Ruled lines appear between takes

---

### Task 5: Fix sort stability in takes loader

The sort in Task 2 uses filenames for ordering which relies on files being prefixed with dates (YYYY-MM-DD). Verify this works and tighten the sort to use the actual `data.date` frontmatter value instead, which is more reliable.

**Files:**
- Modify: `content/takes.ts`

- [ ] **Step 1: Update `getTakes()` to sort by frontmatter date**

Replace the `takes.sort(...)` block at the end of `getTakes()` with:

```ts
  return takes.sort(
    (a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );
```

Wait — `a.date` and `b.date` are already formatted strings at this point (e.g. "Jun 2025"). Sort before formatting. Update the full `getTakes()` function to separate raw date from formatted date:

```ts
export async function getTakes(): Promise<Take[]> {
  const files = fs.readdirSync(takesDir).filter((f) => f.endsWith(".md"));

  const takes = await Promise.all(
    files.map(async (filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(takesDir, filename), "utf8");
      const { data, content } = matter(raw);
      const processed = await remark().use(html).process(content);
      return {
        slug,
        title: data.title as string,
        date: formatDate(data.date as string),
        rawDate: data.date as string,
        contentHtml: processed.toString(),
      };
    })
  );

  const sorted = takes.sort(
    (a, b) => new Date(b.rawDate).getTime() - new Date(a.rawDate).getTime()
  );

  return sorted.map(({ rawDate: _rawDate, ...take }) => take);
}
```

- [ ] **Step 2: Verify sort order is still correct at `http://localhost:3000/takes`**

Takes should still appear Jun → May → Apr.
