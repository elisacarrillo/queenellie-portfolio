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

  const solidBar = scrolled || pathname !== "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 shadow-sm ${
        solidBar ? "nav-solid bg-[#f0407a]" : "bg-white"
      }`}
    >
      <nav
        className="site-nav-inner relative mx-auto w-full max-w-6xl"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="site-nav-logo block min-w-0 max-w-full truncate text-left no-underline transition-colors hover:no-underline text-[15px] sm:text-[17px]"
        >
          Elisa Carrillo
        </Link>

        <ul className="site-nav-links list-none">
          {links.map((link) => (
            <li key={link.href} className="shrink-0">
              <Link
                href={link.href}
                className="whitespace-nowrap text-[13px] transition-colors hover:opacity-100 opacity-80 sm:text-[14px]"
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
              className={`inline-flex items-center whitespace-nowrap rounded-md px-3 py-2 text-[13px] font-bold transition-colors sm:px-4 sm:py-2.5 sm:text-[14px] ${
                solidBar
                  ? "bg-white text-[#111] hover:bg-[#111] hover:text-white"
                  : "bg-[#111] text-white hover:bg-[#f0407a] hover:text-white"
              }`}
            >
              lets talk :)
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
