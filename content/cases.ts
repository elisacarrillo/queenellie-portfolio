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
  beforeImage?: string;
  afterImage?: string;
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
      "As a Snap user, I noticed a frustrating pattern — and fixed it. Shipped to 375M+ users with a measurable lift in Story view time and Bitmoji sends.",
    body: `
## The Problem

As a Snap user, I noticed a frustrating pattern: every time I went to reply while watching a Story, playback would pause and additional content would push into the screen, breaking the viewing experience entirely.

## What I Did

I initiated a redesign where playback continues uninterrupted and content resizes above the keyboard instead. After aligning with PMs and designers on my approach, I implemented and tested the change.

## The Result

+1.89% increase in Friend Story View Time and measurable increases in Bitmoji sends. The feature shipped to 375M+ users and is now in testing on iOS.
    `.trim(),
    beforeImage: "/opera-before.jpg",
    afterImage: "/opera-after.jpg",
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
      "Identified a gap in Snap's default privacy policy for the task switcher — and rearchitected it to surface public content previews without compromising private ones. Shipped to 375M+ users.",
    body: `
## The Problem

Snap's default behavior in the task switcher hides all content previews to protect user privacy, a reasonable policy for private content.

But when the content is public, that policy works against the user.

## What I Did

I identified the gap and rearchitected the app switcher behavior to selectively surface previews when the source of the playlist content is labeled as public, while preserving the hidden content for friend and chat feeds where privacy still matters.

## The Result

The change shipped to 375M+ users, driving +0.77% non-friend Story view time and +0.45% total content view time.
    `.trim(),
  },
  {
    slug: "black-screen-first-frame",
    title: "Black Screen First Frame Fix",
    company: "Snap Inc.",
    year: "2025",
    tags: ["Android", "Kotlin", "SurfaceView", "TextureView", "Video Rendering"],
    impact: "In Testing",
    impactLabel: "Android Content Previews",
    summary:
      "Traced and fixed a black screen bug on Android content previews by capturing a stopframe at position 0. Required going deep on hardware-level differences between SurfaceView and TextureView.",
    body: `
## The Problem

As a user, swiping through content on Android felt broken. Instead of smooth previews, you'd hit black screens with no indication of what was coming next.

## What I Did

I investigated the root cause and traced it to a missing server-generated first frame: when no first frame existed and the video was at position 0, both SurfaceView and TextureView had nothing to render.

My fix was to capture a stopframe at position 0 and use that as the first frame instead.

Solving this meant going deep on the hardware-level differences between SurfaceView and TextureView, two rendering paths that behave very differently under the hood. It was one of the more technically interesting problems I worked on at Snap.

## The Result

The change is currently in testing.
    `.trim(),
  },
];

export function getCaseBySlug(slug: string): Case | undefined {
  return cases.find((c) => c.slug === slug);
}
