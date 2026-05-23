export type Case = {
  slug: string;
  title: string;
  company: string;
  year: string;
  tags: string[];
  impact: string;
  impactLabel: string;
  summary: string;
  body: string; // swap for MDX later if needed
};

export const cases: Case[] = [
  {
    slug: "opera-resizing",
    title: "Opera Resizing — Snap Content Framework",
    company: "Snap Inc.",
    year: "2025",
    tags: ["PRD", "Android", "Kotlin", "A/B Testing"],
    impact: "+1.89%",
    impactLabel: "Friend Story View Time",
    summary:
      "Identified the gap as a user, authored the PRD, scoped technical requirements, and led end-to-end delivery of content resizing for Snap's core viewing framework — shipped to 375M+ users.",
    body: `
## The Problem

I noticed it as a user first: content in Opera, Snap's core viewing framework, wasn't resizing correctly across different device form factors. It was a subtle friction point, but at 375M+ users, subtle adds up fast.

## What I Did

Rather than filing a bug report, I authored a full PRD — defining the problem, scoping the technical requirements, and proposing the solution. I then led end-to-end delivery: from aligning stakeholders to writing the Kotlin implementation on Android.

## The Result

Shipped to 375M+ users. Drove +1.89% Friend Story view time and +1.33% Private Story view time. The feature proved that the best specs come from engineers who feel the problem themselves.
    `.trim(),
  },
  {
    slug: "task-switcher-privacy",
    title: "Task Switcher Privacy Redesign",
    company: "Snap Inc.",
    year: "2025",
    tags: ["Privacy", "Architecture", "Android", "Product"],
    impact: "+0.77%",
    impactLabel: "Non-friend Story View Time",
    summary:
      "Rearchitected Opera's app switcher to surface public Spotlight content while protecting friend and chat feed privacy — a technical and product balance act shipped to 375M+ users.",
    body: `
## The Problem

Opera's task switcher was exposing previews of private friend and chat feeds in the Android app switcher — a privacy risk. But simply hiding all previews would kill discoverability for public Spotlight content.

## What I Did

I rearchitected the app switcher behavior to selectively surface only public Spotlight content previews while fully preserving privacy for friend and chat feeds. This required deep work in Opera's rendering and state management layer.

## The Result

Shipped to 375M+ users with +0.77% non-friend story view time and +0.45% total content view time. Privacy and engagement, not a tradeoff.
    `.trim(),
  },
  {
    slug: "filter-carousel",
    title: "Filter Carousel — A/B to Ship",
    company: "Snap Inc. (Intern)",
    year: "2024",
    tags: ["A/B Testing", "TypeScript", "Kotlin", "Experimentation"],
    impact: "+2.6%",
    impactLabel: "Filter Engagement",
    summary:
      "Built three iterations of a preview carousel, each A/B tested by 6M+ users. Shipped to 375M with a 2.6% lift in filter engagement. Also rewrote filters cross-platform in TypeScript.",
    body: `
## The Problem

Snap's filter carousel wasn't driving enough engagement. Users weren't discovering or using filters at the rate the team expected.

## What I Did

I built three distinct iterations of the preview carousel UI, designed A/B experiments for each, and ran them against 6M+ users per test. I also implemented a cross-platform TypeScript rewrite of three filters to achieve visual parity between Android and iOS.

## The Result

The winning variant shipped to 375M+ users with a 2.6% increase in filter engagement. Three experiments, one clean winner, zero ambiguity.
    `.trim(),
  },
  {
    slug: "amazon-pm-pipeline",
    title: "PM Data Pipeline",
    company: "Amazon",
    year: "2023",
    tags: ["SQL", "Redshift", "QuickSight", "Data"],
    impact: "2+",
    impactLabel: "Product Teams Unblocked",
    summary:
      "Built a SQL pipeline connecting Amazon's internal query client to Redshift so PMs could surface user behavior from S3 without engineering tickets — reducing time-to-insight for multiple product teams.",
    body: `
## The Problem

PMs needed to surface and act on user behavior data stored in S3, but every query required an engineering ticket. The bottleneck was slowing down product decisions across multiple teams.

## What I Did

I built a SQL pipeline connecting Amazon's internal query client directly to Redshift, and designed QuickSight dashboards to visualize Alexa user preferences across diverse categories. PMs could now self-serve their data questions.

## The Result

Reduced time-to-insight for at least 2 product teams. The pipeline turned a recurring engineering dependency into a solved problem.
    `.trim(),
  },
];

export function getCaseBySlug(slug: string): Case | undefined {
  return cases.find((c) => c.slug === slug);
}
