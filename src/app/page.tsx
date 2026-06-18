"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Sparkles,
  ArrowRight,
  ArrowDown,
  BookOpen,
  Video,
  Filter,
  Bot,
  FileText,
  Gamepad2,
  FlaskConical,
  QrCode,
  Mic,
  Type,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { SiteFooter } from "@/components/site/footer";

const MODULES = [
  {
    no: "Module 1",
    range: "4 bài · Bài 1–4",
    title: "Soạn giảng thực chiến với Gemini & NotebookLM",
    desc: "Tạo giáo án, phiếu học tập, podcast flipped classroom và template in ấn sắc nét.",
    icon: Bot,
    accent: "oklch(0.74 0.13 85)",
    lessons: ["Custom Gem soạn giáo án", "NotebookLM chống ảo giác", "Podcast Audio Overview", "Template Word 2 cột"],
  },
  {
    no: "Module 2",
    range: "3 bài · Bài 5–7",
    title: "Thí nghiệm ảo tương tác lớp học",
    desc: "SVG, CSS transition và HTML5 Canvas cho mô phỏng vật lý 60fps chạy mượt trên 4G.",
    icon: FlaskConical,
    accent: "oklch(0.62 0.08 145)",
    lessons: ["Dòng truyền nhiệt SVG", "Nhiệt kế Spring Bounce", "Động học phân tử khí"],
  },
  {
    no: "Module 3",
    range: "4 bài · Bài 8–11",
    title: "Trò chơi tương tác cho hoạt động lớp học",
    desc: "Game warm-up, icebreaker, wrap-up Đúng/Sai và dạy học xoay trạm QR Code.",
    icon: Gamepad2,
    accent: "oklch(0.55 0.06 50)",
    lessons: ["Warm-up Quiz", "Icebreaker Bóng nhiệt", "Wrap-up Đúng/Sai", "Xoay trạm QR Code"],
  },
];

const FEATURES = [
  { icon: Bot, label: "Gemini & NotebookLM", desc: "Hệ sinh thái AI chính thức" },
  { icon: Video, label: "11 video đa kênh", desc: "TikTok · Shorts · Reels" },
  { icon: Filter, label: "Phễu 3 tầng", desc: "Video → Web → Tài nguyên" },
  { icon: BookOpen, label: "11 bài đồng bộ 1-1", desc: "Mỗi bài = 1 kịch bản video" },
];

