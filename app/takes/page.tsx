import { getTakes } from "@/content/takes";

export const metadata = {
  title: "Takes — Queenellie",
  description: "Short opinions on tech, product, and everything in between.",
};

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
              className="text-[13px] text-[#666] leading-relaxed [&_p]:mb-3 [&_p:last-child]:mb-0"
              dangerouslySetInnerHTML={{ __html: take.contentHtml }}
            />
          </div>
        ))}
        {takes.length === 0 && (
          <p className="text-[13px] text-[#999]">No takes yet. Check back soon.</p>
        )}
      </div>
    </div>
  );
}
