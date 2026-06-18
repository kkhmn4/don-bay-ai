"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#boi-canh", label: "Bối cảnh" },
  { href: "#triet-ly", label: "Triết lý" },
  { href: "#tam-nhin", label: "Tầm nhìn" },
  { href: "#su-menh", label: "Sứ mệnh" },
  { href: "#phieu", label: "Phễu tác động" },
  { href: "#15-bai", label: "15 Bài học" },
  { href: "#gems", label: "GEMS V6" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-foreground/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* brand */}
        <a href="#top" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <svg viewBox="0 0 40 40" className="w-10 h-10">
              <defs>
                <linearGradient id="brandGold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.82 0.13 85)" />
                  <stop offset="100%" stopColor="oklch(0.55 0.1 50)" />
                </linearGradient>
              </defs>
              <polygon points="20,4 36,32 4,32" fill="url(#brandGold)" />
              <rect x="6" y="22" width="28" height="2.5" rx="1" fill="oklch(0.18 0.025 165)" />
              <circle cx="20" cy="32" r="3" fill="oklch(0.18 0.025 165)" />
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-base sm:text-lg font-semibold text-foreground tracking-tight">
              Đòn Bẩy AI
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/50 mt-0.5 hidden sm:block">
              GEMS Physics Leader
            </span>
          </div>
        </a>

        {/* desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3.5 py-2 text-sm text-foreground/70 hover:text-foreground transition-colors relative group"
            >
              {l.label}
              <span className="absolute inset-x-3.5 -bottom-0.5 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
          ))}
        </nav>

        {/* cta */}
        <a
          href="#15-bai"
          className="hidden lg:inline-flex items-center px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-accent hover:text-foreground transition-all duration-300 shadow-sm hover:shadow-md"
        >
          Khám phá lộ trình
        </a>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Mở menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="lg:hidden absolute top-full inset-x-0 bg-background/95 backdrop-blur-xl border-b border-foreground/10 py-4 px-5">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-foreground/80 hover:text-foreground border-b border-foreground/5 last:border-0"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#15-bai"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex justify-center items-center px-5 py-3 rounded-full bg-foreground text-background text-sm font-medium"
            >
              Khám phá lộ trình
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
