"use client";

import Link from "next/link";

const NAV_LINKS = [
  { href: "/khoa-hoc", label: "Khóa học" },
  { href: "/video", label: "Video ngắn" },
  { href: "/#funnel", label: "Phễu" },
];

export function SiteFooter({ dark = false }: { dark?: boolean }) {
  return (
    <footer className={dark ? "bg-background text-foreground/60 border-t border-foreground/10" : "bg-foreground text-background/60 border-t border-background/10"}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <svg viewBox="0 0 40 40" className="w-8 h-8">
              <polygon points="20,4 36,32 4,32" fill={dark ? "oklch(0.36 0.045 165)" : "oklch(0.74 0.13 85)"} />
              <rect x="6" y="22" width="28" height="2.5" rx="1" fill={dark ? "oklch(0.985 0.012 95)" : "oklch(0.18 0.025 165)"} />
              <circle cx="20" cy="32" r="3" fill={dark ? "oklch(0.985 0.012 95)" : "oklch(0.18 0.025 165)"} />
            </svg>
            <div>
              <p className={`font-serif text-sm ${dark ? "text-foreground/90" : "text-background/90"}`}>Đòn Bẩy AI v8.0</p>
              <p className={`text-[10px] tracking-[0.25em] uppercase ${dark ? "text-foreground/40" : "text-background/40"}`}>
                Kha Khung Hiệp · GEMS Physics
              </p>
            </div>
          </Link>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-accent transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className={`mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] ${dark ? "border-foreground/10 text-foreground/40" : "border-background/10 text-background/40"}`}>
          <p>© {new Date().getFullYear()} Đòn Bẩy AI · Thầy Kha Khung Hiệp</p>
          <p className="italic font-serif">Giáo viên kiểm soát, AI tối ưu hiệu suất.</p>
        </div>
      </div>
    </footer>
  );
}
