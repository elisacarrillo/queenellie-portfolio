import BuiltCard from "@/components/BuiltCard";
import { getBuilt } from "@/content/built";

export const metadata = {
  title: "Built — Queenellie",
  description: "Side projects, tools, and skills I've built.",
};

export default async function BuiltPage() {
  const items = await getBuilt();
  const featured = items[0];
  const rest = items.slice(1);

  return (
    <div className="mx-auto min-w-0 max-w-2xl px-4 pb-20 pt-24 sm:px-8 min-h-screen">
      <div className="mb-10">
        <p className="text-[10px] uppercase tracking-widest text-[#bbb] mb-1">
          Side Projects & Tools
        </p>
        <h1 className="font-fraunces font-medium text-[2rem] tracking-tight">
          Cool things I built
        </h1>
      </div>

      {items.length === 0 ? (
        <p className="text-[13px] text-[#999]">Nothing here yet. Check back soon.</p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {featured && <BuiltCard item={featured} featured />}

          {rest.map((item) => (
            <BuiltCard key={item.slug} item={item} />
          ))}

          {/* Placeholder shown when rest count is odd so the grid fills evenly */}
          {rest.length % 2 !== 0 && (
            <div className="flex items-center justify-center rounded-[10px] border border-dashed border-[#e0e0e0] bg-[#fafafa] min-h-[140px]">
              <span className="text-[10px] uppercase tracking-widest text-[#ccc] font-semibold">
                more coming soon
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
