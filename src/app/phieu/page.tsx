"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Video,
  Globe,
  FileText,
  Bot,
  QrCode,
  School,
  ArrowRight,
  ArrowDown,
  Filter,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { ImpactFunnel } from "@/components/site/impact-funnel";
import { SiteFooter } from "@/components/site/footer";

export default function PhieuPage() {
  return (
    <>
      {/* Dark hero */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20 px-5 sm:px-8 bg-foreground text-background overflow-hidden">
        <div className="absolute inset-0 bg-grain-dark opacity-40 pointer-events-none" aria-hidden />
        <div
          className="absolute -top-20 right-0 w-[40vw] h-[40vw] rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: "oklch(0.74 0.13 85)" }}
        />

        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-xs mb-8"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-background/60 hover:text-accent transition-colors"
            >
              ← Trang chủ
            </Link>
            <span className="text-background/30">/</span>
            <span className="text-accent font-medium">Phễu tác động</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 mb-5"
          >
            <span className="h-px w-8 bg-accent/60" />
            <span className="text-[11px] tracking-[0.3em] uppercase font-semibold text-accent">
              Chương 05 · Mô hình phễu
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight"
          >
            Phễu khép kín — <span className="italic font-light text-accent">tối đa giá trị chia sẻ</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl text-background/70"
          >
            Dự án Đòn Bẩy AI vận hành theo mô hình phễu khép kín — từ tiếp cận cộng đồng
            đến ứng dụng thực tế tại lớp học.
          </motion.p>
        </div>
      </section>

      {/* Vertical narrative funnel - large visual stages */}
      <section className="relative py-20 sm:py-28 px-5 sm:px-8 bg-foreground text-background">
        <div className="absolute inset-0 bg-grain-dark opacity-30 pointer-events-none" aria-hidden />
        <div className="max-w-4xl mx-auto relative">
          {/* Stage 1 */}
          <Reveal>
            <FunnelStage
              number="01"
              icon={Video}
              title="Kênh Video Ngắn"
              meta="TikTok · Shorts · Reels"
              desc="Chia sẻ mẹo thực chiến và hiệu ứng WOW để thu hút giáo viên Việt Nam tiếp cận dự án."
              accent="oklch(0.74 0.13 85)"
            />
          </Reveal>

          <FunnelConnector />

          {/* Stage 2 */}
          <Reveal delay={100}>
            <FunnelStage
              number="02"
              icon={Globe}
              title="Website EdTech Portal"
              meta="Bài giảng chi tiết"
              desc="Cổng học liệu trung tâm — nơi mọi tài nguyên hội tụ, từ prompt đến phiếu học tập."
              accent="oklch(0.62 0.08 145)"
            />
          </Reveal>

          <FunnelConnector split />

          {/* Stage 3 + 4 - parallel */}
          <div className="grid sm:grid-cols-2 gap-6 my-8">
            <Reveal delay={150}>
              <FunnelStage
                number="03"
                icon={FileText}
                title="Phiếu học tập GEMS"
                meta="& Code TikZ Vector"
                desc="Tải miễn phí — sẵn sàng mang vào lớp."
                accent="oklch(0.55 0.06 50)"
                compact
              />
            </Reveal>
            <Reveal delay={250}>
              <FunnelStage
                number="04"
                icon={Bot}
                title="9 Prompt Gemini Gems"
                meta="& NotebookLM"
                desc="Bộ prompts đã chuẩn hoá — sao chép & dùng ngay."
                accent="oklch(0.45 0.045 165)"
                compact
              />
            </Reveal>
          </div>

          <FunnelConnector merge />

          {/* Stage 5 */}
          <Reveal delay={150}>
            <FunnelStage
              number="05"
              icon={QrCode}
              title="Lớp học tích cực"
              meta="Luân chuyển trạm · QR Code"
              desc="Ứng dụng thực tế — học sinh tương tác chủ động với các trạm học tập số hoá."
              accent="oklch(0.74 0.13 85)"
            />
          </Reveal>
        </div>
      </section>

      {/* Interactive funnel view */}
      <section className="relative py-20 sm:py-28 px-5 sm:px-8 bg-background">
        <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" aria-hidden />
        <div className="max-w-7xl mx-auto relative">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-[11px] tracking-[0.3em] uppercase font-semibold text-accent mb-5">
                Tổng quan trực quan
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight">
                Toàn bộ <span className="italic text-accent">phễu tác động</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <ImpactFunnel />
          </Reveal>
        </div>
      </section>

      {/* Stats banner */}
      <section className="relative py-16 px-5 sm:px-8 bg-secondary/40">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Video, value: "3 nền tảng", label: "Video ngắn" },
              { icon: Globe, value: "1 portal", label: "Website trung tâm" },
              { icon: Bot, value: "9 prompts", label: "Gemini Gems" },
              { icon: School, value: "∞ lớp học", label: "Ứng dụng thực tế" },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.label} delay={i * 80}>
                  <div className="text-center p-5 rounded-2xl bg-card border border-border">
                    <Icon className="w-7 h-7 mx-auto mb-3 text-accent" strokeWidth={1.5} />
                    <p className="font-serif italic text-2xl text-foreground mb-1">{s.value}</p>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {s.label}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Next chapter */}
      <section className="relative py-16 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <Link
              href="/15-bai"
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-foreground text-background font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-lg"
            >
              Chương 06 · 15 Bài học
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>

      <SiteFooter dark />
    </>
  );
}

