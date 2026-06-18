"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Compass, Zap, Layers, ArrowRight, Quote } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { PageHero } from "@/components/site/page-hero";
import { LeverDiagram } from "@/components/site/lever-diagram";
import { SiteFooter } from "@/components/site/footer";

export default function TrietLyPage() {
  return (
    <>
      <PageHero
        eyebrow="Triết lý vận hành cốt lõi"
        title="Chuyên môn làm"
        italic="điểm tựa"
        subtitle="Công nghệ AI làm đòn bẩy. Triết lý dự án dựa trên nguyên lý vật lý kinh điển của đòn bẩy — đơn giản nhưng uy lực thay đổi cả hệ thống dạy học."
        variant="dark"
      />

      {/* Big quote - dark immersive */}
      <section className="relative py-20 sm:py-28 px-5 sm:px-8 bg-foreground text-background overflow-hidden">
        <div className="absolute inset-0 bg-grain-dark opacity-40 pointer-events-none" aria-hidden />
        <div
          className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: "oklch(0.74 0.13 85)" }}
        />

        <div className="max-w-4xl mx-auto relative text-center">
          <Reveal>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-accent/30 mb-8">
              <Quote className="w-7 h-7 text-accent" />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p className="font-display text-3xl sm:text-4xl md:text-5xl leading-snug italic text-background/90">
              Khi có <span className="text-accent not-italic font-medium">điểm tựa vững chắc</span>,
              một lực nhỏ từ AI sẽ nâng toàn bộ hiệu suất dạy học lên
              <span className="text-accent not-italic font-medium"> gấp 10 lần</span>.
            </p>
          </Reveal>

          <Reveal delay={250}>
            <p className="mt-10 text-[11px] tracking-[0.3em] uppercase text-background/40">
              — Triết lý cốt lõi · Đòn Bẩy AI
            </p>
          </Reveal>
        </div>
      </section>

      {/* Lever diagram - hero centerpiece */}
      <section className="relative py-20 sm:py-28 px-5 sm:px-8 bg-foreground text-background">
        <div className="absolute inset-0 bg-grain-dark opacity-30 pointer-events-none" aria-hidden />
        <div className="max-w-6xl mx-auto relative">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-[11px] tracking-[0.3em] uppercase font-semibold text-accent mb-3">
                Sơ đồ nguyên lý
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-background leading-tight">
                Ba thành tố của <span className="italic text-accent">đòn bẩy</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="rounded-3xl border border-background/10 bg-background/5 backdrop-blur-sm p-6 sm:p-12">
              <LeverDiagram className="w-full h-auto" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Three pillars - dark cards */}
      <section className="relative py-20 sm:py-28 px-5 sm:px-8 bg-foreground text-background border-t border-background/10">
        <div className="absolute inset-0 bg-grain-dark opacity-30 pointer-events-none" aria-hidden />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Compass,
                label: "Điểm tựa",
                title: "Pivot Point",
                desc: "Chuyên môn, nghiệp vụ sư phạm và trách nhiệm của người giáo viên. Điểm tựa phải vững chắc — giáo viên làm chủ 100% nội dung, kiểm soát mọi thông tin đầu ra của AI.",
                color: "oklch(0.82 0.13 85)",
              },
              {
                icon: Zap,
                label: "Lực tác động",
                title: "Force Input",
                desc: "Sự hỗ trợ tốc độ từ các mô hình AI — Gemini Gems, Google NotebookLM, Marp CLI, HTML-to-Video — biến công việc giờ thành giây.",
                color: "oklch(0.74 0.13 85)",
              },
              {
                icon: Layers,
                label: "Vật nâng",
                title: "Load",
                desc: "Khối lượng công việc soạn giáo án, thiết kế slide, vẽ hình vector, soạn đề thi và chấm bài — được nâng nhẹ nhàng nhờ đòn bẩy.",
                color: "oklch(0.62 0.08 145)",
              },
            ].map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={i * 120}>
                  <div className="group h-full p-7 rounded-2xl border border-background/10 bg-background/[0.03] hover:bg-background/[0.06] transition-all duration-500">
                    <div
                      className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5"
                      style={{ background: `${p.color}20`, color: p.color }}
                    >
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <p
                      className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-1"
                      style={{ color: p.color }}
                    >
                      {p.label}
                    </p>
                    <h3 className="font-serif text-2xl mb-3 text-background">{p.title}</h3>
                    <p className="text-sm text-background/65 leading-relaxed">{p.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Warning note */}
      <section className="relative py-16 px-5 sm:px-8 bg-foreground text-background border-t border-background/10">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="p-6 sm:p-8 rounded-2xl border border-accent/30 bg-accent/5">
              <p className="text-[10px] uppercase tracking-[0.3em] font-semibold text-accent mb-3">
                ⚠ Lưu ý cốt lõi
              </p>
              <p className="text-base sm:text-lg text-background/85 leading-relaxed">
                Nếu điểm tựa chuyên môn bị lỏng lẻo — giáo viên tin tưởng mù quáng vào AI mà không
                kiểm duyệt — lực đẩy của AI sẽ làm <strong className="text-accent">sụp đổ hệ thống kiến thức</strong>,
                gây ảo giác và sai số vật lý.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Next chapter CTA - dark */}
      <section className="relative py-16 px-5 sm:px-8 bg-foreground text-background border-t border-background/10">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <Link
              href="/tam-nhin"
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-accent text-accent-foreground font-medium hover:bg-background hover:text-foreground transition-all duration-300 shadow-lg"
            >
              Chương 03 · Tầm nhìn 2030
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>

      <SiteFooter dark />
    </>
  );
}
