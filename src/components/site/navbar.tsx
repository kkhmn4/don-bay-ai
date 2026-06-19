"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Sparkles, ArrowRight } from "lucide-react";

const NAV_LINKS = [
  { href: "/khoa-hoc", label: "Khóa học" },
  { href: "/video", label: "Video ngắn" },
  { href: "/#funnel", label: "Phễu" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [announcementOpen, setAnnouncementOpen] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* === Announcement banner — gradient strip with live dot === */}
      {announcementOpen && (
        <div className="announcement-banner">
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-2.5 flex items-center justify-center gap-3 text-center">
            <span className="live-dot" />
            <p
              className="font-sans text-ink"
              style={{ fontSize: "13px", fontWeight: 500 }}
            >
              <span className="font-semibold text-deep-teal">Mới v8.0:</span>{" "}
              11 bài học + 11 kịch bản video ngắn đa kênh · Gemini & NotebookLM
            </p>
            <Link
              href="/khoa-hoc"
              className="hidden sm:inline-flex items-center gap-1 font-sans font-semibold text-deep-teal hover:gap-2 transition-all"
              style={{ fontSize: "13px" }}
            >
              Khám phá ngay
              <ArrowRight className="w-3 h-3" />
            </Link>
            <button
              onClick={() => setAnnouncementOpen(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-deep-teal/60 hover:text-deep-teal transition-colors"
              aria-label="Đóng thông báo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* === Main navbar — glass effect on scroll === */}
      <div
        className={`transition-all duration-300 border-b ${
          scrolled
            ? "nav-glass border-hairline py-3"
            : "bg-paper border-transparent py-4"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex items-center justify-between gap-6">
          {/* === Logo lockup — gradient square + wordmark + pill badge === */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Logo gradient square with leaf icon */}
            <div
              className="logo-gradient-bg relative flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
              style={{ borderRadius: "12px", width: "44px", height: "44px" }}
            >
              <svg
                viewBox="0 0 40 40"
                className="w-7 h-7 text-paper"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Lever triangle (physics metaphor) */}
                <polygon points="20,8 32,30 8,30" fill="currentColor" opacity="0.9" />
                <line x1="6" y1="22" x2="34" y2="22" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="20" cy="30" r="2.5" fill="currentColor" />
              </svg>
              {/* Sparkle accent */}
              <Sparkles
                className="absolute -top-1 -right-1 w-3.5 h-3.5 text-blossom"
                fill="currentColor"
              />
            </div>

            {/* Wordmark + version */}
            <div className="flex items-center gap-2.5">
              <div className="flex flex-col leading-none">
                <span className="wordmark">Đòn Bẩy AI</span>
                <span
                  className="font-sans text-mist mt-1"
                  style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500 }}
                >
                  Khoa Khung Hiệp
                </span>
              </div>
              <span className="badge-mint-lg hidden sm:inline-flex">
                v8.0
              </span>
            </div>
          </Link>

          {/* === Centered nav with animated underlines === */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => {
              const isActive = l.href.startsWith("/#") ? false : pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`nav-link font-sans ${
                    isActive
                      ? "is-active text-deep-teal font-semibold"
                      : "text-ink font-medium hover:text-deep-teal"
                  }`}
                  style={{ fontSize: "15px", lineHeight: 1.22 }}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* === Right: ghost link + glow CTA pill === */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/khoa-hoc"
              className="font-sans text-ink hover:text-deep-teal transition-colors"
              style={{ fontSize: "15px", padding: "8px 12px", fontWeight: 500 }}
            >
              Khám phá
            </Link>
            <Link href="/khoa-hoc" className="btn-teal-glow inline-flex items-center gap-2">
              Bắt đầu học
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* === Mobile toggle === */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="md:hidden p-2 text-ink"
            aria-label="Mở menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* === Mobile menu === */}
      {open && (
        <div className="md:hidden nav-glass border-b border-hairline">
          <nav className="max-w-[1200px] mx-auto px-5 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-sans text-ink hover:text-deep-teal transition-colors"
                style={{ fontSize: "16px", padding: "8px 0", fontWeight: 500 }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/khoa-hoc"
              onClick={() => setOpen(false)}
              className="btn-teal-glow inline-flex items-center justify-center gap-2 mt-2"
            >
              Bắt đầu học
              <ArrowRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
