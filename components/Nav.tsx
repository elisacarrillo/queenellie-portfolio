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

  const isHome = pathname === "/";
  const atTop = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        atTop ? "bg-transparent" : "bg-[#f0407a]"
      }`}
    >
      <nav
        className="site-nav-inner relative mx-auto w-full max-w-6xl py-4 sm:pl-6"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="site-nav-logo block min-w-0 max-w-full truncate text-left font-fraunces no-underline transition-colors hover:no-underline sm:text-[15px]"
        >
          Elisa Carrillo
        </Link>

        <ul className="site-nav-links list-none">
          {links.map((link) => (
            <li key={link.href} className="shrink-0">
              <Link
                href={link.href}
                className="whitespace-nowrap text-[13px] sm:text-[15px] hover:underline underline-offset-4"
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
              className="nav-cta inline-flex items-center whitespace-nowrap rounded-md bg-[#111] px-3 py-2 text-[13px] font-extrabold transition-colors hover:bg-[#f0407a] sm:px-4 sm:py-2.5 sm:text-[15px]"
            >
              lets talk :)
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
