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
  GraduationCap,
  Zap,
  Layers,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { SiteFooter } from "@/components/site/footer";
import { LeverInteractive } from "@/components/site/lever-interactive";

const MODULES = [
  {
    no: "01",
    range: "Bài 1–4 · 4 bài",
    title: "Soạn giảng với Gemini & NotebookLM",
    desc: "Tạo kế hoạch bài dạy, phiếu học tập, tệp âm thanh học tập song ngữ và biểu mẫu chuẩn in ấn GEMS.",
    icon: Bot,
    image: "/images/module-1.svg",
    wash: "mint",
    lessons: ["Trợ lý AI soạn bài dạy", "Sử dụng NotebookLM tin cậy", "Tệp âm thanh song ngữ", "Mẫu tài liệu Word 2 cột"],
  },
  {
    no: "02",
    range: "Bài 5–7 · 3 bài",
    title: "Thí nghiệm ảo tương tác",
    desc: "Mô phỏng tương tác chạy mượt mà trên mọi thiết bị — từ mô phỏng dạng vectơ SVG đến đồ họa chuyển động.",
    icon: FlaskConical,
    image: "/images/module-2.svg",
    wash: "cream",
    lessons: ["Dòng truyền nhiệt tương tác SVG", "Nhiệt kế ảo tương tác", "Động học phân tử khí"],
  },
  {
    no: "03",
    range: "Bài 8–11 · 4 bài",
    title: "Trò chơi tương tác lớp học",
    desc: "Trò chơi khởi động, trò chơi giải lao tương tác, trò chơi củng cố và tổ chức dạy học xoay trạm.",
    icon: Gamepad2,
    image: "/images/module-3.svg",
    wash: "blossom",
    lessons: ["Trò chơi khởi động đầu giờ", "Trò chơi giải lao bóng nhiệt", "Trò chơi củng cố Đúng/Sai", "Tổ chức dạy học xoay trạm"],
  },
];

const STATS = [
  { value: "11", label: "Bài học thực hành", icon: BookOpen },
  { value: "AR/3D", label: "Trò chơi & Mô phỏng", icon: Gamepad2 },
  { value: "3", label: "Chương học chính", icon: Layers },
  { value: "100%", label: "Chuẩn sư phạm GEMS", icon: GraduationCap },
];

const FEATURES = [
  { icon: Bot, label: "Gemini & NotebookLM", desc: "Hệ sinh thái hỗ trợ soạn giảng", color: "#b9ffe8", emoji: "🤖" },
  { icon: BookOpen, label: "11 bài học thực tế", desc: "Học liệu chi tiết, chuẩn GEMS", color: "#fffded", emoji: "📖" },
  { icon: Gamepad2, label: "Trò chơi tương tác AR", desc: "Thực tế tăng cường sinh động", color: "#ffc3e6", emoji: "🎮" },
  { icon: Leaf, label: "Mô phỏng thí nghiệm", desc: "Trực quan khoa học mượt mà", color: "#b9ffe8", emoji: "🌿" },
];

function getWashBg(wash: string) {
  switch (wash) {
    case "mint": return "#b9ffe8";
    case "cream": return "#fffded";
    case "blossom": return "#ffc3e6";
    default: return "#ffffff";
  }
}

/* ===== Animated Background Particles ===== */
function FloatingParticles() {
  const particles = [
    { x: "15%", y: "20%", size: 6, delay: 0, opacity: 0.15 },
    { x: "85%", y: "15%", size: 4, delay: 1.5, opacity: 0.1 },
    { x: "25%", y: "70%", size: 8, delay: 0.8, opacity: 0.08 },
    { x: "70%", y: "60%", size: 5, delay: 2.2, opacity: 0.12 },
    { x: "50%", y: "85%", size: 3, delay: 0.4, opacity: 0.15 },
    { x: "90%", y: "40%", size: 7, delay: 1.1, opacity: 0.06 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-deep-teal"
          style={{
            left: p.x, top: p.y,
            width: p.size, height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -30, 0, 20, 0],
            opacity: [p.opacity, p.opacity * 1.5, p.opacity, p.opacity * 0.5, p.opacity],
          }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}
    </div>
  );
}

