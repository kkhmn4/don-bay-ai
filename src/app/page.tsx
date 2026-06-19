"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Bot,
  FlaskConical,
  Gamepad2,
  ArrowRight,
  Sparkles,
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
    desc: "Tạo kế hoạch bài dạy, phiếu học tập, tệp âm thanh học tập song ngữ và biểu mẫu chuẩn in ấn GEMS.",
    icon: Bot,
    image: "/images/module-1.png",
    wash: "mint", // mint glass background
    lessons: ["Trợ lý AI soạn bài dạy", "Sử dụng NotebookLM tin cậy", "Tệp âm thanh song ngữ", "Mẫu tài liệu Word 2 cột"],
  },
  {
    no: "02",
    range: "Bài 5–7 · 3 bài",
    title: "Thí nghiệm ảo tương tác",
    desc: "Mô phỏng tương tác chạy mượt mà trên mọi thiết bị — từ mô phỏng dạng vectơ SVG đến đồ họa chuyển động.",
    icon: FlaskConical,
    image: "/images/module-2.png",
    wash: "cream",
    lessons: ["Dòng truyền nhiệt tương tác SVG", "Nhiệt kế ảo tương tác", "Động học phân tử khí"],
  },
  {
    no: "03",
    range: "Bài 8–11 · 4 bài",
    title: "Trò chơi tương tác lớp học",
    desc: "Trò chơi khởi động, trò chơi giải lao tương tác, trò chơi củng cố và tổ chức dạy học xoay trạm.",
    icon: Gamepad2,
    image: "/images/module-3.png",
    wash: "blossom",
    lessons: ["Trò chơi khởi động đầu giờ", "Trò chơi giải lao bóng nhiệt", "Trò chơi củng cố Đúng/Sai", "Tổ chức dạy học xoay trạm"],
  },
];

const STATS = [
  { value: "11", label: "Bài học thực hành" },
  { value: "AR/3D", label: "Trò chơi & Mô phỏng" },
  { value: "3", label: "Chương học chính" },
  { value: "100%", label: "Chuẩn sư phạm GEMS" },
];

