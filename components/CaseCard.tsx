import Link from "next/link";
import type { Case } from "@/content/cases";

export default function CaseCard({ c, index }: { c: Case; index: number }) {
  return (
    <Link
      href={`/work/${c.slug}`}
      className="group relative grid min-w-0 w-full max-w-full grid-cols-1 gap-4 border-b border-[#eee] py-8 transition-all duration-200 hover:bg-white hover:px-2 sm:hover:px-4 md:grid-cols-[minmax(0,48px)_minmax(0,1fr)_minmax(0,120px)] md:gap-8"
    >
      {/* Hover accent bar */}
      <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#f0407a] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />

      {/* Index */}
      <span
        className="font-syne italic text-[#ddd] leading-none pt-1"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Body */}
      <div className="min-w-0">
        <h3 className="font-syne font-bold text-[1.15rem] leading-tight tracking-tight mb-2">
          {c.title}
        </h3>
        <p className="text-[12px] text-[#777] leading-relaxed mb-3 max-w-[520px]">
          {c.summary}
        </p>
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
      </div>

      {/* Impact */}
      <div className="flex min-w-0 flex-col items-end justify-between">
        <div className="text-right">
          <div className="font-syne font-extrabold text-[#f0407a] leading-none tracking-tight"
            style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)" }}>
            {c.impact}
          </div>
          <div className="text-[10px] text-[#aaa] uppercase tracking-wide mt-1">
            {c.impactLabel}
          </div>
        </div>
        <span className="text-[#ccc] text-xl group-hover:text-[#f0407a] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200">
          ↗
        </span>
      </div>
    </Link>
  );
}