/* Helper components */
function FunnelStage({
  number,
  icon: Icon,
  title,
  meta,
  desc,
  accent,
  compact = false,
}: {
  number: string;
  icon: React.ElementType;
  title: string;
  meta: string;
  desc: string;
  accent: string;
  compact?: boolean;
}) {
  return (
    <div
      className="relative p-6 sm:p-8 rounded-2xl border bg-background/[0.04] backdrop-blur-sm"
      style={{ borderColor: `${accent}40` }}
    >
      <div className="flex items-start gap-5">
        <div className="shrink-0">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-2xl blur-xl opacity-30"
              style={{ background: accent }}
            />
            <div
              className="relative w-16 h-16 rounded-2xl flex items-center justify-center border-2"
              style={{ borderColor: accent, background: "oklch(0.18 0.025 165)" }}
            >
              <Icon className="w-8 h-8" style={{ color: accent }} strokeWidth={1.5} />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span
              className="font-serif italic text-2xl font-bold"
              style={{ color: accent }}
            >
              {number}
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.25em] font-semibold"
              style={{ color: accent }}
            >
              {meta}
            </span>
          </div>
          <h3 className={`font-serif ${compact ? "text-xl" : "text-2xl sm:text-3xl"} text-background mb-3 leading-tight`}>
            {title}
          </h3>
          <p className={`text-muted-foreground ${compact ? "text-sm" : "text-base"} leading-relaxed`}>
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}

function FunnelConnector({ split = false, merge = false }: { split?: boolean; merge?: boolean }) {
  if (split) {
    return (
      <div className="flex justify-center my-6">
        <svg width="200" height="60" viewBox="0 0 200 60" fill="none">
          <path d="M 100 0 L 100 20 L 30 20 L 30 60" stroke="oklch(0.74 0.13 85 / 0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M 100 20 L 170 20 L 170 60" stroke="oklch(0.74 0.13 85 / 0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
        </svg>
      </div>
    );
  }
  if (merge) {
    return (
      <div className="flex justify-center my-6">
        <svg width="200" height="60" viewBox="0 0 200 60" fill="none">
          <path d="M 30 0 L 30 40 L 100 40 L 100 60" stroke="oklch(0.74 0.13 85 / 0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M 170 0 L 170 40 L 100 40" stroke="oklch(0.74 0.13 85 / 0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
        </svg>
      </div>
    );
  }
  return (
    <div className="flex justify-center my-6">
      <ArrowDown className="w-6 h-6 text-accent/60 animate-pulse" />
    </div>
  );
}
