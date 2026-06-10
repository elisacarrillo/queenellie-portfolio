import Link from "next/link";

const workLinks = [
  { href: "/work/opera-resizing", label: "Opera Resizing" },
  { href: "/work/task-switcher-privacy", label: "Task Switcher" },
  { href: "/work/black-screen-first-frame", label: "Black Screen Fix" },
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
    <footer className="bg-white border-t border-[#eee] px-4 sm:px-8 py-16">
      <div className="mx-auto grid max-w-6xl min-w-0 grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 w-full">

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
                href: "https://facebook.com/elisacarrillo",
                label: "Facebook",
                path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
              },
              {
                href: "https://linkedin.com/in/elisacarrillo",
                label: "LinkedIn",
                path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 4m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0",
              },
              {
                href: "https://youtube.com/@queenellie",
                label: "YouTube",
                path: "M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58a2.78 2.78 0 001.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z M9.75 15.02l5.75-3.02-5.75-3.02v6.04z",
              },
              {
                href: "https://instagram.com/queenellie",
                label: "Instagram",
                path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z M17.5 6.5h.01 M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z",
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
