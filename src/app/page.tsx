"use client";

import Link from "next/link";
import Image from "next/image";
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
  Star,
  Leaf,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { SiteFooter } from "@/components/site/footer";

const MODULES = [
  {
    no: "01",
    range: "Bài 1–4 · 4 bài",
    title: "Soạn giảng với Gemini & NotebookLM",
    desc: "Tạo giáo án, phiếu học tập, podcast flipped classroom và template in ấn sắc nét.",
    icon: Bot,
    image: "/images/module-1.png",
    wash: "mint", // mint glass background
    lessons: ["Custom Gem soạn giáo án", "NotebookLM chống ảo giác", "Podcast Audio Overview", "Template Word 2 cột"],
  },
  {
    no: "02",
    range: "Bài 5–7 · 3 bài",
    title: "Thí nghiệm ảo tương tác",
    desc: "SVG, CSS transition và HTML5 Canvas cho mô phỏng vật lý 60fps chạy mượt trên 4G.",
    icon: FlaskConical,
    image: "/images/module-2.png",
    wash: "cream",
    lessons: ["Dòng truyền nhiệt SVG", "Nhiệt kế Spring Bounce", "Động học phân tử khí"],
  },
  {
    no: "03",
    range: "Bài 8–11 · 4 bài",
    title: "Trò chơi tương tác lớp học",
    desc: "Game warm-up, icebreaker, wrap-up Đúng/Sai và dạy học xoay trạm QR Code.",
    icon: Gamepad2,
    image: "/images/module-3.png",
    wash: "blossom",
    lessons: ["Warm-up Quiz", "Icebreaker Bóng nhiệt", "Wrap-up Đúng/Sai", "Xoay trạm QR Code"],
  },
];

const STATS = [
  { value: "11", label: "Bài học thực chiến" },
  { value: "11", label: "Kịch bản video ngắn" },
  { value: "3", label: "Module đào tạo" },
  { value: "100%", label: "Đồng bộ 1-1" },
];

const FEATURES = [
  { icon: Bot, label: "Gemini & NotebookLM", desc: "Hệ sinh thái AI chính thức" },
  { icon: Video, label: "11 video đa kênh", desc: "TikTok · Shorts · Reels" },
  { icon: Filter, label: "Phễu 3 tầng", desc: "Video → Web → Tài nguyên" },
  { icon: BookOpen, label: "11 bài đồng bộ 1-1", desc: "Mỗi bài = 1 kịch bản video" },
];

/* Wash helper */
function getWashBg(wash: string) {
  switch (wash) {
    case "mint": return "#b9ffe8";
    case "cream": return "#fffded";
    case "blossom": return "#ffc3e6";
    default: return "#ffffff";
  }
}

