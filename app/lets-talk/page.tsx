import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Let's Talk — Queenellie",
  description: "Get in touch with Elisa Carrillo.",
};

const contacts = [
  {
    label: "Email",
    value: "elisacarrillo873@gmail.com",
    href: "mailto:elisacarrillo873@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/elisacarrillo",
    href: "https://linkedin.com/in/elisacarrillo",
  },
  {
    label: "GitHub",
    value: "github.com/elisacarrillo",
    href: "https://github.com/elisacarrillo",
  },
];

export default function LetsTalkPage() {
  return (
    <div className="mx-auto min-w-0 max-w-6xl px-4 pb-20 pt-24 sm:px-8">
      {/* Page header */}
      <div className="mb-12 border-b border-[#eee] py-8">
        <p className="mb-1 text-[10px] uppercase tracking-widest text-[#bbb]">
          Contact
        </p>
        <h1 className="font-fraunces font-extrabold text-[2rem] tracking-tight">
          Let&rsquo;s Talk
        </h1>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col gap-12 md:flex-row md:gap-20">
        {/* Left — About */}
        <div className="md:flex-1">
          <p className="mb-2 text-[10px] uppercase tracking-widest text-[#f0407a]">
            About Me
          </p>
          <p className="text-[15px] leading-relaxed text-[#555]">
            I&rsquo;m Elisa, a software engineer who believes the best products
            are the ones that feel inevitable, built with enough care and craft
            that it feels like they couldn&rsquo;t have existed any other way.
            I&rsquo;ve spent my career building at scale (most recently at Snap)
            while staying connected to the human side of the work: the users,
            the community, the story behind the product.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-[#555]">
            I founded Hot Girls Code, founded CAE through UIUC&rsquo;s iVenture
            Accelerator, and spent years leading B[U]ILT advocating for
            underrepresented students in tech. Building community and building
            software feel like the same act to me: both are about creating space
            where people can thrive.
          </p>
        </div>

        {/* Right — Contact links */}
        <div className="shrink-0 md:w-64">
          <p className="mb-4 text-[10px] uppercase tracking-widest text-[#f0407a]">
            Find Me
          </p>
          <ul className="space-y-5">
            {contacts.map((c) => (
              <li key={c.label}>
                <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-widest text-[#bbb]">
                  {c.label}
                </p>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="text-[14px] font-medium text-[#111] underline underline-offset-4 decoration-[#f0407a] hover:text-[#f0407a] transition-colors"
                >
                  {c.value}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
