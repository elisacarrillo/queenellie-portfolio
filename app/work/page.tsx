import Image from "next/image";
import CaseCard from "@/components/CaseCard";
import { cases } from "@/content/cases";

const wild = [
  {
    image: "/built.jpg",
    org: "B[U]ILT",
    role: "Black, Indigenous, Latino in Tech",
    body: `When I found B[U]ILT, it was five people and an idea.

By the time I left, it was 70+ members, 100+ events a year, $20K+ in sponsorship, and filled with initiatives I started like the B[U]ILT x NSBE Talent Pipeline, a paid mentorship initiative pairing upperclassmen with underclassmen to build real technical projects together.

Leading B[U]ILT made me a stronger engineer and a better decision maker. But more than that, it showed me the sheer power of community.`,
  },
  {
    image: "/hgc.jpg",
    org: "Hot Girls Code",
    role: "",
    body: `Hot Girls Code pushes back against the institutional tech bro culture and encourages individuality.

You can't assume someone's profession based on their appearance. Hot Girls Code is the resistance to that assumption and at its heart, is a celebration of our love for code.`,
  },
  {
    image: "/cae.jpg",
    org: "CAE",
    role: "Founder · iVenture Accelerator, Cohort 9",
    body: `We raised $20K in funding, grew a community of 90+ members, and went through UIUC's iVenture Accelerator as Cohort 9.

But the thing I'm most proud of isn't the product. It's that I showed up. Through a full course load, through internships, through every reason it would have been easier to quit.

CAE taught me that consistency and discipline aren't things you have naturally. They're things you choose, over and over, when it's inconvenient.`,
  },
];

export default function WorkPage() {
  return (
    <div className="mx-auto min-w-0 max-w-6xl px-4 pb-20 pt-24 sm:px-8">
      {/* Case Studies */}
      <div className="mb-0 flex min-w-0 flex-wrap items-baseline justify-between gap-4 border-b border-[#eee] py-8">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-widest text-[#bbb] mb-1">
            All Projects
          </p>
          <h1 className="font-fraunces font-extrabold text-[2rem] tracking-tight">
            The Work
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
        {cases.map((c, i) => (
          <CaseCard key={c.slug} c={c} index={i} />
        ))}
      </div>

      {/* In the Wild */}
      <div className="mt-20 border-t border-[#eee] pt-12">
        <p className="text-[10px] uppercase tracking-widest text-[#bbb] mb-1">
          Beyond the Job
        </p>
        <h2 className="font-fraunces font-extrabold text-[2rem] tracking-tight mb-12">
          In the Wild
        </h2>

        <div className="flex flex-col gap-20">
          {wild.map((item, i) => (
            <div
              key={i}
              className={`flex flex-col md:flex-row gap-10 md:gap-16 ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Photo */}
              <div className="w-full md:w-2/5 shrink-0">
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.org}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col justify-center">
                <p className="text-[10px] uppercase tracking-widest text-[#f0407a] mb-1">
                  {item.role}
                </p>
                <h3 className="font-fraunces font-extrabold text-[1.5rem] tracking-tight mb-5">
                  {item.org}
                </h3>
                <div className="space-y-4">
                  {item.body.split("\n\n").map((p, j) => (
                    <p key={j} className="text-[14px] text-[#555] leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
