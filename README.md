# Queenellie Portfolio

Next.js 14 · TypeScript · Tailwind CSS · Deployed on Vercel

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Open http://localhost:3000
```

## Adding your photo

Drop your photo into `/public/photo.jpg`, then in `app/page.tsx` replace:

```tsx
<div className="absolute inset-0 flex items-center justify-center text-[#ddd] text-[13px]">
  Add photo.jpg to /public
</div>
```

with:

```tsx
<Image src="/photo.jpg" alt="Elisa Carrillo" fill className="object-cover" />
```

## Adding / editing case studies

All case study content lives in `content/cases.ts`. Each case is a TypeScript object:

```ts
{
  slug: "my-new-case",        // URL: /work/my-new-case
  title: "My New Case Study",
  company: "Company Name",
  year: "2025",
  tags: ["Tag1", "Tag2"],
  impact: "+42%",
  impactLabel: "Metric name",
  summary: "One paragraph shown on cards and in SEO.",
  body: `
## Section heading

Your full case study content goes here.
Write in markdown-ish format — ## for headings, blank lines between paragraphs.
  `.trim(),
}
```

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repo to Vercel — it auto-deploys on every push to main.

## Customizing colors

The pink is `#f0407a`. To change it, search and replace across the project or update:

- `tailwind.config.ts` → `colors.pink.DEFAULT`
- `app/globals.css` → `--pink`