/* ===== Gradient Orbs for Hero ===== */
function GradientOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-deep-teal/5 to-bright-teal/10 blur-[100px]" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-gradient-to-tr from-mint-glass/20 to-transparent blur-[80px]" />
      <div className="absolute top-1/3 left-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-blossom/5 to-transparent blur-[90px]" />
    </div>
  );
}

/* ===== Hero ===== */
function Hero() {
  return (
    <section className="relative pt-32 pb-16 sm:pt-36 sm:pb-24 px-5 sm:px-8 bg-paper overflow-hidden">
      <GradientOrbs />
      <FloatingParticles />
      
      <div className="relative z-10">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-mint-glass to-blossom/40 text-deep-teal font-sans font-medium text-xs tracking-wide shadow-sm">
                <Sparkles className="w-3 h-3" />
                Học liệu tương tác & Trợ lý AI
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="headline-serif text-ink"
              style={{ fontSize: "clamp(44px, 8vw, 72px)", lineHeight: 1.0, letterSpacing: "-0.03em" }}
            >
              Đòn Bẩy <span className="text-teal-gradient">AI</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="headline-serif text-ink mt-5"
              style={{ fontSize: "clamp(22px, 3.5vw, 30px)", lineHeight: 1.15 }}
            >
              <span className="bg-gradient-to-r from-mint-glass to-mint-glass/50 px-2 py-0.5 inline-block">11 bài học</span> ·{" "}
              <span className="bg-gradient-to-r from-mint-glass to-mint-glass/50 px-2 py-0.5 inline-block mt-1 sm:mt-0">Trò chơi tương tác & Thí nghiệm ảo</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 font-sans text-mist"
              style={{ fontSize: "17px", lineHeight: 1.6, maxWidth: "520px" }}
            >
              Hệ sinh thái <span className="font-semibold text-deep-teal">Đòn Bẩy AI</span> — Giáo viên chủ động dẫn dắt,
              AI tối ưu hiệu suất soạn giảng. Kết hợp với mô phỏng trực quan và trò chơi thực tế tăng cường (AR) trên{" "}
              <span className="font-semibold text-deep-teal">Gemini</span> và{" "}
              <span className="font-semibold text-deep-teal">NotebookLM</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/khoa-hoc"
                className="group inline-flex items-center justify-center gap-2 bg-deep-teal text-white font-sans font-medium px-7 py-3.5 rounded-xl hover:bg-bright-teal transition-all duration-300 shadow-lg shadow-deep-teal/20 hover:shadow-deep-teal/30 hover:-translate-y-0.5"
                style={{ fontSize: "16px" }}
              >
                Khám phá 11 bài học
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="group inline-flex items-center justify-center gap-2 bg-white text-ink font-sans font-medium px-7 py-3.5 rounded-xl border border-hairline hover:border-deep-teal/30 hover:bg-cream transition-all duration-300"
                style={{ fontSize: "16px" }}
              >
                <GraduationCap className="w-4 h-4" />
                Giới thiệu
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex items-center gap-3 flex-wrap"
            >
              <span className="text-xs font-sans text-mist uppercase tracking-wider font-medium">Tích hợp</span>
              <div className="flex gap-2">
                {["Gemini", "NotebookLM", "AR Game", "GEMS"].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-cream text-xs font-sans font-medium text-mist border border-hairline">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-6 font-sans text-mist flex items-center gap-2"
              style={{ fontSize: "14px" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-deep-teal animate-pulse" />
              <span className="font-semibold text-ink">Thầy Kha Khung Hiệp</span> — Chuyên gia AI & Mô phỏng dạy học
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-br from-mint-glass/20 to-transparent rounded-[40px] blur-2xl" />
              <LeverInteractive className="w-full max-w-[500px] mx-auto relative" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ===== Trust Strip ===== */
function TrustStrip() {
  return (
    <section className="py-12 px-5 sm:px-8 bg-gradient-to-b from-paper to-cream border-y border-hairline">
      <div className="max-w-[1200px] mx-auto text-center">
        <p className="font-sans text-mist mb-8 text-xs uppercase tracking-widest font-medium">
          Học liệu cho Giáo viên, Học sinh các cấp
        </p>
        <div className="flex items-center justify-center gap-10 flex-wrap">
          {[
            { name: "Gemini", icon: "🤖" },
            { name: "NotebookLM", icon: "📓" },
            { name: "Trò chơi AR", icon: "🎮" },
            { name: "Thí nghiệm ảo", icon: "🔬" },
            { name: "Học liệu GEMS", icon: "📐" },
          ].map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ y: -2 }}
              className="flex items-center gap-2 font-serif text-ink/70 hover:text-deep-teal transition-colors"
              style={{ fontSize: "18px" }}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Stats ===== */
function StatsRow() {
  return (
    <section className="relative py-24 px-5 sm:px-8 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-teal/5 via-mint-glass/20 to-deep-teal/5" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #006e75 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      <div className="relative max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative text-center p-6 md:p-8 bg-paper/70 backdrop-blur-sm rounded-2xl border border-hairline hover:shadow-lg hover:shadow-deep-teal/5 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-mint-glass text-deep-teal mb-4">
                  <Icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <p className="headline-serif text-ink" style={{ fontSize: "clamp(40px, 6vw, 72px)", lineHeight: 0.9, letterSpacing: "-0.04em" }}>
                  {s.value}
                </p>
                <p className="font-sans font-medium text-deep-teal mt-2" style={{ fontSize: "14px" }}>
                  {s.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ===== Module Cards ===== */
function HowItWorks() {
  return (
    <section className="py-24 px-5 sm:px-8 bg-paper">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="text-center mb-16 max-w-[720px] mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mint-glass text-deep-teal font-sans font-medium text-xs tracking-wide">
              <Sparkles className="w-3 h-3" />
              3 Module · 11 bài học
            </span>
            <h2
              className="headline-serif text-ink mt-6 mb-4"
              style={{ fontSize: "clamp(36px, 5vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.02em" }}
            >
              Lộ trình <span className="text-teal-gradient">thực chiến</span>
            </h2>
            <p className="font-sans text-mist mx-auto" style={{ fontSize: "17px", lineHeight: 1.6, maxWidth: "560px" }}>
              Lộ trình tích hợp toàn diện từ soạn giảng bằng AI, thiết kế thí nghiệm ảo sinh động đến trò chơi tương tác AR.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {MODULES.map((m, i) => {
            const Icon = m.icon;
            return (
              <Reveal key={m.no} delay={i * 100}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="group h-full"
                >
                  <Link href={`/khoa-hoc#module-${m.no}`} className="block h-full">
                    {/* Image card */}
                    <div
                      className="relative overflow-hidden rounded-2xl mb-6"
                      style={{ backgroundColor: getWashBg(m.wash) }}
                    >
                      <div className="aspect-[4/3] relative bg-paper/60 m-3 rounded-xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent z-10" />
                        <Image
                          src={m.image}
                          alt={`${m.no} — ${m.title}`}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                      {/* Floating number */}
                      <div className="absolute top-5 left-5 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center font-sans font-semibold text-deep-teal text-sm shadow-sm">
                        {m.no}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-1">
                      <p className="font-sans text-mist text-xs uppercase tracking-wider mb-2">{m.range}</p>
                      <h3 className="font-sans font-semibold text-ink text-xl leading-tight mb-3 group-hover:text-deep-teal transition-colors">
                        {m.title}
                      </h3>
                      <p className="font-sans text-mist text-sm leading-relaxed mb-4">{m.desc}</p>
                      
                      <ul className="space-y-2 mb-4">
                        {m.lessons.map((l) => (
                          <li key={l} className="flex items-center gap-2.5 font-sans text-sm text-ink/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-deep-teal shrink-0" />
                            {l}
                          </li>
                        ))}
                      </ul>

                      <div className="inline-flex items-center gap-1.5 font-sans font-medium text-deep-teal text-sm group-hover:gap-2.5 transition-all">
                        Xem chi tiết
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ===== Features ===== */
function FeaturesRow() {
  return (
    <section className="relative py-24 px-5 sm:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-paper to-cream" />
      <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-mint-glass/10 to-transparent pointer-events-none" />
      
      <div className="relative max-w-[1200px] mx-auto">
        <Reveal>
          <div className="text-center mb-16 max-w-[720px] mx-auto">
            <h2
              className="headline-serif text-ink mb-4"
              style={{ fontSize: "clamp(28px, 3.5vw, 36px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
            >
              Hệ sinh thái <span className="text-teal-gradient">tích hợp</span>
            </h2>
            <p className="font-sans text-mist" style={{ fontSize: "16px", lineHeight: 1.6, maxWidth: "480px", margin: "0 auto" }}>
              Công nghệ và sư phạm đồng bộ trong một nền tảng duy nhất
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.label} delay={i * 60}>
                <motion.div
                  whileHover={{ y: -2, scale: 1.01 }}
                  className="relative p-6 rounded-2xl bg-paper border border-hairline hover:shadow-xl hover:shadow-deep-teal/5 transition-all duration-300 h-full overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-30" style={{ background: f.color }} />
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                    style={{ backgroundColor: f.color }}
                  >
                    <Icon className="w-6 h-6 text-deep-teal" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-sans font-semibold text-ink text-base mb-1">{f.label}</h3>
                  <p className="font-sans text-mist text-sm">{f.desc}</p>
                  <div className="absolute bottom-3 right-3 text-2xl opacity-20">{f.emoji}</div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ===== CTA ===== */
function FinalCTA() {
  return (
    <section className="relative py-28 px-5 sm:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-deep-teal/90 via-deep-teal to-midnight-teal" />
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 30% 50%, #b9ffe8 0%, transparent 50%), radial-gradient(circle at 70% 30%, #ffc3e6 0%, transparent 50%)`
      }} />
      
      <div className="relative max-w-[720px] mx-auto text-center">
        <Reveal>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 font-sans font-medium text-xs tracking-wide backdrop-blur-sm mb-8">
              <Sparkles className="w-3 h-3 text-mint-glass" />
              Sẵn sàng bắt đầu?
            </span>
            <h2
              className="headline-serif text-white mb-4"
              style={{ fontSize: "clamp(36px, 5vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.02em" }}
            >
              Khóa học <span className="text-mint-glass">Đòn Bẩy AI</span>
            </h2>
            <p className="font-sans text-white/70 mx-auto mb-10" style={{ fontSize: "17px", lineHeight: 1.6, maxWidth: "520px" }}>
              <span className="bg-white/10 px-2 py-0.5 rounded">11 bài học thực hành</span> ·{" "}
              <span className="bg-white/10 px-2 py-0.5 rounded">Trò chơi tương tác & Mô phỏng</span> ·{" "}
              Hệ sinh thái tích hợp <span className="text-mint-glass font-medium">Gemini</span> &{" "}
              <span className="text-mint-glass font-medium">NotebookLM</span>.
            </p>
            <Link
              href="/khoa-hoc"
              className="group inline-flex items-center justify-center gap-2 bg-white text-deep-teal font-sans font-semibold px-8 py-4 rounded-xl hover:bg-mint-glass transition-all duration-300 shadow-xl shadow-black/20 hover:shadow-black/30 hover:-translate-y-0.5"
              style={{ fontSize: "16px" }}
            >
              Xem lộ trình 11 bài
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

/* ===== Page ===== */
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
