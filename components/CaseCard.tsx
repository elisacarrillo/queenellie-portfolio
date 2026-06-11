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
