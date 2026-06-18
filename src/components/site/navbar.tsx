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
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 bg-pure-black border-b ${
        scrolled ? "border-border-gray" : "border-transparent"
      }`}
      style={{ padding: "16px 32px" }}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        {/* brand wordmark */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-extrabold text-white text-base tracking-tight">
            Đòn Bẩy AI
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-text hidden sm:inline">
            v8.0
          </span>
        </Link>

        {/* desktop nav — left aligned, links in white Inter 600/16px */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => {
            const isActive = l.href.startsWith("/#") ? false : pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-[15px] font-semibold transition-colors ${
                  isActive
                    ? "text-pure-white"
                    : "text-helper-gray hover:text-pure-white"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* right-aligned outlined button */}
        <Link
          href="/khoa-hoc"
          className="hidden md:inline-flex items-center text-[15px] font-semibold text-pure-white border border-border-gray rounded-md"
          style={{ padding: "8px 16px" }}
        >
          Bắt đầu học
        </Link>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden p-2 text-pure-white"
          aria-label="Mở menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="md:hidden mt-4 pt-4 border-t border-border-gray">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-[15px] font-semibold text-helper-gray hover:text-pure-white"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/khoa-hoc"
              onClick={() => setOpen(false)}
              className="inline-flex justify-center items-center text-[15px] font-semibold text-pure-white border border-border-gray rounded-md"
              style={{ padding: "8px 16px" }}
            >
              Bắt đầu học
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