/* ---------------- Centered Hero ---------------- */
function Hero() {
  return (
    <section className="relative pt-32 pb-16 sm:pt-36 sm:pb-20 px-5 sm:px-8 bg-paper">
      <div className="max-w-[720px] mx-auto text-center">
        {/* mint pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex justify-center"
        >
          <span className="badge-mint">
            <Sparkles className="w-3 h-3" />
            v8.0 · Khóa học + Video ngắn đa kênh
          </span>
        </motion.div>

        {/* serif display headline 60px weight 400 */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="headline-serif text-ink"
          style={{ fontSize: "clamp(38px, 7vw, 60px)", lineHeight: 1.05 }}
        >
          Đòn Bẩy AI
        </motion.h1>

        {/* sub-headline serif */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="headline-serif text-mist mt-4"
          style={{ fontSize: "clamp(22px, 3vw, 26px)", lineHeight: 1.22 }}
        >
          11 bài · 11 video ngắn đa kênh
        </motion.p>

        {/* subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 font-sans text-ink mx-auto"
          style={{ fontSize: "18px", lineHeight: 1.5, maxWidth: "560px" }}
        >
          Khóa học <span className="font-medium text-deep-teal">Đòn bẩy AI</span> — Giáo viên kiểm soát,
          AI tối ưu hiệu suất. 11 bài học đồng bộ 1-1 với 11 kịch bản video ngắn đa kênh
          tích hợp <span className="font-medium text-deep-teal">Gemini</span> và{" "}
          <span className="font-medium text-deep-teal">NotebookLM</span>.
        </motion.p>

        {/* Dual CTA — teal primary + outlined secondary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link href="/khoa-hoc" className="btn-teal animate-gentle-pulse inline-flex items-center justify-center gap-2">
            Xem 11 bài học
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/video" className="btn-outlined inline-flex items-center justify-center gap-2">
            <Video className="w-4 h-4" />
            11 kịch bản video
          </Link>
        </motion.div>

        {/* Rating badge row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex items-center justify-center gap-3 flex-wrap"
        >
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map((i) => (
              <Star key={i} className="w-4 h-4 text-ember-ring" fill="currentColor" />
            ))}
          </div>
          <span className="font-sans font-medium text-ink" style={{ fontSize: "14px" }}>
            4.5/5 rating
          </span>
          <span className="font-sans text-mist" style={{ fontSize: "14px" }}>
            · TikTok · Shorts · Reels
          </span>
        </motion.div>

        {/* author signature */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 font-sans text-mist" style={{ fontSize: "14px" }}
        >
          <span className="font-medium text-ink">Thầy Kha Khung Hiệp</span> · Chuyên gia AI & Mô phỏng dạy học
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Trust strip ---------------- */
function TrustStrip() {
  return (
    <section className="py-10 px-5 sm:px-8 bg-paper border-y border-hairline">
      <div className="max-w-[1200px] mx-auto text-center">
        <p className="font-sans text-mist mb-6" style={{ fontSize: "14px" }}>
          Tin dùng bởi giáo viên Vật lý & Khoa học Tự nhiên THPT
        </p>
        <div className="flex items-center justify-center gap-8 flex-wrap opacity-60">
          {["Gemini", "NotebookLM", "Marp CLI", "TikZ", "HTML5 Canvas"].map((logo) => (
            <span key={logo} className="font-serif text-ink" style={{ fontSize: "22px" }}>
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Stats row on mint section ---------------- */
function StatsRow() {
  return (
    <section className="py-20 px-5 sm:px-8 bg-mint-glass">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <p className="headline-serif text-ink" style={{ fontSize: "clamp(40px, 5vw, 56px)", lineHeight: 1 }}>
              {s.value}
            </p>
            <p className="font-sans text-mist mt-2" style={{ fontSize: "14px", lineHeight: 1.5 }}>
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Features — 3-column "How it works" ---------------- */
function HowItWorks() {
  return (
    <section className="py-20 px-5 sm:px-8 bg-paper">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="text-center mb-16 max-w-[720px] mx-auto">
            <span className="badge-mint mb-6">3 Module · 11 bài học</span>
            <h2
              className="headline-serif text-ink mb-4"
              style={{ fontSize: "clamp(36px, 5vw, 46px)", lineHeight: 1.15 }}
            >
              Lộ trình thực chiến
            </h2>
            <p className="font-sans text-ink mx-auto" style={{ fontSize: "18px", lineHeight: 1.5, maxWidth: "560px" }}>
              Từ soạn giảng với AI đến thí nghiệm ảo và trò chơi tương tác —
              mỗi bài gắn với 1 kịch bản video ngắn đa kênh.
            </p>
          </div>
        </Reveal>

        {/* 3-column grid with 24px gap */}
        <div className="grid md:grid-cols-3 gap-6">
          {MODULES.map((m, i) => {
            const Icon = m.icon;
            return (
              <Reveal key={m.no} delay={i * 120}>
                <Link href="/khoa-hoc" className="group block">
                  {/* Product feature card with tri-tone wash background */}
                  <div
                    className="p-6 mb-6"
                    style={{
                      backgroundColor: getWashBg(m.wash),
                      borderRadius: "24px",
                    }}
                  >
                    <div
                      className="relative aspect-[4/3] overflow-hidden bg-paper"
                      style={{ borderRadius: "8px" }}
                    >
                      <Image
                        src={m.image}
                        alt={`${m.no} — ${m.title}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  </div>

                  {/* Numbered step card */}
                  <div className="flex items-start gap-4">
                    <div
                      className="shrink-0 inline-flex items-center justify-center bg-paper border border-ink font-sans font-medium text-ink"
                      style={{ borderRadius: "9999px", width: "32px", height: "32px", fontSize: "14px" }}
                    >
                      {m.no}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-mist mb-1" style={{ fontSize: "13px" }}>
                        {m.range}
                      </p>
                      <h3
                        className="font-sans font-medium text-ink mb-2 leading-tight"
                        style={{ fontSize: "20px", lineHeight: 1.25 }}
                      >
                        {m.title}
                      </h3>
                      <p className="font-sans text-mist mb-4" style={{ fontSize: "15px", lineHeight: 1.5 }}>
                        {m.desc}
                      </p>
                      <ul className="space-y-1.5 mb-4">
                        {m.lessons.map((l) => (
                          <li key={l} className="flex items-center gap-2 font-sans text-ink" style={{ fontSize: "14px" }}>
                            <span className="w-1 h-1 rounded-full bg-deep-teal" />
                            {l}
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center gap-1 font-sans font-medium text-deep-teal group-hover:gap-2 transition-all" style={{ fontSize: "15px" }}>
                        Xem chi tiết
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
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

/* ---------------- Features row on cream ---------------- */
function FeaturesRow() {
  return (
    <section className="py-20 px-5 sm:px-8 bg-cream">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="text-center mb-12 max-w-[720px] mx-auto">
            <h2
              className="headline-serif text-ink mb-4"
              style={{ fontSize: "clamp(32px, 4vw, 40px)", lineHeight: 1.15 }}
            >
              Hệ sinh thái tích hợp
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.label} delay={i * 80}>
                <div
                  className="bg-paper border border-hairline h-full"
                  style={{ borderRadius: "24px", padding: "24px" }}
                >
                  <div
                    className="inline-flex items-center justify-center bg-mint-glass text-deep-teal mb-4"
                    style={{ borderRadius: "9999px", width: "40px", height: "40px" }}
                  >
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <p className="font-sans font-medium text-ink mb-1" style={{ fontSize: "16px" }}>
                    {f.label}
                  </p>
                  <p className="font-sans text-mist" style={{ fontSize: "14px" }}>
                    {f.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Funnel section on mint ---------------- */
function FunnelSection() {
  const stages = [
    { icon: Video, label: "Video ngắn đa kênh", desc: "TikTok · YouTube Shorts · Reels", action: "Call to Action" },
    { icon: BookOpen, label: "Website EdTech Portal", desc: "Bài học cụ thể trên Web", action: "Hành động" },
    { icon: Filter, label: "Tài nguyên + Game + Prompt", desc: "Tải · Chơi · Copy prompt", action: "Ứng dụng" },
  ];

  return (
    <section id="funnel" className="py-20 px-5 sm:px-8 bg-mint-glass">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="text-center mb-16 max-w-[720px] mx-auto">
            <span className="badge-mint mb-6">Nguyên tắc phễu</span>
            <h2
              className="headline-serif text-ink mb-4"
              style={{ fontSize: "clamp(36px, 5vw, 46px)", lineHeight: 1.15 }}
            >
              Phễu 3 tầng
            </h2>
            <p className="font-sans text-ink mx-auto" style={{ fontSize: "18px", lineHeight: 1.5, maxWidth: "560px" }}>
              Từ video ngắn đa kênh → Website EdTech Portal → Tải tài nguyên, chơi game, copy prompt.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {stages.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.label} delay={i * 120}>
                <div
                  className="bg-paper border border-hairline h-full relative overflow-hidden"
                  style={{ borderRadius: "24px", padding: "32px 24px" }}
                >
                  {/* giant number background */}
                  <span
                    className="absolute top-4 right-6 headline-serif text-mint-glass select-none pointer-events-none"
                    style={{ fontSize: "80px", lineHeight: 1, opacity: 0.6 }}
                  >
                    0{i + 1}
                  </span>
                  <div
                    className="inline-flex items-center justify-center bg-mint-glass text-deep-teal mb-5 relative"
                    style={{ borderRadius: "9999px", width: "48px", height: "48px" }}
                  >
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <p className="font-sans font-medium text-deep-teal mb-1" style={{ fontSize: "13px" }}>
                    {s.action}
                  </p>
                  <h3
                    className="font-sans font-medium text-ink mb-1 leading-tight"
                    style={{ fontSize: "20px", lineHeight: 1.25 }}
                  >
                    {s.label}
                  </h3>
                  <p className="font-sans text-mist" style={{ fontSize: "15px" }}>
                    {s.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* formula */}
        <Reveal delay={400}>
          <div
            className="mt-8 bg-paper border border-hairline text-center"
            style={{ borderRadius: "24px", padding: "32px" }}
          >
            <p className="font-sans text-ink" style={{ fontSize: "18px", lineHeight: 1.5 }}>
              <span className="font-medium text-deep-teal">Video ngắn</span>
              {" → "}
              <span className="font-medium text-deep-teal">Website</span>
              {" → "}
              <span className="font-medium text-deep-teal">Tài nguyên + Game + Prompt</span>
            </p>
            <p className="mt-3 font-sans text-mist" style={{ fontSize: "13px" }}>
              Funnel khép kín · v8.0
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Final CTA — teal panel ---------------- */
function FinalCTA() {
  return (
    <section className="py-20 px-5 sm:px-8 bg-paper">
      <div className="max-w-[720px] mx-auto text-center">
        <Reveal>
          <span className="badge-mint mb-6">Sẵn sàng bắt đầu?</span>
          <h2
            className="headline-serif text-ink mb-4"
            style={{ fontSize: "clamp(36px, 5vw, 46px)", lineHeight: 1.15 }}
          >
            Khóa học Đòn Bẩy AI v8.0
          </h2>
          <p className="font-sans text-ink mx-auto mb-8" style={{ fontSize: "18px", lineHeight: 1.5, maxWidth: "560px" }}>
            11 bài học thực chiến · 11 kịch bản video ngắn đa kênh ·
            Hệ sinh thái Gemini & NotebookLM.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/khoa-hoc" className="btn-teal animate-gentle-pulse inline-flex items-center justify-center gap-2">
              Xem lộ trình 11 bài
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/video" className="btn-outlined inline-flex items-center justify-center gap-2">
              <Video className="w-4 h-4" />
              11 kịch bản video
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
      <TrustStrip />
      <StatsRow />
      <HowItWorks />
      <FeaturesRow />
      <FunnelSection />
      <FinalCTA />
      <SiteFooter />
    </>
  );
}
