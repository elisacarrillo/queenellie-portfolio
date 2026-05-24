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

      {/* Memphis doodle strip */}
      <div
        className="w-full overflow-hidden border-b border-[#e0e0e0]"
        style={{ height: "110px", backgroundColor: "white" }}
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="110"
          style={{ display: "block" }}
        >
          <defs>
            <pattern
              id="memphis"
              x="0"
              y="0"
              width="320"
              height="110"
              patternUnits="userSpaceOnUse"
            >
              <rect width="320" height="110" fill="white" />
              {/* Left-pointing triangle outline */}
              <polygon points="18,16 18,64 55,40" fill="none" stroke="#111" strokeWidth="4" strokeLinejoin="round" />
              {/* Squiggly wavy line */}
              <path d="M68,28 C73,16 82,44 89,28 C96,14 105,44 112,28" fill="none" stroke="#111" strokeWidth="4" strokeLinecap="round" />
              {/* Spiral / @ ring */}
              <circle cx="142" cy="42" r="20" fill="none" stroke="#111" strokeWidth="4" />
              <path d="M150,42 A8,8 0 1,1 142,34" fill="none" stroke="#111" strokeWidth="4" strokeLinecap="round" />
              {/* Triangle outline, rotated */}
              <g transform="translate(192,40) rotate(15)">
                <polygon points="-18,-24 -18,24 22,0" fill="none" stroke="#111" strokeWidth="4" strokeLinejoin="round" />
              </g>
              {/* Rotated oval */}
              <ellipse cx="246" cy="36" rx="26" ry="15" fill="none" stroke="#111" strokeWidth="4" transform="rotate(-20,246,36)" />
              {/* Zigzag / lightning */}
              <path d="M280,14 L293,38 L278,58 L294,88" fill="none" stroke="#111" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              {/* Small filled circle */}
              <circle cx="52" cy="84" r="9" fill="#111" />
              {/* Half-moon D-shape */}
              <path d="M88,90 A24,24 0 0,1 88,44" fill="none" stroke="#111" strokeWidth="4" strokeLinecap="round" />
              {/* Equal sign */}
              <line x1="126" y1="80" x2="156" y2="80" stroke="#111" strokeWidth="4" strokeLinecap="round" />
              <line x1="126" y1="96" x2="156" y2="96" stroke="#111" strokeWidth="4" strokeLinecap="round" />
              {/* Small diamond */}
              <polygon points="188,76 200,90 188,104 176,90" fill="none" stroke="#111" strokeWidth="4" strokeLinejoin="round" />
              {/* X cross, rotated */}
              <g transform="translate(228,86) rotate(20)">
                <line x1="-12" y1="-12" x2="12" y2="12" stroke="#111" strokeWidth="4" strokeLinecap="round" />
                <line x1="12" y1="-12" x2="-12" y2="12" stroke="#111" strokeWidth="4" strokeLinecap="round" />
              </g>
              {/* S-curve squiggle */}
              <path d="M254,70 C266,56 278,96 290,78" fill="none" stroke="#111" strokeWidth="4" strokeLinecap="round" />
            </pattern>
          </defs>
          <rect width="100%" height="110" fill="url(#memphis)" />
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
                  src="/photo.png"
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
