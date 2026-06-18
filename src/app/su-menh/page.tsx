"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GraduationCap, Sparkles, BookOpen, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { PageHero } from "@/components/site/page-hero";
import { SiteFooter } from "@/components/site/footer";

const MISSIONS = [
  {
    icon: GraduationCap,
    tag: "4.1",
    audience: "Đối với Giáo viên",
    title: "Giải phóng & Trao quyền",
    accent: "oklch(0.74 0.13 85)",
    points: [
      {
        sub: "Giải phóng thời gian",
        desc: "Giúp giáo viên rút ngắn thời gian chuẩn bị bài từ hàng giờ xuống hàng giây nhờ quy trình tự động hóa E2E — tạo slide từ tài liệu nguồn bằng NotebookLM, xuất PPTX bằng Marp CLI trong 3 giây, tự vẽ sơ đồ vector bằng TikZ Gem.",
      },
      {
        sub: "Trao quyền kiểm soát",
        desc: "Định hình quy trình kiểm duyệt chéo nội dung AI (ví dụ: bắt buộc giải toán 3 bước để kiểm tra sai số) giúp giáo viên hoàn toàn kiểm soát chuyên môn lớp học.",
      },
    ],
  },
  {
    icon: Sparkles,
    tag: "4.2",
    audience: "Đối với Học sinh",
    title: "Trực quan & Tương tác chủ động",
    accent: "oklch(0.62 0.08 145)",
    points: [
      {
        sub: "Bẻ gãy ngộ nhận (MythBusters)",
        desc: "Giúp học sinh vượt qua các ngộ nhận vật lý kinh điển thông qua bộ đề trắc nghiệm chẩn đoán Đúng/Sai 2025 — phát hiện và sửa chữa sai lầm khái niệm ngay từ gốc.",
      },
      {
        sub: "STEM thực tiễn",
        desc: "Kích thích tư duy khám phá qua mô phỏng tương tác SVG trên di động (dòng nhiệt chuyển động, nhiệt kế nảy lò xo Spring Bounce) và hoạt động học tập luân chuyển trạm tích hợp QR Code.",
      },
    ],
  },
  {
    icon: BookOpen,
    tag: "4.3",
    audience: "Đối với Học liệu",
    title: "Chuẩn hóa GEMS V6",
    accent: "oklch(0.55 0.06 50)",
    points: [
      {
        sub: "Đồng bộ hệ sinh thái",
        desc: "Bốn trụ cột G-E-M-S định nghĩa lại tiêu chuẩn học liệu Vật lý: đồ họa vector sắc nét, trải nghiệm giác quan, bố cục tối giản tinh tế và bản chất khoa học trung thực.",
      },
      {
        sub: "Tối ưu cho lớp học",
        desc: "Phối màu organic dịu mắt, in ấn trắng đen vẫn sắc nét (Grayscale optimize), bố cục 2 cột thoáng đãng — sẵn sàng cho mọi điều kiện infrastructure của trường học Việt Nam.",
      },
    ],
  },
];

export default function SuMenhPage() {
  return (
    <>
      <PageHero
        eyebrow="Sứ mệnh của dự án"
        title="Ba đối tượng —"
        italic="một sứ mệnh chung"
        subtitle="Mỗi đối tượng được trao một giá trị cụ thể, cùng hướng tới mục tiêu nâng tầm dạy học Vật lý Việt Nam."
      />

      {/* 3-column layout with sticky headers */}
      <section className="relative py-16 sm:py-20 px-5 sm:px-8 bg-secondary/40 overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none" aria-hidden />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {MISSIONS.map((m, i) => {
              const Icon = m.icon;
              return (
                <Reveal key={m.tag} delay={i * 130}>
                  <article className="h-full flex flex-col bg-card rounded-3xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-500">
                    {/* Sticky header */}
                    <div
                      className="p-7 sm:p-8 sticky top-20 z-10"
                      style={{
                        background: `linear-gradient(180deg, ${m.accent}15 0%, transparent 100%)`,
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <div className="flex items-start gap-4 mb-5">
                        <div
                          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl shrink-0"
                          style={{ background: `${m.accent}20`, color: m.accent }}
                        >
                          <Icon className="w-7 h-7" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p
                            className="text-[10px] tracking-[0.3em] uppercase font-semibold mb-1"
                            style={{ color: m.accent }}
                          >
                            Sứ mệnh {m.tag}
                          </p>
                          <p className="text-xs text-muted-foreground">{m.audience}</p>
                        </div>
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight">
                        {m.title}
                      </h3>
                      <div className="h-px w-12 mt-4" style={{ background: m.accent, opacity: 0.5 }} />
                    </div>

                    {/* Body */}
                    <div className="px-7 sm:px-8 pb-8 space-y-6">
                      {m.points.map((p, idx) => (
                        <div key={p.sub} className="flex gap-4">
                          <div className="shrink-0 mt-1">
                            <span
                              className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold font-serif italic"
                              style={{ background: `${m.accent}15`, color: m.accent }}
                            >
                              {idx + 1}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-serif text-lg text-foreground mb-1.5">{p.sub}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Unifying statement */}
      <section className="relative py-16 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="text-[11px] tracking-[0.3em] uppercase font-semibold text-accent mb-5">
              Mục tiêu chung
            </p>
            <p className="font-display text-2xl sm:text-3xl italic text-foreground/90 leading-snug">
              Giáo viên <span className="text-accent not-italic font-medium">giải phóng</span> thời gian,
              học sinh <span className="text-accent not-italic font-medium">chủ động</span> tương tác,
              học liệu <span className="text-accent not-italic font-medium">chuẩn hoá</span> sư phạm —
              một hệ sinh thái đồng bộ.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Next chapter */}
      <section className="relative py-16 px-5 sm:px-8 border-t border-border">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <Link
              href="/phieu"
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-foreground text-background font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-lg"
            >
              Chương 05 · Phễu tác động
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
