import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import CaseCard from "@/components/CaseCard";
import { cases } from "@/content/cases";

const metrics = [
  { value: "375M+", label: "Users Reached" },
  { value: "+1.89%", label: "Friend Story View Time" },
  { value: "$20K", label: "Raised as Founder" },
];

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

      {/* Bio + Photo */}
      <section className="bg-white px-4 pb-16 sm:px-8" style={{ paddingTop: "3vh", paddingBottom: "4vh" }}>
        <div className="max-w-6xl mx-auto">
          {/* Row 1: Name + Metrics on same line */}
          <div className="flex items-center justify-between gap-10 mb-16">
            {/* Left: name */}
            <h2 className="font-syne font-extrabold text-[2.2rem] leading-tight flex-shrink-0">
              Elisa Carrillo
            </h2>

            {/* Right: metrics */}
            <div className="flex gap-12 flex-shrink-0 mr-6">
              {metrics.map((m, i) => (
                <div key={i} className="text-right">
                  <div className="font-syne font-extrabold text-[1.8rem] leading-tight tracking-tight">
                    {m.value}
                  </div>
                  <div className="text-[13px] text-[#555] mt-1">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Handle */}
          <p className="text-[#f0407a] text-[13px] font-medium mb-8" style={{ paddingTop: "3vh"}}>
            @<span className="block">queenellie</span>
          </p>

          {/* Row 2: Bio + Photo */}
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
