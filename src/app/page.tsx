"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Sparkles,
  ArrowDown,
  ArrowRight,
  BookOpen,
  Compass,
  Target,
  Rocket,
  Filter,
  Layers,
  Gem,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { SiteFooter } from "@/components/site/footer";

const PAGES = [
  {
    href: "/boi-canh",
    eyebrow: "Chương 01",
    title: "Bối cảnh & Khát vọng",
    desc: "Nghịch lý của giáo viên Việt Nam giữa làn sóng AI bùng nổ — và khát vọng chấm dứt ứng dụng AI hời hợt.",
    icon: BookOpen,
    accent: "oklch(0.62 0.08 145)",
    layout: "Magazine",
  },
  {
    href: "/triet-ly",
    eyebrow: "Chương 02",
    title: "Triết lý vận hành",
    desc: "Chuyên môn giáo viên làm điểm tựa — Công nghệ AI làm đòn bẩy. Sơ đồ vật lý kinh điển minh hoạ.",
    icon: Compass,
    accent: "oklch(0.74 0.13 85)",
    layout: "Dark immersive",
  },
  {
    href: "/tam-nhin",
    eyebrow: "Chương 03",
    title: "Tầm nhìn 2030",
    desc: "Định vị cổng học liệu số #1, tiên phong GEMS V6, và xây dựng cộng đồng giáo viên chuyển đổi số.",
    icon: Target,
    accent: "oklch(0.55 0.06 50)",
    layout: "Timeline",
  },
  {
    href: "/su-menh",
    eyebrow: "Chương 04",
    title: "Sứ mệnh của dự án",
    desc: "Ba đối tượng — một sứ mệnh chung. Giải phóng giáo viên, trực quan cho học sinh, chuẩn hoá học liệu.",
    icon: Rocket,
    accent: "oklch(0.45 0.045 165)",
    layout: "3-Column",
  },
  {
    href: "/phieu",
    eyebrow: "Chương 05",
    title: "Mô hình phễu tác động",
    desc: "Phễu khép kín từ video ngắn → website portal → phiếu học tập → lớp học tích cực QR Code.",
    icon: Filter,
    accent: "oklch(0.74 0.13 85)",
    layout: "Funnel",
  },
  {
    href: "/15-bai",
    eyebrow: "Chương 06",
    title: "15 Bài học hành động",
    desc: "Lộ trình thực chiến — ba Module, mười lăm bài — bám sát tiến trình soạn giảng E2E.",
    icon: Layers,
    accent: "oklch(0.62 0.08 145)",
    layout: "Modules",
  },
  {
    href: "/gems",
    eyebrow: "Chương 07",
    title: "GEMS V6 — Bốn trụ cột",
    desc: "G · E · M · S — Graphic, Experiential, Minimalist, Scientific Realism. Chuẩn sư phạm học liệu.",
    icon: Gem,
    accent: "oklch(0.55 0.06 50)",
    layout: "Showcase",
  },
];

