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
  Filter,
  Layers,
  Gem,
  Quote,
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
    image: "https://sfile.chatglm.cn/images-ppt/c93745097fd2.jpg",
  },
  {
    href: "/tam-nhin",
    eyebrow: "Chương 02",
    title: "Triết lý · Tầm nhìn · Sứ mệnh",
    desc: "Chuyên môn làm điểm tựa — AI làm đòn bẩy. Tầm nhìn 2030 và sứ mệnh ba đối tượng hợp nhất trong một trang.",
    icon: Compass,
    accent: "oklch(0.74 0.13 85)",
    layout: "Merged 3-in-1",
    image: "https://sfile.chatglm.cn/images-ppt/478c06e221cf.jpg",
  },
  {
    href: "/phieu",
    eyebrow: "Chương 03",
    title: "Mô hình phễu tác động",
    desc: "Phễu khép kín từ video ngắn → website portal → phiếu học tập → lớp học tích cực QR Code.",
    icon: Filter,
    accent: "oklch(0.74 0.13 85)",
    layout: "Funnel",
    image: "https://sfile.chatglm.cn/images-ppt/022751ed6abd.jpg",
  },
  {
    href: "/15-bai",
    eyebrow: "Chương 04",
    title: "15 Bài học hành động",
    desc: "Lộ trình thực chiến — ba Module, mười lăm bài — bám sát tiến trình soạn giảng E2E.",
    icon: Layers,
    accent: "oklch(0.62 0.08 145)",
    layout: "Modules",
    image: "https://sfile.chatglm.cn/images-ppt/53e0e8de6eb5.jpeg",
  },
  {
    href: "/gems",
    eyebrow: "Chương 05",
    title: "GEMS V6 — Bốn trụ cột",
    desc: "G · E · M · S — Graphic, Experiential, Minimalist, Scientific Realism. Chuẩn sư phạm học liệu.",
    icon: Gem,
    accent: "oklch(0.55 0.06 50)",
    layout: "Showcase",
    image: "https://sfile.chatglm.cn/images-ppt/db1f6315d5d4.jpg",
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
            Năm chương — năm góc nhìn. Khám phá triết lý, tầm nhìn, sứ mệnh và
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
              Khám phá 5 chương
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

/* ---------------- Featured image strip ---------------- */
function FeaturedStrip() {
  return (
    <section className="relative py-12 sm:py-16 px-5 sm:px-8 border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            { src: "https://sfile.chatglm.cn/images-ppt/378e39681c7e.jpg", alt: "Lớp học Vật lý hiện đại", label: "Vật lý" },
            { src: "https://sfile.chatglm.cn/images-ppt/022751ed6abd.jpg", alt: "AI trong giáo dục", label: "AI · Edu" },
            { src: "https://sfile.chatglm.cn/images-ppt/53e0e8de6eb5.jpeg", alt: "Học sinh STEM", label: "STEM" },
            { src: "https://sfile.chatglm.cn/images-ppt/478c06e221cf.jpg", alt: "Sơ đồ đòn bẩy", label: "Đòn bẩy" },
          ].map((img, i) => (
            <Reveal key={img.src} delay={i * 80}>
              <div className="group relative aspect-[4/3] rounded-xl overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-background/80 bg-foreground/40 backdrop-blur-sm px-2 py-1 rounded">
                    {img.label}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Manifesto banner ---------------- */
function ManifestoBanner() {
  return (
    <section className="relative py-20 sm:py-28 px-5 sm:px-8 bg-foreground text-background overflow-hidden">
      <div className="absolute inset-0 bg-grain-dark opacity-40 pointer-events-none" aria-hidden />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vw] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "oklch(0.74 0.13 85 / 0.5)" }}
      />

      <div className="max-w-4xl mx-auto relative text-center">
        <Reveal>
          <Quote className="w-12 h-12 text-accent mx-auto mb-6" />
          <p className="font-display text-2xl sm:text-3xl md:text-4xl italic leading-snug text-background/90">
            Chúng tôi không dạy giáo viên cách dùng AI như một công cụ tạo chữ tự động thông thường.
            Chúng tôi trao cho giáo viên một <span className="text-accent not-italic font-medium">triết lý sư phạm kiểm soát</span> kết
            hợp với <span className="text-accent not-italic font-medium">hệ sinh thái Edu-Graphic đồng bộ</span>.
          </p>
          <p className="mt-8 text-[11px] tracking-[0.3em] uppercase text-background/40">
            — Thầy Kha Khung Hiệp · Sáng lập Đòn Bẩy AI
          </p>
        </Reveal>
      </div>
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
                Năm chương — Năm góc nhìn
              </span>
              <span className="h-px w-8 bg-accent/60" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-foreground tracking-tight">
              Mỗi chương một <span className="italic font-light text-accent">thiết kế riêng</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Từ layout magazine, merged 3-in-1, vertical funnel, đến showcase —
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
                  className="group relative block h-full rounded-2xl bg-card border border-border hover:border-foreground/20 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                >
                  {/* image header */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                    {/* corner number */}
                    <span className="absolute top-4 right-4 font-serif italic text-3xl text-background/80">
                      0{i + 1}
                    </span>
                    {/* icon badge */}
                    <div
                      className="absolute bottom-4 left-4 inline-flex items-center justify-center w-11 h-11 rounded-xl backdrop-blur-md"
                      style={{ background: `${p.accent}40`, color: "white" }}
                    >
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* content */}
                  <div className="p-6">
                    <p
                      className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-2"
                      style={{ color: p.accent }}
                    >
                      {p.eyebrow}
                    </p>
                    <h3 className="font-serif text-xl text-foreground mb-2 leading-tight">
                      {p.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {p.desc}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/40">
                        {p.layout}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
                        Đọc
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
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
              <div className="relative flex flex-col h-full">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/20 text-accent mb-5">
                  <Sparkles className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <p className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-1 text-accent">
                  Bắt đầu ngay
                </p>
                <h3 className="font-serif text-2xl text-background mb-3 leading-tight">
                  Khám phá toàn bộ lộ trình
                </h3>
                <p className="text-sm text-background/60 leading-relaxed mb-5 flex-1">
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
      <FeaturedStrip />
      <ManifestoBanner />
      <ChapterGrid />
    </>
  );
}
