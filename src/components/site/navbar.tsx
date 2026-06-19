"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-mist/85 backdrop-blur-xl border-b border-pebble py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* brand — logo image + wordmark */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-9 h-9 rounded-full overflow-hidden bg-obsidian shrink-0">
            <Image
              src="/images/logo.png"
              alt="Đòn Bẩy AI logo"
              fill
              className="object-cover"
              sizes="36px"
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-obsidian text-base tracking-tight">
              Đòn Bẩy AI
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-steel mt-0.5 hidden sm:block">
              v8.0
            </span>
          </div>
        </Link>

        {/* desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => {
            const isActive = l.href.startsWith("/#") ? false : pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-[14px] font-medium transition-colors ${
                  isActive
                    ? "text-obsidian"
                    : "text-graphite hover:text-obsidian"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* primary pill CTA — obsidian with multi-layer shadow */}
        <Link
          href="/khoa-hoc"
          className="hidden md:inline-flex items-center text-[14px] font-medium text-snow bg-obsidian hover:bg-ink transition-colors shadow-pill-physical"
          style={{
            borderRadius: "36px",
            padding: "12px 20px",
          }}
        >
          Bắt đầu học
        </Link>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden p-2 text-obsidian"
          aria-label="Mở menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="md:hidden mt-4 pt-4 border-t border-pebble">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-[14px] font-medium text-graphite hover:text-obsidian"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/khoa-hoc"
              onClick={() => setOpen(false)}
              className="inline-flex justify-center items-center text-[14px] font-medium text-snow bg-obsidian shadow-pill-physical"
              style={{ borderRadius: "36px", padding: "12px 20px" }}
            >
              Bắt đầu học
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
