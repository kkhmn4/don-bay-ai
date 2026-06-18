"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bot,
  FlaskConical,
  Gamepad2,
  ArrowRight,
  Video,
  Sparkles,
  Filter,
  BookOpen,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { SiteFooter } from "@/components/site/footer";

const MODULES = [
  {
    no: "Module 1",
    range: "Bài 1–4 · 4 bài",
    title: "Soạn giảng thực chiến với Gemini & NotebookLM",
    desc: "Tạo giáo án, phiếu học tập, podcast flipped classroom và template in ấn sắc nét.",
    icon: Bot,
    lessons: ["Custom Gem soạn giáo án", "NotebookLM chống ảo giác", "Podcast Audio Overview", "Template Word 2 cột"],
  },
  {
    no: "Module 2",
    range: "Bài 5–7 · 3 bài",
    title: "Thí nghiệm ảo tương tác lớp học",
    desc: "SVG, CSS transition và HTML5 Canvas cho mô phỏng vật lý 60fps chạy mượt trên 4G.",
    icon: FlaskConical,
    lessons: ["Dòng truyền nhiệt SVG", "Nhiệt kế Spring Bounce", "Động học phân tử khí"],
  },
  {
    no: "Module 3",
    range: "Bài 8–11 · 4 bài",
    title: "Trò chơi tương tác cho hoạt động lớp học",
    desc: "Game warm-up, icebreaker, wrap-up Đúng/Sai và dạy học xoay trạm QR Code.",
    icon: Gamepad2,
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
  return (
    <section className="relative pt-32 pb-12 sm:pt-36 sm:pb-16 px-5 sm:px-8 bg-pure-black">
      <div className="max-w-[1200px] mx-auto">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase font-bold text-amber-glow">
            v8.0 · Khóa học + Video ngắn đa kênh
          </span>
        </motion.div>

        {/* title — capped at 24px per design spec */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-extrabold text-pure-white tracking-tight max-w-3xl"
          style={{ fontSize: "24px", lineHeight: 1.33 }}
        >
          Đòn Bẩy AI — 11 bài · 11 video
        </motion.h1>

        {/* subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-helper-gray max-w-2xl leading-relaxed"
          style={{ fontSize: "18px", lineHeight: 1.56, fontWeight: 400 }}
        >
          Khóa học <span className="text-pure-white font-semibold">Đòn bẩy AI</span> — Giáo viên kiểm soát,
          AI tối ưu hiệu suất. 11 bài học đồng bộ 1-1 với 11 kịch bản video ngắn đa kênh
          tích hợp <span className="text-pure-white font-semibold">Gemini</span> và{" "}
          <span className="text-pure-white font-semibold">NotebookLM</span>.
        </motion.p>

        {/* author signature */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex items-center gap-3 text-[15px]"
        >
          <span className="font-bold text-pure-white">Thầy Kha Khung Hiệp</span>
          <span className="text-muted-text">·</span>
          <span className="text-muted-text">Chuyên gia AI & Mô phỏng dạy học tương tác</span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row gap-3"
        >
          <Link
            href="/khoa-hoc"
            className="inline-flex items-center justify-center gap-2 text-pure-white font-bold rounded-md transition-opacity hover:opacity-90"
            style={{
              padding: "8px 16px",
              fontSize: "15px",
              background: "linear-gradient(90deg, #ff8a00 0%, #fa3a19 100%)",
            }}
          >
            Xem 11 bài học
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/video"
            className="inline-flex items-center justify-center gap-2 text-pure-white font-semibold border border-border-gray rounded-md transition-colors hover:border-edge-gray"
            style={{ padding: "8px 16px", fontSize: "15px" }}
          >
            <Video className="w-4 h-4" />
            11 kịch bản video
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Promo banner (gradient strip — only chromatic moment) ---------------- */
function PromoBanner() {
  return (
    <section className="px-5 sm:px-8 py-6 bg-pure-black">
      <div className="max-w-[1200px] mx-auto">
        <div
          className="relative rounded border border-border-gray overflow-hidden"
          style={{
            background:
              "linear-gradient(90deg, rgba(255, 200, 64, 0.12) 0%, rgba(250, 58, 25, 0.10) 100%), #000000",
          }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5">
            {/* left zone — "Save" gradient text */}
            <div className="flex items-center gap-3">
              <span
                className="font-bold"
                style={{
                  fontSize: "20px",
                  background: "linear-gradient(90deg, #ffc840 0%, #fa3a19 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                11 bài
              </span>
              <span className="text-pure-white font-semibold text-[16px]">
                Khóa học Đòn Bẩy AI v8.0 — đồng bộ 1-1 với 11 video ngắn đa kênh
              </span>
            </div>

            {/* right zone — gradient CTA button */}
            <Link
              href="/khoa-hoc"
              className="inline-flex items-center gap-2 text-pure-white font-bold rounded-md transition-opacity hover:opacity-90 shrink-0"
              style={{
                padding: "8px 16px",
                fontSize: "15px",
                background: "linear-gradient(90deg, #ff8a00 0%, #fa3a19 100%)",
              }}
            >
              Bắt đầu ngay
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Features strip ---------------- */
function FeaturesStrip() {
  return (
    <section className="px-5 sm:px-8 py-8 border-t border-border-gray bg-pure-black">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <Reveal key={f.label} delay={i * 60}>
              <div className="flex items-start gap-3">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded surface-elevated shrink-0">
                  <Icon className="w-5 h-5 text-pure-white" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-bold text-pure-white text-[15px] leading-tight">{f.label}</p>
                  <p className="text-[13px] text-muted-text mt-0.5">{f.desc}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------- Section heading ---------------- */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="font-bold text-pure-white tracking-tight mb-4"
      style={{ fontSize: "24px", lineHeight: 1.33 }}
    >
      {children}
    </h2>
  );
}

/* ---------------- Modules overview ---------------- */
function ModulesOverview() {
  return (
    <section className="px-5 sm:px-8 py-12 border-t border-border-gray bg-pure-black">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="mb-10">
            <span className="text-[11px] tracking-[0.3em] uppercase font-bold text-amber-glow">
              3 Module · 11 bài học
            </span>
            <SectionHeading>
              Lộ trình thực chiến
            </SectionHeading>
            <p className="text-helper-gray max-w-2xl" style={{ fontSize: "18px", lineHeight: 1.56 }}>
              Từ soạn giảng với AI đến thí nghiệm ảo và trò chơi tương tác —
              mỗi bài gắn với 1 kịch bản video ngắn đa kênh.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4">
          {MODULES.map((m, i) => {
            const Icon = m.icon;
            return (
              <Reveal key={m.no} delay={i * 100}>
                <Link
                  href="/khoa-hoc"
                  className="group block h-full surface-card border border-border-gray rounded-md transition-colors hover:border-edge-gray"
                  style={{ padding: "16px" }}
                >
                  {/* top row: icon + module number */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded surface-elevated">
                      <Icon className="w-6 h-6 text-pure-white" strokeWidth={1.5} />
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-amber-glow">
                      {m.no}
                    </span>
                  </div>

                  <p className="text-[13px] uppercase tracking-[0.2em] text-muted-text mb-2">
                    {m.range}
                  </p>
                  <h3
                    className="font-bold text-pure-white mb-3 leading-tight"
                    style={{ fontSize: "16px", lineHeight: 1.4 }}
                  >
                    {m.title}
                  </h3>
                  <p className="text-[15px] text-helper-gray leading-relaxed mb-5">
                    {m.desc}
                  </p>

                  <ul className="space-y-2 pt-4 border-t border-border-gray">
                    {m.lessons.map((l) => (
                      <li key={l} className="flex items-center gap-2 text-[13px] text-helper-gray">
                        <span className="w-1 h-1 rounded-full bg-muted-text" />
                        {l}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex items-center gap-1 text-[15px] font-bold text-pure-white group-hover:gap-2 transition-all">
                    Xem chi tiết
                    <ArrowRight className="w-4 h-4" />
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
    { icon: Video, label: "Video ngắn đa kênh", desc: "TikTok · YouTube Shorts · Reels", action: "Call to Action" },
    { icon: BookOpen, label: "Website EdTech Portal", desc: "Bài học cụ thể trên Web", action: "Hành động" },
    { icon: Filter, label: "Tài nguyên + Game + Prompt", desc: "Tải · Chơi · Copy prompt", action: "Ứng dụng lớp học" },
  ];

  return (
    <section id="funnel" className="px-5 sm:px-8 py-12 border-t border-border-gray bg-pure-black">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="mb-10">
            <span className="text-[11px] tracking-[0.3em] uppercase font-bold text-amber-glow">
              Nguyên tắc phễu
            </span>
            <SectionHeading>
              Phễu 3 tầng
            </SectionHeading>
            <p className="text-helper-gray max-w-2xl" style={{ fontSize: "18px", lineHeight: 1.56 }}>
              Từ video ngắn đa kênh → Website EdTech Portal → Tải tài nguyên, chơi game, copy prompt.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4">
          {stages.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.label} delay={i * 100}>
                <div
                  className="surface-card border border-border-gray rounded-md h-full"
                  style={{ padding: "16px" }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded surface-elevated">
                      <Icon className="w-6 h-6 text-pure-white" strokeWidth={1.5} />
                    </div>
                    <span
                      className="font-extrabold text-pure-white"
                      style={{ fontSize: "24px", lineHeight: 1 }}
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.25em] font-bold text-amber-glow mb-1">
                    {s.action}
                  </p>
                  <h3
                    className="font-bold text-pure-white mb-1 leading-tight"
                    style={{ fontSize: "16px", lineHeight: 1.4 }}
                  >
                    {s.label}
                  </h3>
                  <p className="text-[13px] text-muted-text">{s.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* formula */}
        <Reveal delay={400}>
          <div className="mt-8 p-6 border border-border-gray rounded-md surface-card text-center">
            <p className="text-[18px] text-helper-gray leading-relaxed" style={{ fontWeight: 400 }}>
              <span className="text-pure-white font-bold">Video ngắn</span>
              {" → "}
              <span className="text-pure-white font-bold">Website</span>
              {" → "}
              <span className="text-pure-white font-bold">Tài nguyên + Game + Prompt</span>
            </p>
            <p className="mt-3 text-[11px] tracking-[0.3em] uppercase text-muted-text">
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
    <section className="px-5 sm:px-8 py-16 border-t border-border-gray bg-pure-black">
      <div className="max-w-[1200px] mx-auto text-center">
        <Reveal>
          <span className="text-[11px] tracking-[0.3em] uppercase font-bold text-amber-glow">
            Sẵn sàng bắt đầu?
          </span>
          <SectionHeading>
            Khóa học Đòn Bẩy AI v8.0
          </SectionHeading>
          <p className="text-helper-gray max-w-2xl mx-auto mb-8" style={{ fontSize: "18px", lineHeight: 1.56 }}>
            11 bài học thực chiến · 11 kịch bản video ngắn đa kênh ·
            Hệ sinh thái Gemini & NotebookLM.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <Link
              href="/khoa-hoc"
              className="inline-flex items-center justify-center gap-2 text-pure-white font-bold rounded-md transition-opacity hover:opacity-90"
              style={{
                padding: "8px 16px",
                fontSize: "15px",
                background: "linear-gradient(90deg, #ff8a00 0%, #fa3a19 100%)",
              }}
            >
              Xem lộ trình 11 bài
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/video"
              className="inline-flex items-center justify-center gap-2 text-pure-white font-semibold border border-border-gray rounded-md transition-colors hover:border-edge-gray"
              style={{ padding: "8px 16px", fontSize: "15px" }}
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
      <PromoBanner />
      <FeaturesStrip />
      <ModulesOverview />
      <FunnelSection />
      <FinalCTA />
      <SiteFooter />
    </>
  );
}
