import CaseCard from "@/components/CaseCard";
import { cases } from "@/content/cases";

export default function WorkPage() {
  return (
    <div className="mx-auto min-w-0 max-w-6xl px-4 pb-20 pt-24 sm:px-8">
      <div className="mb-0 flex min-w-0 flex-wrap items-baseline justify-between gap-4 border-b border-[#eee] py-8">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-widest text-[#bbb] mb-1">
            All Projects
          </p>
          <h1 className="font-syne font-extrabold text-[2rem] tracking-tight">
            The Work
          </h1>
        </div>
        <span
          className="shrink-0 font-syne font-light italic text-[#e8e8e8] leading-none"
          style={{ fontSize: "clamp(2rem, 10vw, 3rem)" }}
        >
          {String(cases.length).padStart(2, "0")}
        </span>
      </div>

      {cases.map((c, i) => (
        <CaseCard key={c.slug} c={c} index={i} />
      ))}
    </div>
  );
}
