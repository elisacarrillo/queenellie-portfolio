import Link from "next/link";
import type { Case } from "@/content/cases";

export default function CaseCard({ c, index }: { c: Case; index: number }) {
  return (
    <Link
      href={`/work/${c.slug}`}
      className="group flex flex-col justify-between rounded-xl border border-[#eee] bg-white p-6 transition-all duration-200 hover:shadow-md hover:border-[#f0407a]/30"
    >
      {/* Top row: index + arrow */}
      <div className="flex items-start justify-between mb-4">
        <span className="font-syne italic text-[#ddd] text-[1.4rem] leading-none">
          {String(index + 1).padStart(2, "0")}
        </span>
        <svg
          className="w-4 h-4 text-[#ccc] group-hover:text-[#f0407a] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 13L13 3M13 3H6M13 3V10" />
        </svg>
      </div>

      {/* Title + summary */}
      <div className="flex-1 mb-5">
        <p className="text-[10px] uppercase tracking-widest text-[#bbb] mb-1">
          {c.company} · {c.year}
        </p>
        <h3 className="font-fraunces font-bold text-[1.05rem] leading-snug tracking-tight mb-3">
          {c.title}
        </h3>
        <p className="text-[12px] text-[#777] leading-relaxed">
          {c.summary}
        </p>
      </div>

      {/* Impact */}
      <div className="mb-4">
        <div
          className="font-syne font-extrabold text-[#f0407a] leading-none tracking-tight"
          style={{ fontSize: "1.4rem" }}
        >
          {c.impact}
        </div>
        <div className="text-[10px] text-[#aaa] uppercase tracking-wide mt-1">
          {c.impactLabel}
        </div>
      </div>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap">
        {c.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] uppercase tracking-wide px-2 py-1 border border-[#eee] bg-[#f9f9f9] rounded-sm"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
