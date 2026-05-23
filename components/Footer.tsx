import Link from "next/link";

const workLinks = [
  { href: "/work/opera-resizing", label: "Opera Resizing" },
  { href: "/work/task-switcher-privacy", label: "Task Switcher" },
  { href: "/work/filter-carousel", label: "Filter Carousel" },
  { href: "/work/amazon-pm-pipeline", label: "Amazon Pipeline" },
];

const takesLinks = [
  { href: "/takes", label: "Product Thinking" },
  { href: "/takes", label: "Design Eng" },
  { href: "/takes", label: "Founder Lessons" },
];

const connectLinks = [
  { href: "https://linkedin.com/in/elisacarrillo", label: "LinkedIn" },
  { href: "https://github.com/elisacarrillo", label: "GitHub" },
  { href: "mailto:elisacarrillo873@gmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#eee] px-4 py-10 sm:px-8">
      <div className="mx-auto grid max-w-6xl min-w-0 grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}
        <div>
          <p className="text-[13px] font-medium text-[#111] mb-4">
            queenellie's portfolio
          </p>
          <p className="text-[12px] text-[#999] leading-relaxed mb-5">
            Engineer who thinks like a PM.
            <br />
            Los Angeles, CA.
          </p>
          {/* Social icons */}
          <div className="flex gap-2">
            {[
              {
                href: "https://linkedin.com/in/elisacarrillo",
                label: "LinkedIn",
                path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 4m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0",
              },
              {
                href: "https://github.com/elisacarrillo",
                label: "GitHub",
                path: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22",
              },
              {
                href: "mailto:elisacarrillo873@gmail.com",
                label: "Email",
                path: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-7 h-7 rounded-full bg-[#111] flex items-center justify-center hover:bg-[#f0407a] transition-colors"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Work */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-[#bbb] mb-3 font-medium">
            Work
          </p>
          {workLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block text-[12px] text-[#666] hover:text-[#111] mb-2 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Takes */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-[#bbb] mb-3 font-medium">
            Takes
          </p>
          {takesLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="block text-[12px] text-[#666] hover:text-[#111] mb-2 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Connect */}
        <div>
          <p className="text-[10px] uppercase tracking-widest text-[#bbb] mb-3 font-medium">
            Connect
          </p>
          {connectLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="block text-[12px] text-[#666] hover:text-[#f0407a] mb-2 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
