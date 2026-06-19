"use client";

import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/khoa-hoc", label: "Khóa học" },
  { href: "/video", label: "Video ngắn" },
  { href: "/#funnel", label: "Phễu" },
];

export function SiteFooter({ dark = false }: { dark?: boolean }) {
  return (
    <footer className={dark ? "bg-obsidian text-snow" : "bg-obsidian text-snow"}>
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-mist shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Đòn Bẩy AI logo"
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </div>
              <div>
                <p className="font-bold text-snow text-base tracking-tight">Đòn Bẩy AI</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-steel mt-0.5">
                  v8.0 · Kha Khung Hiệp
                </p>
              </div>
            </Link>
            <p className="text-[14px] text-ash leading-relaxed max-w-xs">
              Khóa học AI cho giáo viên Vật lý & Khoa học Tự nhiên.
              Giáo viên kiểm soát, AI tối ưu hiệu suất.
            </p>
          </div>

          {/* nav */}
          <div>
            <p className="text-[12px] uppercase tracking-[0.2em] font-semibold text-steel mb-4">
              Khám phá
            </p>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-[14px] text-ash hover:text-snow transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* author */}
          <div>
            <p className="text-[12px] uppercase tracking-[0.2em] font-semibold text-steel mb-4">
              Sáng lập
            </p>
            <p className="font-bold text-snow text-[16px] mb-1">Thầy Kha Khung Hiệp</p>
            <p className="text-[14px] text-ash leading-relaxed">
              Chuyên gia ứng dụng AI & Lập trình mô phỏng dạy học tương tác.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-graphite/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[12px] text-steel">
            © {new Date().getFullYear()} Đòn Bẩy AI · Thầy Kha Khung Hiệp
          </p>
          <p className="text-[12px] text-steel italic">
            Giáo viên kiểm soát, AI tối ưu hiệu suất.
          </p>
        </div>
      </div>
    </footer>
  );
}
