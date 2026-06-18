"use client";

import Link from "next/link";

const NAV_LINKS = [
  { href: "/khoa-hoc", label: "Khóa học" },
  { href: "/video", label: "Video ngắn" },
  { href: "/#funnel", label: "Phễu" },
];

export function SiteFooter() {
  return (
    <footer className="bg-pure-black border-t border-border-gray">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* brand */}
          <Link href="/" className="flex flex-col">
            <span className="font-extrabold text-pure-white text-base tracking-tight">
              Đòn Bẩy AI
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-text mt-1">
              v8.0 · Kha Khung Hiệp
            </span>
          </Link>

          {/* nav */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[15px] font-semibold text-helper-gray hover:text-pure-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-border-gray flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[13px] text-muted-text">
            © {new Date().getFullYear()} Đòn Bẩy AI · Thầy Kha Khung Hiệp
          </p>
          <p className="text-[13px] text-muted-text font-medium">
            Giáo viên kiểm soát, AI tối ưu hiệu suất.
          </p>
        </div>
      </div>
    </footer>
  );
}
