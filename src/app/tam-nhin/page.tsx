"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Target, Microscope, Users, ArrowRight, Calendar } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { PageHero } from "@/components/site/page-hero";
import { SiteFooter } from "@/components/site/footer";

const MILESTONES = [
  {
    year: "2024",
    icon: Target,
    tag: "Định vị",
    title: "Cổng học liệu số #1",
    desc: "Trở thành cổng học liệu và trợ lý AI thực chiến số 1 tại Việt Nam dành cho giáo viên Vật lý và Khoa học Tự nhiên THPT bám sát chương trình GDPT 2018.",
    detail: "Mọi tài nguyên — từ phiếu học tập, prompt Gemini, đến code TikZ — đều được đồng bộ và miễn phí cho giáo viên.",
    accent: "oklch(0.74 0.13 85)",
  },
  {
    year: "2026",
    icon: Microscope,
    tag: "Tác động giáo dục",
    title: "Tiên phong GEMS V6",
    desc: "Dẫn dắt phương pháp thiết kế tài liệu chuẩn sư phạm GEMS V6 kết hợp kỹ thuật lập trình đồ họa tương tác (Edu-Graphic) vào lớp học tích cực.",
    detail: "Đồ họa vector TikZ, mô phỏng SVG tương tác, video dọc HTML-Video — tất cả hội tụ trong một chuẩn duy nhất.",
    accent: "oklch(0.62 0.08 145)",
  },
  {
    year: "2030",
    icon: Users,
    tag: "Cộng đồng",
    title: "Giáo viên chuyển đổi số",
    desc: "Xây dựng thế hệ giáo viên chuyển đổi số thực chiến — đứng trên vai khổng lồ của công nghệ nhưng luôn nắm giữ quyền kiểm soát sư phạm cao nhất.",
    detail: "Một thế hệ giáo viên không bị AI thay thế, mà làm chủ AI — biến công nghệ thành đòn bẩy nâng tầm lớp học.",
    accent: "oklch(0.55 0.06 50)",
  },
];

export default function TamNhinPage() {
  return (
    <>
      <PageHero
        eyebrow="Tầm nhìn 2030"
        title="Mười năm tới —"
        italic="một tầm nhìn dài hạn"
        subtitle="Định vị rõ ràng, tác động giáo dục sâu rộng, và một cộng đồng giáo viên thực chiến vững mạnh — ba mốc trên hành trình của Đòn Bẩy AI."
      />

      {/* Timeline */}
      <section className="relative py-20 sm:py-28 px-5 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" aria-hidden />
        <div className="max-w-6xl mx-auto relative">
          {/* Horizontal timeline line (desktop) */}
          <div className="hidden md:block absolute top-32 left-[10%] right-[10%] h-px bg-gradient-to-r from-accent/20 via-accent/40 to-accent/20" />

          <div className="grid md:grid-cols-3 gap-8 md:gap-6 relative">
            {MILESTONES.map((m, i) => {
              const Icon = m.icon;
              return (
                <Reveal key={m.year} delay={i * 150}>
                  <div className="relative flex flex-col items-center text-center">
                    {/* Year badge on timeline */}
                    <div className="relative mb-6 z-10">
                      <div
                        className="absolute inset-0 rounded-full blur-xl opacity-30"
                        style={{ background: m.accent }}
                      />
                      <div
                        className="relative w-20 h-20 rounded-full flex items-center justify-center border-2 bg-card shadow-xl"
                        style={{ borderColor: m.accent }}
                      >
                        <Icon className="w-9 h-9" style={{ color: m.accent }} strokeWidth={1.5} />
                      </div>
                      <span
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold font-serif italic text-background whitespace-nowrap"
                        style={{ background: m.accent }}
                      >
                        {m.year}
                      </span>
                    </div>

                    <p
                      className="text-[10px] uppercase tracking-[0.3em] font-semibold mt-4 mb-2"
                      style={{ color: m.accent }}
                    >
                      {m.tag}
                    </p>
                    <h3 className="font-serif text-2xl text-foreground mb-4 leading-tight">
                      {m.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-xs">
                      {m.desc}
                    </p>
                    <p className="text-xs text-foreground/70 italic leading-relaxed max-w-xs font-display text-base">
                      {m.detail}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Image banner */}
      <section className="relative px-5 sm:px-8 pb-20">
        <Reveal>
          <div className="max-w-7xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl">
            <div className="aspect-[21/9] sm:aspect-[3/1]">
              <img
                src="https://sfile.chatglm.cn/images-ppt/378e39681c7e.jpg"
                alt="Tầm nhìn tương lai giáo dục công nghệ"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/60 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-xl px-8 sm:px-14 text-background">
                <p className="text-[10px] tracking-[0.3em] uppercase text-accent mb-3 flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  2030
                </p>
                <p className="font-serif text-2xl sm:text-4xl leading-tight">
                  Đứng trên vai khổng lồ công nghệ, giữ vững quyền kiểm soát sư phạm.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Final commitment */}
      <section className="relative py-16 px-5 sm:px-8 bg-secondary/40">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="text-[11px] tracking-[0.3em] uppercase font-semibold text-accent mb-5">
              Cam kết dài hạn
            </p>
            <p className="font-display text-2xl sm:text-3xl italic text-foreground/90 leading-snug">
              Mỗi tài nguyên chia sẻ — mỗi prompt Gemini, mỗi phiếu học tập GEMS —
              đều là một <span className="text-accent not-italic font-medium">viên gạch</span> xây
              nên cổng học liệu số #1 cho giáo viên Việt Nam.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Next chapter */}
      <section className="relative py-16 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <Link
              href="/su-menh"
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-foreground text-background font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-lg"
            >
              Chương 04 · Sứ mệnh
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
