"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Cpu, PenTool, QrCode, ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { PageHero } from "@/components/site/page-hero";
import { SiteFooter } from "@/components/site/footer";

const MODULES = [
  {
    no: "Module 01",
    range: "Bài 1 — 5",
    title: "Hệ sinh thái AI Soạn Giảng",
    icon: Cpu,
    desc: "Thiết lập Gemini Gems, NotebookLM, Marp CLI để sinh slide PowerPoint màu giấy kem organic và phiếu học tập từ tài liệu nguồn chỉ với 1 click.",
    lessons: [
      "Thiết lập Gemini Custom Gems",
      "NotebookLM — tổng hợp tài liệu",
      "Marp CLI — xuất PPTX trong 3 giây",
      "Phiếu học tập GEMS tự động",
      "Quy trình E2E hoàn chỉnh",
    ],
    accent: "oklch(0.74 0.13 85)",
  },
  {
    no: "Module 02",
    range: "Bài 6 — 10",
    title: "Đồ họa & Trực quan hóa",
    icon: PenTool,
    desc: "Lập trình Edu-Graphic, tự động xuất video dọc hoạt họa bằng HTML-Video CLI, vẽ hình vector TikZ sắc nét và lập trình mô phỏng tương tác SVG có độ nảy vật lý.",
    lessons: [
      "Edu-Graphic — lập trình đồ họa",
      "HTML-Video CLI — video dọc",
      "TikZ — vector phóng 1000%",
      "SVG tương tác có vật lý",
      "Spring Bounce — mô phỏng nảy",
    ],
    accent: "oklch(0.62 0.08 145)",
  },
  {
    no: "Module 03",
    range: "Bài 11 — 15",
    title: "Đánh giá & Lớp học Số",
    icon: QrCode,
    desc: "Ra đề thi Đúng/Sai chẩn đoán ngộ nhận 2025, cấu hình AI trợ lý chấm bài tự luận viết tay theo barem điểm và thiết kế lớp học xoay trạm số hóa bằng QR Code.",
    lessons: [
      "Đề Đúng/Sai chẩn đoán 2025",
      "AI chấm tự luận theo barem",
      "Lớp học xoay trạm số hóa",
      "Tích hợp QR Code",
      "Đánh giá & phản hồi học sinh",
    ],
    accent: "oklch(0.55 0.06 50)",
  },
];

export default function BaiHocPage() {
  return (
    <>
      <PageHero
        eyebrow="15 Bài học hành động đồng bộ 1-1"
        title="Lộ trình thực chiến —"
        italic="ba Module, mười lăm bài"
        subtitle="Dự án hiện thực hóa tầm nhìn thông qua lộ trình 15 bài giảng thực chiến, chia làm 3 Module chính bám sát tiến trình soạn giảng."
      />

      {/* Module alternating layout */}
      <section className="relative py-20 sm:py-28 px-5 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" aria-hidden />
        <div className="max-w-6xl mx-auto relative space-y-20 sm:space-y-28">
          {MODULES.map((m, i) => {
            const Icon = m.icon;
            const isReversed = i % 2 === 1;
            return (
              <Reveal key={m.no} delay={i * 100}>
                <article className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Number/visual side */}
                  <div className={`lg:col-span-5 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                    <div
                      className="relative aspect-square max-w-md mx-auto rounded-3xl flex items-center justify-center overflow-hidden"
                      style={{ background: `linear-gradient(135deg, ${m.accent}15 0%, ${m.accent}05 100%)` }}
                    >
                      {/* giant number */}
                      <span
                        className="font-serif italic font-bold text-[18rem] leading-none select-none pointer-events-none"
                        style={{ color: `${m.accent}25` }}
                      >
                        0{i + 1}
                      </span>
                      {/* icon badge */}
                      <div className="absolute top-6 left-6 flex items-center gap-3">
                        <div
                          className="inline-flex items-center justify-center w-12 h-12 rounded-2xl"
                          style={{ background: `${m.accent}25`, color: m.accent }}
                        >
                          <Icon className="w-6 h-6" strokeWidth={1.5} />
                        </div>
                      </div>
                      {/* label */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <p
                          className="text-[10px] uppercase tracking-[0.3em] font-semibold mb-1"
                          style={{ color: m.accent }}
                        >
                          {m.no}
                        </p>
                        <p className="font-serif italic text-foreground/70 text-sm">{m.range}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content side */}
                  <div className={`lg:col-span-7 ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
                    <h3 className="font-serif text-3xl sm:text-4xl text-foreground mb-5 leading-tight">
                      {m.title}
                    </h3>
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
                      {m.desc}
                    </p>

                    <div className="space-y-3">
                      {m.lessons.map((l, idx) => (
                        <div
                          key={l}
                          className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:border-foreground/15 transition-colors"
                        >
                          <span
                            className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold font-serif italic shrink-0"
                            style={{ background: `${m.accent}20`, color: m.accent }}
                          >
                            {idx + 1}
                          </span>
                          <span className="text-sm text-foreground/85 flex-1">{l}</span>
                          <CheckCircle2 className="w-4 h-4" style={{ color: m.accent }} strokeWidth={1.5} />
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Summary stats */}
      <section className="relative py-16 px-5 sm:px-8 bg-foreground text-background">
        <div className="absolute inset-0 bg-grain-dark opacity-30 pointer-events-none" aria-hidden />
        <div className="max-w-5xl mx-auto relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "3", label: "Modules" },
              { value: "15", label: "Bài học" },
              { value: "9", label: "Prompts Gemini" },
              { value: "∞", label: "Ứng dụng thực tế" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div className="text-center">
                  <p className="font-serif italic text-5xl sm:text-6xl text-gold-gradient font-bold mb-2">
                    {s.value}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-background/50">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-16 px-5 sm:px-8 bg-foreground text-background border-t border-background/10">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="font-display text-2xl sm:text-3xl italic text-background/90 leading-snug mb-8">
              "Mỗi bài học — một đòn bẩy. Mỗi Module — một hệ sinh thái. Cả 15 bài —
              <span className="text-accent not-italic font-medium"> một cuộc cách mạng</span> trong soạn giảng."
            </p>
            <Link
              href="/gems"
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-accent text-accent-foreground font-medium hover:bg-background hover:text-foreground transition-all duration-300 shadow-lg"
            >
              Chương 07 · GEMS V6
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>

      <SiteFooter dark />
    </>
  );
}
