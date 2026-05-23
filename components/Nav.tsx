"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links: { href: string; label: string; shortLabel?: string }[] = [
  { href: "/work", label: "work" },
  { href: "/takes", label: "takes" },
  { href: "/built", label: "cool things i built", shortLabel: "built" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Inner pages sit on light bg — keep bar solid so white labels stay readable */
  const solidBar = scrolled || pathname !== "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-600 ${
        solidBar
          ? "bg-pink backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav
        className="site-nav-inner relative mx-auto w-full max-w-6xl py-16 sm:py-25 sm:pl-6 "
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="site-nav-logo block min-w-0 max-w-full truncate text-left text-[13px] font-normal text-white no-underline transition-colors hover:no-underline sm:text-[15px]"
        >
          Portfolio
        </Link>

        <ul className="site-nav-links list-none">
          {links.map((link) => (
            <li key={link.href} className="shrink-0">
              <Link
                href={link.href}
                className="whitespace-nowrap text-[13px] font-extrabold text-white transition-colors hover:opacity-100 opacity-90 sm:text-[15px]"
              >
                {link.shortLabel ? (
                  <>
                    <span className="lg:hidden">{link.shortLabel}</span>
                    <span className="hidden lg:inline">{link.label}</span>
                  </>
                ) : (
                  link.label
                )}
              </Link>
            </li>
          ))}
          <li className="shrink-0">
            <Link
              href="mailto:elisacarrillo873@gmail.com"
              className="inline-flex items-center whitespace-nowrap rounded-md bg-[#f0407a] px-3 py-2 text-[13px] font-extrabold text-white transition-colors hover:bg-white hover:text-[#111] sm:px-4 sm:py-2.5 sm:text-[15px]"
            >
              lets talk :)
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