/* ---------------- Hero ---------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 120]);
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
        <div className="absolute inset-0 bg-grain-dark opacity-60" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-5 sm:px-8 pt-32 pb-20 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-background/15 bg-background/5 backdrop-blur-sm mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-medium text-background/80">
              v8.0 · Khóa học + Video ngắn đa kênh
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(2.2rem,7vw,5.5rem)] leading-[0.95] tracking-tight"
          >
            <span className="block italic font-light text-background/90">Đòn Bẩy AI</span>
            <span className="block text-gold-gradient font-semibold">11 bài · 11 video</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-2xl text-base sm:text-lg md:text-xl text-background/70 font-light leading-relaxed"
          >
            Khóa học <strong className="text-background">Đòn bẩy AI</strong> — Giáo viên kiểm soát,
            AI tối ưu hiệu suất. 11 bài học đồng bộ 1-1 với 11 kịch bản video ngắn đa kênh
            tích hợp <strong className="text-background">Gemini</strong> và <strong className="text-background">NotebookLM</strong>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
          >
            <div className="h-px w-12 bg-accent/40 hidden sm:block" />
            <div className="text-center sm:text-left">
              <p className="font-serif italic text-lg text-background/90">Thầy Kha Khung Hiệp</p>
              <p className="text-[11px] tracking-[0.3em] uppercase text-background/50 mt-1">
                Chuyên gia AI & Mô phỏng dạy học tương tác
              </p>
            </div>
            <div className="h-px w-12 bg-accent/40 hidden sm:block" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 items-center"
          >
            <Link
              href="/khoa-hoc"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-accent-foreground font-medium hover:bg-background hover:text-foreground transition-all duration-300 shadow-lg shadow-accent/20"
            >
              Xem 11 bài học
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/video"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-background/20 text-background/90 hover:border-accent hover:text-accent transition-colors duration-300"
            >
              <Video className="w-4 h-4" />
              11 kịch bản video
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

/* ---------------- Features strip ---------------- */
function FeaturesStrip() {
  return (
    <section className="relative py-12 px-5 sm:px-8 border-b border-border">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <Reveal key={f.label} delay={i * 80}>
              <div className="flex items-start gap-3">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent/15 text-accent shrink-0">
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-serif text-sm text-foreground leading-tight">{f.label}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{f.desc}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------- Modules overview ---------------- */
function ModulesOverview() {
  return (
    <section className="relative py-20 sm:py-24 px-5 sm:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" aria-hidden />
      <div className="max-w-6xl mx-auto relative">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2.5 mb-5 justify-center">
              <span className="h-px w-8 bg-accent/60" />
              <span className="text-[11px] tracking-[0.3em] uppercase font-semibold text-accent">
                3 Module · 11 bài học
              </span>
              <span className="h-px w-8 bg-accent/60" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-foreground tracking-tight">
              Lộ trình <span className="italic font-light text-accent">thực chiến</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Từ soạn giảng với AI đến thí nghiệm ảo và trò chơi tương tác —
              mỗi bài gắn với 1 kịch bản video ngắn đa kênh.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {MODULES.map((m, i) => {
            const Icon = m.icon;
            return (
              <Reveal key={m.no} delay={i * 120}>
                <Link
                  href="/khoa-hoc"
                  className="group block h-full p-7 rounded-2xl bg-card border border-border hover:border-foreground/20 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="inline-flex items-center justify-center w-12 h-12 rounded-xl"
                      style={{ background: `${m.accent}20`, color: m.accent }}
                    >
                      <Icon className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <span
                      className="text-[10px] uppercase tracking-[0.25em] font-semibold"
                      style={{ color: m.accent }}
                    >
                      {m.no}
                    </span>
                  </div>

                  <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
                    {m.range}
                  </p>
                  <h3 className="font-serif text-xl text-foreground mb-3 leading-tight">
                    {m.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {m.desc}
                  </p>

                  <ul className="space-y-1.5 pt-4 border-t border-border">
                    {m.lessons.map((l) => (
                      <li key={l} className="flex items-center gap-2 text-xs text-foreground/70">
                        <span className="w-1 h-1 rounded-full" style={{ background: m.accent }} />
                        {l}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
                    Xem chi tiết
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Funnel section ---------------- */
function FunnelSection() {
  const stages = [
    { icon: Video, label: "Video ngắn đa kênh", desc: "TikTok · YouTube Shorts · Reels", action: "Call to Action", accent: "oklch(0.74 0.13 85)" },
    { icon: BookOpen, label: "Website EdTech Portal", desc: "Bài học cụ thể trên Web", action: "Hành động", accent: "oklch(0.62 0.08 145)" },
    { icon: FileText, label: "Tài nguyên + Game + Prompt", desc: "Tải · Chơi · Copy prompt", action: "Ứng dụng lớp học", accent: "oklch(0.55 0.06 50)" },
  ];

  return (
    <section id="funnel" className="relative py-20 sm:py-24 px-5 sm:px-8 bg-foreground text-background overflow-hidden">
      <div className="absolute inset-0 bg-grain-dark opacity-40 pointer-events-none" aria-hidden />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[30vw] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "oklch(0.74 0.13 85 / 0.5)" }}
      />

      <div className="max-w-5xl mx-auto relative">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2.5 mb-5 justify-center">
              <span className="h-px w-8 bg-accent/60" />
              <span className="text-[11px] tracking-[0.3em] uppercase font-semibold text-accent">
                Nguyên tắc phễu
              </span>
              <span className="h-px w-8 bg-accent/60" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
              Phễu <span className="italic font-light text-accent">3 tầng</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-background/70 leading-relaxed max-w-2xl mx-auto">
              Từ video ngắn đa kênh → Website EdTech Portal → Tải tài nguyên, chơi game, copy prompt.
            </p>
          </div>
        </Reveal>

        <div className="space-y-4">
          {stages.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.label} delay={i * 120}>
                <div className="flex items-center gap-4 sm:gap-6 p-5 sm:p-6 rounded-2xl border border-background/10 bg-background/[0.04] backdrop-blur-sm">
                  <div
                    className="relative shrink-0"
                  >
                    <div
                      className="absolute inset-0 rounded-2xl blur-xl opacity-30"
                      style={{ background: s.accent }}
                    />
                    <div
                      className="relative w-14 h-14 rounded-2xl flex items-center justify-center border-2"
                      style={{ borderColor: s.accent, background: "oklch(0.18 0.025 165)" }}
                    >
                      <Icon className="w-7 h-7" style={{ color: s.accent }} strokeWidth={1.5} />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="font-serif italic text-2xl font-bold"
                        style={{ color: s.accent }}
                      >
                        0{i + 1}
                      </span>
                      <span
                        className="text-[10px] uppercase tracking-[0.25em] font-semibold"
                        style={{ color: s.accent }}
                      >
                        {s.action}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl text-background leading-tight">{s.label}</h3>
                    <p className="text-sm text-background/60 mt-0.5">{s.desc}</p>
                  </div>

                  {i < stages.length - 1 && (
                    <ArrowDown className="hidden sm:block w-5 h-5 text-accent/40 shrink-0" />
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Formula */}
        <Reveal delay={400}>
          <div className="mt-12 p-6 sm:p-8 rounded-2xl border border-accent/30 bg-accent/5 text-center">
            <p className="font-display text-lg sm:text-xl italic text-background/90 leading-relaxed">
              <span className="text-accent">Video ngắn</span> →{" "}
              <span className="text-accent">Website</span> →{" "}
              <span className="text-accent">Tài nguyên + Game + Prompt</span>
            </p>
            <p className="mt-3 text-[11px] tracking-[0.3em] uppercase text-background/40">
              Funnel khép kín · v8.0
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Final CTA ---------------- */
function FinalCTA() {
  return (
    <section className="relative py-20 px-5 sm:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <Reveal>
          <p className="text-[11px] tracking-[0.3em] uppercase font-semibold text-accent mb-5">
            Sẵn sàng bắt đầu?
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-foreground tracking-tight mb-6">
            Khóa học <span className="italic font-light text-accent">Đòn Bẩy AI v8.0</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
            11 bài học thực chiến · 11 kịch bản video ngắn đa kênh ·
            Hệ sinh thái Gemini & NotebookLM.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/khoa-hoc"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-foreground text-background font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-lg"
            >
              Xem lộ trình 11 bài
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/video"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-foreground/20 text-foreground hover:border-accent hover:text-accent transition-colors duration-300"
            >
              <Video className="w-4 h-4" />
              Xem 11 kịch bản video
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Page ---------------- */
export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesStrip />
      <ModulesOverview />
      <FunnelSection />
      <FinalCTA />
      <SiteFooter />
    </>
  );
}