const FEATURES = [
  { icon: Bot, label: "Gemini & NotebookLM", desc: "Hệ sinh thái hỗ trợ soạn giảng" },
  { icon: BookOpen, label: "11 bài học thực tế", desc: "Học liệu chi tiết, chuẩn GEMS" },
  { icon: Gamepad2, label: "Trò chơi tương tác AR", desc: "Thực tế tăng cường sinh động" },
  { icon: Leaf, label: "Mô phỏng thí nghiệm", desc: "Trực quan khoa học mượt mà" },
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
        {/* pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex justify-center"
        >
          <span className="badge-mint">
            <Sparkles className="w-3 h-3" />
            Học liệu tương tác & Trợ lý AI
          </span>
        </motion.div>

        {/* serif display headline 60px weight 400 */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="headline-serif text-ink text-glow-teal"
          style={{ fontSize: "clamp(48px, 9vw, 80px)", lineHeight: 1.0 }}
        >
          Đòn Bẩy <span className="text-teal-gradient">AI</span>
        </motion.h1>

        {/* sub-headline serif */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="headline-serif text-ink mt-6"
          style={{ fontSize: "clamp(26px, 4vw, 36px)", lineHeight: 1.15 }}
        >
          <span className="bg-mint-highlight font-medium">11 bài học</span> · <span className="bg-mint-highlight font-medium">Trò chơi tương tác & Thí nghiệm ảo</span>
        </motion.p>

        {/* subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 font-sans text-ink mx-auto"
          style={{ fontSize: "18px", lineHeight: 1.5, maxWidth: "560px" }}
        >
          Hệ sinh thái <span className="font-medium text-deep-teal">Đòn bẩy AI</span> — Giáo viên chủ động dẫn dắt,
          AI tối ưu hiệu suất soạn giảng. 11 bài học thực tế bám sát khung chương trình, kết hợp với mô phỏng trực quan và trò chơi thực tế tăng cường (AR) sinh động trên nền tảng <span className="font-medium text-deep-teal">Gemini</span> và <span className="font-medium text-deep-teal">NotebookLM</span>.
        </motion.p>

        {/* Dual CTA — teal primary */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link href="/khoa-hoc" className="btn-teal animate-gentle-pulse inline-flex items-center justify-center gap-2">
            Khám phá 11 bài học
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Integration details row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex items-center justify-center gap-3 flex-wrap text-mist font-sans"
          style={{ fontSize: "14px" }}
        >
          <span>Tích hợp sẵn:</span>
          <span className="font-medium text-ink">Gemini</span>
          <span>·</span>
          <span className="font-medium text-ink">NotebookLM</span>
          <span>·</span>
          <span className="font-medium text-ink">Trò chơi tương tác AR</span>
        </motion.div>

        {/* author signature */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 font-sans text-mist" style={{ fontSize: "14px" }}
        >
          <span className="font-medium text-ink">Thầy Kha Khung Hiệp</span> · Chuyên gia AI & Mô phỏng dạy học tương tác
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
          Học liệu được xây dựng cho Giáo viên, Học sinh từ Mầm non đến Đại học
        </p>
        <div className="flex items-center justify-center gap-8 flex-wrap opacity-60">
          {["Gemini", "NotebookLM", "Trò chơi AR", "Thí nghiệm ảo", "Học liệu GEMS"].map((logo) => (
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
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <p
              className="headline-serif text-ink number-glow"
              style={{ fontSize: "clamp(56px, 8vw, 96px)", lineHeight: 0.9, letterSpacing: "-0.04em" }}
            >
              {s.value}
            </p>
            <p className="font-sans font-medium text-deep-teal mt-3" style={{ fontSize: "15px", lineHeight: 1.4 }}>
              {s.label}
            </p>
            {/* decorative divider */}
            {i < STATS.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-4 w-px h-12 bg-deep-teal/20 -translate-y-1/2" />
            )}
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
              style={{ fontSize: "clamp(40px, 6vw, 60px)", lineHeight: 1.1 }}
            >
              Lộ trình <span className="text-teal-gradient">thực chiến</span>
            </h2>
            <p className="font-sans text-ink mx-auto" style={{ fontSize: "18px", lineHeight: 1.5, maxWidth: "560px" }}>
              Lộ trình tích hợp toàn diện từ soạn giảng bằng AI, thiết kế thí nghiệm ảo sinh động đến trò chơi tương tác thực tế tăng cường.
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



/* ---------------- Final CTA — teal panel ---------------- */
function FinalCTA() {
  return (
    <section className="py-20 px-5 sm:px-8 bg-paper">
      <div className="max-w-[720px] mx-auto text-center">
        <Reveal>
          <span className="badge-mint mb-6 animate-badge-bounce">Sẵn sàng bắt đầu?</span>
          <h2
            className="headline-serif text-ink mb-4"
            style={{ fontSize: "clamp(40px, 6vw, 60px)", lineHeight: 1.1 }}
          >
            Khóa học <span className="text-teal-gradient">Đòn Bẩy AI</span>
          </h2>
          <p className="font-sans text-ink mx-auto mb-8" style={{ fontSize: "18px", lineHeight: 1.5, maxWidth: "560px" }}>
            <span className="bg-mint-highlight font-medium">11 bài học thực hành</span> ·{" "}
            <span className="bg-mint-highlight font-medium">Trò chơi tương tác & Mô phỏng</span> ·
            Hệ sinh thái học liệu tích hợp <span className="font-medium text-deep-teal">Gemini</span> &{" "}
            <span className="font-medium text-deep-teal">NotebookLM</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/khoa-hoc" className="btn-teal animate-gentle-pulse inline-flex items-center justify-center gap-2">
              Xem lộ trình 11 bài
              <ArrowRight className="w-4 h-4" />
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
      <FinalCTA />
      <SiteFooter />
    </>
  );
}
