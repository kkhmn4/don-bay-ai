"use client";

import Link from "next/link";
import { Leaf } from "lucide-react";

const NAV_LINKS = [
  { href: "/khoa-hoc", label: "Khóa học" },
  { href: "/video", label: "Video ngắn" },
  { href: "/#funnel", label: "Phễu" },
];

export function SiteFooter() {
  return (
    <footer className="bg-cream border-t border-hairline">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span
                className="font-sans font-medium text-deep-teal"
                style={{ fontSize: "22px", lineHeight: 1 }}
              >
                Đòn Bẩy AI
              </span>
              <Leaf className="w-5 h-5 text-deep-teal" strokeWidth={1.5} />
            </Link>
            <p className="font-sans text-mist leading-relaxed max-w-xs" style={{ fontSize: "15px" }}>
              Khóa học AI cho giáo viên Vật lý & Khoa học Tự nhiên.
              Giáo viên kiểm soát, AI tối ưu hiệu suất.
            </p>
          </div>

          {/* nav */}
          <div>
            <p className="font-sans font-medium text-ink mb-4" style={{ fontSize: "13px" }}>
              KHÁM PHÁ
            </p>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="font-sans text-mist hover:text-deep-teal transition-colors"
                  style={{ fontSize: "15px" }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* author */}
          <div>
            <p className="font-sans font-medium text-ink mb-4" style={{ fontSize: "13px" }}>
              SÁNG LẬP
            </p>
            <p className="font-sans font-medium text-ink mb-1" style={{ fontSize: "16px" }}>
              Thầy Kha Khung Hiệp
            </p>
            <p className="font-sans text-mist leading-relaxed" style={{ fontSize: "15px" }}>
              Chuyên gia ứng dụng AI & Lập trình mô phỏng dạy học tương tác.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-hairline flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-sans text-mist" style={{ fontSize: "13px" }}>
            © {new Date().getFullYear()} Đòn Bẩy AI · Thầy Kha Khung Hiệp
          </p>
          <p className="font-sans text-mist italic" style={{ fontSize: "13px" }}>
            Giáo viên kiểm soát, AI tối ưu hiệu suất.
          </p>
        </div>
      </div>
    </footer>
  );
}
