"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Leaf } from "lucide-react";

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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-paper border-b ${
        scrolled ? "border-hairline py-3" : "border-transparent py-4"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex items-center justify-between gap-6">
        {/* Logo lockup — wordmark in deep teal + mint leaf icon + mint pill badge */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex items-center gap-2">
            <span
              className="font-sans font-medium text-deep-teal"
              style={{ fontSize: "22px", lineHeight: 1 }}
            >
              Đòn Bẩy AI
            </span>
            <Leaf className="w-5 h-5 text-deep-teal" strokeWidth={1.5} />
          </div>
          <span className="badge-mint hidden sm:inline-flex">
            v8.0
          </span>
        </Link>

        {/* Centered nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => {
            const isActive = l.href.startsWith("/#") ? false : pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`font-sans transition-colors ${
                  isActive
                    ? "text-deep-teal font-medium"
                    : "text-ink font-normal hover:text-deep-teal"
                }`}
                style={{ fontSize: "16px", lineHeight: 1.22 }}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: ghost login + teal sign-up */}
        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/khoa-hoc"
            className="font-sans text-ink hover:text-deep-teal transition-colors"
            style={{ fontSize: "16px", padding: "8px 16px" }}
          >
            Khám phá
          </Link>
          <Link
            href="/khoa-hoc"
            className="btn-teal animate-gentle-pulse"
          >
            Bắt đầu học
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden p-2 text-ink"
          aria-label="Mở menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden mt-3 pt-3 border-t border-hairline">
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-sans text-ink hover:text-deep-teal transition-colors"
                style={{ fontSize: "16px", padding: "8px 0" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/khoa-hoc"
              onClick={() => setOpen(false)}
              className="btn-teal inline-flex justify-center mt-2"
            >
              Bắt đầu học
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
