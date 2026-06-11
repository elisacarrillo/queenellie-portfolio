import type { Built } from "@/content/built";

interface BuiltCardProps {
  item: Built;
  featured?: boolean;
}

function TagList({ category, tags }: { category: string; tags: string[] }) {
  return (
    <div className="mb-3 flex flex-wrap gap-1.5">
      <span className="rounded px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest bg-[#fff0f5] text-[#f0407a]">
        {category}
      </span>
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wide bg-[#f5f5f5] text-[#666]"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export default function BuiltCard({ item, featured = false }: BuiltCardProps) {
  if (featured) {
    return (
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group col-span-2 grid grid-cols-1 sm:grid-cols-[1fr_220px] overflow-hidden rounded-[10px] border border-[#ebebeb] transition-shadow hover:shadow-sm no-underline"
      >
        {/* Left: content */}
        <div className="p-6">
          <TagList category={item.category} tags={item.tags} />
          <h3 className="font-fraunces font-medium italic text-[1.05rem] text-[#111] mb-2">
            {item.title}
          </h3>
          <div
            className="text-[12px] text-[#666] leading-relaxed mb-4 [&_p]:mb-2 [&_p:last-child]:mb-0"
            dangerouslySetInnerHTML={{ __html: item.contentHtml }}
          />
          <span className="text-[10px] font-bold uppercase tracking-wide text-[#f0407a] after:content-['↗'] after:ml-1">
            {item.link.replace(/^https?:\/\//, "")}
          </span>
        </div>

        {/* Right: screenshot or placeholder */}
        {item.screenshot ? (
          /* Using <img> directly: screenshot dimensions are variable, Next.js Image optimization not needed */
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={item.screenshot}
            alt={`${item.title} screenshot`}
            className="h-full w-full object-cover hidden sm:block"
          />
        ) : (
          <div className="hidden sm:flex items-center justify-center bg-gradient-to-br from-[#fff0f5] to-[#ffd6e7]" />
        )}
      </a>
    );
  }

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-[10px] border border-[#ebebeb] p-5 transition-shadow hover:shadow-sm no-underline"
    >
      <TagList category={item.category} tags={item.tags} />
      <h3 className="font-fraunces font-medium italic text-[1.05rem] text-[#111] mb-2">
        {item.title}
      </h3>
      <div
        className="text-[12px] text-[#666] leading-relaxed flex-1 [&_p]:mb-2 [&_p:last-child]:mb-0"
        dangerouslySetInnerHTML={{ __html: item.contentHtml }}
      />
      <span className="mt-4 text-[10px] font-bold uppercase tracking-wide text-[#f0407a] after:content-['↗'] after:ml-1">
        {item.link.replace(/^https?:\/\//, "")}
      </span>
    </a>
  );
}