/* ---------------- Hero ---------------- */
function HomeHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-foreground text-background"
    >
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.28 0.04 165) 0%, oklch(0.2 0.025 165) 45%, oklch(0.16 0.02 165) 100%)",
          }}
        />
        <div
          className="absolute -top-32 right-0 w-[60vw] h-[60vw] rounded-full opacity-25 blur-3xl animate-pulse-glow"
          style={{ background: "oklch(0.74 0.13 85 / 0.5)" }}
        />
        <div
          className="absolute bottom-0 -left-20 w-[40vw] h-[40vw] rounded-full opacity-20 blur-3xl"
          style={{ background: "oklch(0.62 0.08 145 / 0.4)" }}
        />
        <div className="absolute inset-0 bg-grain-dark opacity-60" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.08]" aria-hidden>
          <defs>
            <pattern id="heroGrid" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M 64 0 L 0 0 0 64" fill="none" stroke="oklch(0.82 0.13 85)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)" />
        </svg>
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-5 sm:px-8 pt-32 pb-20 text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-background/15 bg-background/5 backdrop-blur-sm mb-10"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-medium text-background/80">
              Tuyên Ngôn · Tầm Nhìn · Sứ Mệnh
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.95] tracking-tight"
          >
            <span className="block italic font-light text-background/90">Dự án</span>
            <span className="block text-gold-gradient font-semibold">Đòn Bẩy AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-2xl text-base sm:text-lg md:text-xl text-background/70 font-light leading-relaxed"
          >
            Bảy chương — bảy góc nhìn. Khám phá triết lý, tầm nhìn, sứ mệnh và
            lộ trình thực chiến của dự án, mỗi chương một thiết kế riêng.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45 }}
            className="mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
          >
            <div className="h-px w-12 bg-accent/40 hidden sm:block" />
            <div className="text-center sm:text-left">
              <p className="font-serif italic text-lg text-background/90">Thầy Kha Khung Hiệp</p>
              <p className="text-[11px] tracking-[0.3em] uppercase text-background/50 mt-1">
                GEMS Physics Leader
              </p>
            </div>
            <div className="h-px w-12 bg-accent/40 hidden sm:block" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-14 flex flex-col sm:flex-row gap-4 items-center"
          >
            <a
              href="#chapters"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-accent-foreground font-medium hover:bg-background hover:text-foreground transition-all duration-300 shadow-lg shadow-accent/20"
            >
              Khám phá 7 chương
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>
            <Link
              href="/15-bai"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-background/20 text-background/90 hover:border-accent hover:text-accent transition-colors duration-300"
            >
              Lộ trình 15 bài
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-background/40"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Cuộn xuống</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-accent/60 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------------- Chapter cards ---------------- */
function ChapterGrid() {
  return (
    <section id="chapters" className="relative py-24 sm:py-32 px-5 sm:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" aria-hidden />
      <div className="max-w-7xl mx-auto relative">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2.5 mb-5 justify-center">
              <span className="h-px w-8 bg-accent/60" />
              <span className="text-[11px] tracking-[0.3em] uppercase font-semibold text-accent">
                Bảy chương — Bảy góc nhìn
              </span>
              <span className="h-px w-8 bg-accent/60" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-foreground tracking-tight">
              Mỗi chương một <span className="italic font-light text-accent">thiết kế riêng</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Từ layout magazine, dark immersive, timeline, đến showcase —
              mỗi chương kể câu chuyện của Đòn Bẩy AI theo một ngôn ngữ visual phù hợp.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PAGES.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.href} delay={i * 80}>
                <Link
                  href={p.href}
                  className="group relative block h-full p-7 rounded-2xl bg-card border border-border hover:border-foreground/20 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                >
                  {/* corner number */}
                  <span className="absolute top-5 right-6 font-serif italic text-5xl text-accent/10 group-hover:text-accent/20 transition-colors leading-none">
                    0{i + 1}
                  </span>

                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5 transition-colors duration-500"
                    style={{ background: `${p.accent}20`, color: p.accent }}
                  >
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>

                  <p
                    className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-1"
                    style={{ color: p.accent }}
                  >
                    {p.eyebrow}
                  </p>
                  <h3 className="font-serif text-2xl text-foreground mb-3 leading-tight">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {p.desc}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/40">
                      {p.layout}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
                      Đọc chương
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}

          {/* CTA card */}
          <Reveal delay={PAGES.length * 80}>
            <Link
              href="/15-bai"
              className="group relative block h-full p-7 rounded-2xl bg-foreground text-background border border-foreground hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              <div
                className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-30 blur-2xl"
                style={{ background: "oklch(0.74 0.13 85)" }}
              />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/20 text-accent mb-5">
                  <Sparkles className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <p className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-1 text-accent">
                  Bắt đầu ngay
                </p>
                <h3 className="font-serif text-2xl text-background mb-3 leading-tight">
                  Khám phá toàn bộ lộ trình
                </h3>
                <p className="text-sm text-background/60 leading-relaxed mb-5">
                  Bắt đầu từ Bối cảnh đến GEMS V6 — một hành trình xuyên suốt
                  triết lý sư phạm kiểm soát.
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-background/10">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-background/40">
                    Lộ trình E2E
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
                    Bắt đầu
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>

      <SiteFooter />
    </section>
  );
}

/* ---------------- Page ---------------- */
export default function Home() {
  return (
    <>
      <HomeHero />
      <ChapterGrid />
    </>
  );
}
