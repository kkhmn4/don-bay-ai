"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/khoa-hoc", label: "Khóa học" },
  { href: "/video", label: "Video ngắn" },
  { href: "/#funnel", label: "Phễu" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <svg viewBox="0 0 40 40" className="w-9 h-9">
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
          <div className="flex flex-col leading-none">
            <span className="font-serif text-base sm:text-lg font-semibold text-foreground tracking-tight">
              Đòn Bẩy AI
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-foreground/50 mt-0.5 hidden sm:block">
              v8.0 · Khóa học 11 bài
            </span>
          </div>
        </Link>

        {/* desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => {
            const isActive = l.href.startsWith("/#") ? false : pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3.5 py-2 text-sm transition-colors relative group ${
                  isActive
                    ? "text-accent"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {l.label}
                <span
                  className={`absolute inset-x-3.5 -bottom-0.5 h-px bg-accent transition-transform origin-left ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* cta */}
        <Link
          href="/khoa-hoc"
          className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-sm hover:shadow-md"
        >
          Bắt đầu học
        </Link>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden p-2 text-foreground"
          aria-label="Mở menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="md:hidden absolute top-full inset-x-0 bg-background/95 backdrop-blur-xl border-b border-foreground/10 py-4 px-5">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-foreground/80 hover:text-foreground border-b border-foreground/5 last:border-0"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/khoa-hoc"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex justify-center items-center px-5 py-3 rounded-full bg-foreground text-background text-sm font-medium"
            >
              Bắt đầu học
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
