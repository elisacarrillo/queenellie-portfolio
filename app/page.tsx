import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import CaseCard from "@/components/CaseCard";
import { cases } from "@/content/cases";

const bio = [
  "At Snap, I scoped and built what bothered me.",
  "At Amazon, I built the tool to allow PMs to stop guessing.",
  "As a Founder, I discovered that the best features come from living the problem.",
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Geometric doodle strip */}
      <div
        className="w-full overflow-hidden"
        style={{ height: "72px", backgroundColor: "#111" }}
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="72"
          style={{ display: "block" }}
        >
          <defs>
            <pattern
              id="geo-doodle"
              x="0"
              y="0"
              width="240"
              height="72"
              patternUnits="userSpaceOnUse"
            >
              <rect width="240" height="72" fill="#111" />
              {/* Left-pointing solid triangle */}
              <polygon points="22,9 22,63 58,36" fill="white" />
              {/* Spiral */}
              <path
                d="M121,36 C121,28 113,20 105,20 C97,20 89,28 89,36 C89,44 97,52 105,52 C117,52 125,42 125,30 C125,19 115,11 103,11"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Left-pointing solid triangle */}
              <polygon points="152,9 152,63 188,36" fill="white" />
              {/* Zigzag */}
              <path
                d="M200,18 L212,54 L224,18 L236,54"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </pattern>
          </defs>
          <rect width="100%" height="72" fill="url(#geo-doodle)" />
        </svg>
      </div>

      {/* Bio + Photo */}
      <section className="bg-white px-4 sm:px-8" style={{ paddingTop: "4vh", paddingBottom: "4vh" }}>
        <div className="max-w-6xl mx-auto">
          {/* Name */}
          <div className="mb-10">
            <h2 className="font-syne font-extrabold text-[2.2rem] leading-tight">
              Elisa Carrillo
            </h2>
            <p className="text-[#f0407a] text-[13px] font-medium mt-2">
              @queenellie
            </p>
          </div>

          {/* Bio + Photo */}
          <div className="flex flex-col md:flex-row gap-10 md:gap-16">
            {/* Left: Bio */}
            <div className="flex-1 space-y-1 min-w-0">
              {bio.map((line, i) => (
                <p key={i} className="text-[14px] text-[#555] leading-[1.6]">
                  {line}
                </p>
              ))}
            </div>

            {/* Right: Photo */}
            <div className="flex-1 min-w-0">
              <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-[#fde8f0]">
                <Image
                  src="/photo.jpg"
                  alt="Elisa Carrillo"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  preload
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="min-w-0 px-4 py-4 sm:px-8 max-w-6xl mx-auto">
        <div className="mb-0 flex min-w-0 flex-wrap items-baseline justify-between gap-4 border-b border-[#eee] py-8">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-widest text-[#bbb] mb-1">
              Selected Work
            </p>
            <h2 className="font-syne font-extrabold text-[1.8rem] tracking-tight">
              The Work
            </h2>
          </div>
          <span
            className="shrink-0 font-syne font-light italic leading-none text-[#e8e8e8]"
            style={{ fontSize: "clamp(2rem, 10vw, 3rem)" }}
          >
            {String(cases.length).padStart(2, "0")}
          </span>
        </div>

        {cases.map((c, i) => (
          <CaseCard key={c.slug} c={c} index={i} />
        ))}

        <div className="py-8 text-center">
          <Link
            href="/work"
            className="text-[12px] uppercase tracking-widest text-[#aaa] hover:text-[#f0407a] transition-colors"
          >
            View all work →
          </Link>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-[#f0407a] px-4 py-16 text-white sm:px-8">
        <div className="mx-auto flex min-w-0 max-w-6xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <h2
            className="min-w-0 font-syne font-extrabold leading-tight tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Let's build something<br />
            people actually use.
          </h2>
          <a
            href="mailto:elisacarrillo873@gmail.com"
            className="w-fit shrink-0 bg-white text-[#f0407a] font-syne font-bold px-8 py-4 rounded-md text-[14px] hover:bg-[#111] hover:text-white transition-colors whitespace-nowrap"
          >
            lets talk :)
          </a>
        </div>
      </section>
    </>
  );
}
