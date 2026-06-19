"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Search,
  ChevronDown,
  Leaf,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const NAV_LINKS = [
  { href: "/khoa-hoc", label: "Khóa học", hasDropdown: true, dropdown: [
    { href: "/khoa-hoc#module-1", label: "Module 1 · Soạn giảng" },
    { href: "/khoa-hoc#module-2", label: "Module 2 · Thí nghiệm ảo" },
    { href: "/khoa-hoc#module-3", label: "Module 3 · Trò chơi" },
  ]},
  { href: "/games/ar-knowledge-universe/index.html", label: "Game AR 🚀", hasDropdown: false, isFeatured: true },
  { href: "/khoa-hoc", label: "Tài nguyên", hasDropdown: true, dropdown: [
    { href: "/khoa-hoc", label: "Prompt Gemini Gems" },
    { href: "/khoa-hoc", label: "Phiếu học tập GEMS" },
    { href: "/khoa-hoc", label: "Code TikZ Vector" },
  ]},
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [announcementOpen, setAnnouncementOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
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
          <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-2.5 flex items-center justify-center gap-3 text-center relative">
            <span className="live-dot" />
            <p
              className="font-sans text-ink"
              style={{ fontSize: "13px", fontWeight: 500 }}
            >
              <span className="font-semibold text-deep-teal">Mới v8.0:</span>{" "}
              Hệ sinh thái 11 bài học thực chiến tích hợp Trò chơi AR & Trợ lý AI
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
          {/* === Logo lockup — gradient square + wordmark + mint pill badge === */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            {/* Logo gradient square with lever SVG */}
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
                <polygon points="20,8 32,30 8,30" fill="currentColor" opacity="0.9" />
                <line x1="6" y1="22" x2="34" y2="22" stroke="currentColor" strokeWidth="2.5" />
                <circle cx="20" cy="30" r="2.5" fill="currentColor" />
              </svg>
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
                  Kha Khung Hiệp
                </span>
              </div>
              <span className="badge-mint-lg hidden lg:inline-flex">
                <Leaf className="w-2.5 h-2.5" />
                v8.0
              </span>
            </div>
          </Link>

          {/* === Centered nav with dropdowns === */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => {
              const isActive = l.href.startsWith("/#") ? false : pathname === l.href;
              const isDropdownOpen = openDropdown === l.label;
              return (
                <div
                  key={l.label}
                  className="relative"
                  onMouseEnter={() => l.hasDropdown && setOpenDropdown(l.label)}
                  onMouseLeave={() => l.hasDropdown && setOpenDropdown(null)}
                >
                  <Link
                    href={l.href}
                    target={l.href.includes("/games/") ? "_blank" : undefined}
                    rel={l.href.includes("/games/") ? "noopener noreferrer" : undefined}
                    className={`font-sans inline-flex items-center gap-1 ${
                      l.isFeatured
                        ? "bg-mint-glass text-deep-teal px-3.5 py-1.5 rounded-full border border-bright-teal/25 hover:bg-deep-teal hover:text-paper hover:scale-105 transition-all font-semibold mx-1 shadow-sm"
                        : `nav-link ${
                            isActive
                              ? "is-active text-deep-teal font-semibold"
                              : "text-ink font-medium hover:text-deep-teal"
                          }`
                    }`}
                    style={{ fontSize: "15px", padding: l.isFeatured ? "6px 14px" : "8px 14px", lineHeight: 1.22 }}
                  >
                    {l.label}
                    {l.hasDropdown && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                      />
                    )}
                  </Link>

                  {/* Dropdown menu */}
                  {l.hasDropdown && isDropdownOpen && (
                    <div
                      className="absolute top-full left-0 mt-2 min-w-[240px] bg-paper border border-hairline shadow-lg overflow-hidden"
                      style={{ borderRadius: "16px", animation: "fade-in-up 0.2s ease" }}
                    >
                      <div className="py-2">
                        {l.dropdown?.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="block font-sans text-ink hover:bg-cream hover:text-deep-teal transition-colors"
                            style={{ fontSize: "14px", padding: "10px 16px", fontWeight: 500 }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* === Right: search + Log In outlined + Sign Up solid === */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            {/* Search button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="inline-flex items-center justify-center text-ink hover:text-deep-teal hover:bg-cream transition-colors"
              style={{ borderRadius: "9999px", width: "40px", height: "40px" }}
              aria-label="Tìm kiếm"
            >
              <Search className="w-5 h-5" strokeWidth={1.75} />
            </button>

            {/* Log In — outlined */}
            <Link
              href="/khoa-hoc"
              className="font-sans font-medium text-ink border border-deep-teal hover:bg-deep-teal hover:text-paper transition-colors"
              style={{ fontSize: "14px", padding: "10px 18px", borderRadius: "9999px" }}
            >
              Khám phá
            </Link>

            {/* Sign Up — solid teal with glow */}
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

        {/* Search bar — expandable */}
        {searchOpen && (
          <div className="border-t border-hairline bg-paper">
            <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-mist" />
                <input
                  type="text"
                  placeholder="Tìm bài học, video, prompt..."
                  autoFocus
                  className="w-full font-sans text-ink bg-cream border border-hairline focus:border-deep-teal focus:outline-none transition-colors"
                  style={{ fontSize: "15px", padding: "12px 16px 12px 48px", borderRadius: "12px" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* === Mobile menu === */}
      {open && (
        <div className="md:hidden nav-glass border-b border-hairline">
          <nav className="max-w-[1200px] mx-auto px-5 py-4 flex flex-col gap-2">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                target={l.href.includes("/games/") ? "_blank" : undefined}
                rel={l.href.includes("/games/") ? "noopener noreferrer" : undefined}
                onClick={() => setOpen(false)}
                className={`font-sans text-ink hover:text-deep-teal transition-colors flex items-center justify-between ${
                  l.isFeatured
                    ? "bg-mint-glass text-deep-teal px-4 py-2.5 rounded-xl border border-bright-teal/20 font-semibold my-1"
                    : ""
                }`}
                style={{ fontSize: "16px", padding: l.isFeatured ? "10px 16px" : "12px 0", fontWeight: 500, borderBottom: l.isFeatured ? "none" : "1px solid #ececee" }}
              >
                {l.label}
                {l.hasDropdown && <ChevronDown className="w-4 h-4 text-mist" />}
              </Link>
            ))}
            <Link
              href="/khoa-hoc"
              onClick={() => setOpen(false)}
              className="btn-teal-glow inline-flex items-center justify-center gap-2 mt-3"
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
