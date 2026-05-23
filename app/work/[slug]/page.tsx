import { notFound } from "next/navigation";
import Link from "next/link";
import { cases, getCaseBySlug } from "@/content/cases";
import type { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const c = getCaseBySlug(params.slug);
  if (!c) return {};
  return {
    title: `${c.title} — Queenellie`,
    description: c.summary,
  };
}

export default function CaseStudyPage({ params }: Props) {
  const c = getCaseBySlug(params.slug);
  if (!c) notFound();

  return (
    <article className="mx-auto min-w-0 max-w-3xl px-4 pb-20 pt-28 sm:px-8">

      {/* Back */}
      <Link
        href="/work"
        className="text-[11px] uppercase tracking-widest text-[#bbb] hover:text-[#f0407a] transition-colors mb-10 inline-block"
      >
        ← Back to work
      </Link>

      {/* Header */}
      <div className="mb-10">
        <p className="text-[11px] uppercase tracking-widest text-[#f0407a] mb-2">
          {c.company} · {c.year}
        </p>
        <h1 className="font-syne font-extrabold text-[2rem] leading-tight tracking-tight mb-4">
          {c.title}
        </h1>
        <p className="text-[14px] text-[#666] leading-relaxed mb-6">
          {c.summary}
        </p>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap mb-6">
          {c.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-wide px-3 py-1 border border-[#eee] bg-[#f9f9f9] rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Impact callout */}
        <div className="border-l-4 border-[#f0407a] pl-5 py-2">
          <div className="font-syne font-extrabold text-[2.5rem] text-[#f0407a] leading-none">
            {c.impact}
          </div>
          <div className="text-[11px] text-[#aaa] uppercase tracking-wide mt-1">
            {c.impactLabel}
          </div>
        </div>
      </div>

      <hr className="border-[#eee] mb-10" />

      {/* Body — rendered as simple paragraphs */}
      {/* Swap this out for an MDX renderer when you're ready */}
      <div className="prose prose-sm max-w-none text-[#444] leading-relaxed">
        {c.body.split("\n\n").map((block, i) => {
          if (block.startsWith("## ")) {
            return (
              <h2
                key={i}
                className="font-syne font-bold text-[1.2rem] text-[#111] mt-8 mb-3"
              >
                {block.replace("## ", "")}
              </h2>
            );
          }
          return (
            <p key={i} className="mb-4 text-[14px] leading-relaxed">
              {block}
            </p>
          );
        })}
      </div>

      {/* Next case */}
      <div className="mt-16 pt-8 border-t border-[#eee]">
        <p className="text-[10px] uppercase tracking-widest text-[#bbb] mb-3">
          Next case
        </p>
        {(() => {
          const idx = cases.findIndex((x) => x.slug === c.slug);
          const next = cases[(idx + 1) % cases.length];
          return (
            <Link
              href={`/work/${next.slug}`}
              className="group flex items-center justify-between hover:text-[#f0407a] transition-colors"
            >
              <span className="font-syne font-bold text-[1.1rem]">
                {next.title}
              </span>
              <span className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                ↗
              </span>
            </Link>
          );
        })()}
      </div>
    </article>
  );
}
