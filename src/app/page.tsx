"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Bot,
  FlaskConical,
  Gamepad2,
  ArrowRight,
  Video,
  Sparkles,
  Filter,
  BookOpen,
  Users,
  Clock,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { SiteFooter } from "@/components/site/footer";

const MODULES = [
  {
    no: "Module 1",
    range: "Bài 1–4 · 4 bài",
    title: "Soạn giảng với Gemini & NotebookLM",
    desc: "Tạo giáo án, phiếu học tập, podcast flipped classroom và template in ấn sắc nét.",
    icon: Bot,
    image: "/images/module-1.png",
    lessons: ["Custom Gem soạn giáo án", "NotebookLM chống ảo giác", "Podcast Audio Overview", "Template Word 2 cột"],
  },
  {
    no: "Module 2",
    range: "Bài 5–7 · 3 bài",
    title: "Thí nghiệm ảo tương tác",
    desc: "SVG, CSS transition và HTML5 Canvas cho mô phỏng vật lý 60fps chạy mượt trên 4G.",
    icon: FlaskConical,
    image: "/images/module-2.png",
    lessons: ["Dòng truyền nhiệt SVG", "Nhiệt kế Spring Bounce", "Động học phân tử khí"],
  },
  {
    no: "Module 3",
    range: "Bài 8–11 · 4 bài",
    title: "Trò chơi tương tác lớp học",
    desc: "Game warm-up, icebreaker, wrap-up Đúng/Sai và dạy học xoay trạm QR Code.",
    icon: Gamepad2,
    image: "/images/module-3.png",
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

/* ---------------- Hero — 2 column split ---------------- */
function Hero() {
  return (
    <section className="relative pt-32 pb-16 sm:pt-36 sm:pb-20 px-5 sm:px-8 bg-mist overflow-hidden">
      {/* subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(9, 9, 11, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(9, 9, 11, 0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="max-w-[1200px] mx-auto relative grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: display headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
        >
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 text-[12px] font-medium text-snow bg-obsidian"
              style={{ borderRadius: "12px", padding: "4px 10px" }}
            >
              <Sparkles className="w-3 h-3 text-ember" />
              v8.0 · Khóa học + Video ngắn đa kênh
            </span>
          </div>

          <h1
            className="font-bold text-obsidian tracking-tight"
            style={{ fontSize: "clamp(36px, 6vw, 56px)", lineHeight: 1.12 }}
          >
            Đòn Bẩy AI —{" "}
            <span className="text-ash font-light">11 bài · 11 video</span>
          </h1>

          <p
            className="mt-6 text-ink max-w-lg"
            style={{ fontSize: "16px", lineHeight: 1.5, fontWeight: 400 }}
          >
            Khóa học <span className="font-semibold text-obsidian">Đòn bẩy AI</span> — Giáo viên kiểm soát,
            AI tối ưu hiệu suất. 11 bài học đồng bộ 1-1 với 11 kịch bản video ngắn đa kênh
            tích hợp <span className="font-semibold text-obsidian">Gemini</span> và{" "}
            <span className="font-semibold text-obsidian">NotebookLM</span>.
          </p>

          {/* author signature */}
          <div className="mt-8 flex items-center gap-3 text-[14px]">
            <span className="font-semibold text-obsidian">Thầy Kha Khung Hiệp</span>
            <span className="text-pebble">·</span>
            <span className="text-steel">Chuyên gia AI & Mô phỏng dạy học</span>
          </div>

          {/* CTA row — email input style + pill button */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/khoa-hoc"
              className="inline-flex items-center justify-center gap-2 text-snow font-medium bg-obsidian hover:bg-ink transition-colors shadow-pill-physical"
              style={{ borderRadius: "36px", padding: "12px 20px", fontSize: "14px" }}
            >
              Xem 11 bài học
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/video"
              className="inline-flex items-center justify-center gap-2 text-graphite font-medium bg-snow border border-graphite hover:bg-fog transition-colors"
              style={{ borderRadius: "36px", padding: "12px 20px", fontSize: "14px" }}
            >
              <Video className="w-4 h-4" />
              11 kịch bản video
            </Link>
          </div>
        </motion.div>

        {/* Right: hero image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.175, 0.885, 0.32, 1.275] }}
          className="relative"
        >
          <div
            className="relative aspect-[4/3] overflow-hidden shadow-card-soft bg-obsidian"
            style={{ borderRadius: "36px" }}
          >
            <Image
              src="/images/hero-bg.png"
              alt="Đòn Bẩy AI — abstract physics and AI visualization"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 to-transparent" />
          </div>
          {/* floating accent badge — ember for visual punctuation */}
          <div
            className="absolute -top-4 -right-4 bg-orchid text-snow text-[12px] font-semibold animate-float-slow"
            style={{ borderRadius: "12px", padding: "8px 14px" }}
          >
            v8.0 · Mới
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Stats row — raw typographic emphasis ---------------- */
function StatsRow() {
  return (
    <section className="px-5 sm:px-8 py-16 bg-mist border-t border-pebble">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.175, 0.885, 0.32, 1.275] }}
            className="text-center sm:text-left"
          >
            <p
              className="font-bold text-obsidian tracking-tight"
              style={{ fontSize: "clamp(36px, 5vw, 48px)", lineHeight: 1 }}
            >
              {s.value}
            </p>
            <p className="text-[13px] text-steel mt-2" style={{ lineHeight: 1.56 }}>
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Features — 4 column row ---------------- */
function FeaturesRow() {
  return (
    <section className="px-5 sm:px-8 py-16 bg-mist">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <Reveal key={f.label} delay={i * 80}>
              <div
                className="bg-snow shadow-card-inset h-full"
                style={{ borderRadius: "28px", padding: "24px" }}
              >
                <div
                  className="inline-flex items-center justify-center bg-fog text-obsidian mb-4"
                  style={{ borderRadius: "40px", width: "40px", height: "40px" }}
                >
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <p className="font-semibold text-obsidian text-[14px] leading-tight">{f.label}</p>
                <p className="text-[12px] text-steel mt-1">{f.desc}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------- Modules — 36px rounded cards with images ---------------- */
function ModulesOverview() {
  return (
    <section className="px-5 sm:px-8 py-20 bg-mist">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <span className="inline-flex items-center text-[12px] font-medium text-snow bg-obsidian mb-4"
              style={{ borderRadius: "12px", padding: "4px 10px" }}
            >
              3 Module · 11 bài học
            </span>
            <h2
              className="font-bold text-obsidian tracking-tight mb-4"
              style={{ fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.25 }}
            >
              Lộ trình <span className="text-ash font-light">thực chiến</span>
            </h2>
            <p className="text-ink" style={{ fontSize: "16px", lineHeight: 1.5 }}>
              Từ soạn giảng với AI đến thí nghiệm ảo và trò chơi tương tác —
              mỗi bài gắn với 1 kịch bản video ngắn đa kênh.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {MODULES.map((m, i) => {
            const Icon = m.icon;
            return (
              <Reveal key={m.no} delay={i * 100}>
                <Link
                  href="/khoa-hoc"
                  className="group block bg-snow shadow-card-inset hover:shadow-card-soft transition-shadow duration-300 overflow-hidden h-full"
                  style={{ borderRadius: "36px" }}
                >
                  {/* image header */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-fog">
                    <Image
                      src={m.image}
                      alt={`${m.no} — ${m.title}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/30 to-transparent" />
                    {/* module number badge — top right */}
                    <div className="absolute top-4 right-4">
                      <span
                        className="text-[12px] font-semibold text-snow bg-obsidian/80 backdrop-blur-sm"
                        style={{ borderRadius: "12px", padding: "4px 10px" }}
                      >
                        {m.no}
                      </span>
                    </div>
                    {/* icon badge — bottom left */}
                    <div className="absolute bottom-4 left-4">
                      <div
                        className="inline-flex items-center justify-center bg-snow text-obsidian"
                        style={{ borderRadius: "40px", width: "44px", height: "44px" }}
                      >
                        <Icon className="w-6 h-6" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>

                  {/* content */}
                  <div style={{ padding: "28px" }}>
                    <p className="text-[12px] uppercase tracking-[0.2em] text-steel mb-2">
                      {m.range}
                    </p>
                    <h3
                      className="font-bold text-obsidian mb-3 leading-tight"
                      style={{ fontSize: "20px", lineHeight: 1.35 }}
                    >
                      {m.title}
                    </h3>
                    <p className="text-[14px] text-graphite leading-relaxed mb-5">
                      {m.desc}
                    </p>

                    <ul className="space-y-2 pt-4 border-t border-pebble">
                      {m.lessons.map((l) => (
                        <li key={l} className="flex items-center gap-2 text-[13px] text-graphite">
                          <span className="w-1.5 h-1.5 rounded-full bg-ember" />
                          {l}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 flex items-center gap-1 text-[14px] font-medium text-obsidian group-hover:gap-2 transition-all">
                      Xem chi tiết
                      <ArrowRight className="w-4 h-4" />
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

/* ---------------- Dark Problem Panel — obsidian with inline weight contrast ---------------- */
function ProblemPanel() {
  const points = [
    { lead: "Quên việc", key: "soạn bài bằng AI hời hợt" },
    { lead: "Chấm dứt", key: "ảo giác thông tin gây lệch chuẩn" },
    { lead: "Kết thúc", key: "slide một đường, phiếu một nẻo" },
    { lead: "Giải phóng", key: "giáo viên khỏi việc soạn giảng thủ công" },
  ];

  return (
    <section className="px-5 sm:px-8 py-20 bg-mist">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div
            className="bg-obsidian text-snow"
            style={{ borderRadius: "36px", padding: "40px" }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-flex items-center text-[12px] font-medium text-obsidian bg-snow mb-4"
                  style={{ borderRadius: "12px", padding: "4px 10px" }}
                >
                  Vấn đề chúng tôi giải quyết
                </span>
                <h2
                  className="font-bold tracking-tight mb-4"
                  style={{ fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.25 }}
                >
                  <span className="text-ash font-light">Giáo viên</span> Việt Nam
                  <br />
                  đứng trước <span className="text-ash font-light">nghịch lý</span>
                </h2>
                <p className="text-ash" style={{ fontSize: "16px", lineHeight: 1.5 }}>
                  Bơi giữa hàng nghìn công cụ AI và khóa học viết prompt chung chung,
                  nhưng khi áp dụng vào lớp học thực tế thì kiến thức rời rạc và ảo giác
                  thông tin của AI gây lệch chuẩn kiến thức.
                </p>
              </div>

              <ul className="space-y-4">
                {points.map((p, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div
                      className="inline-flex items-center justify-center bg-graphite shrink-0 mt-1"
                      style={{ borderRadius: "9999px", width: "12px", height: "12px" }}
                    />
                    <p style={{ fontSize: "18px", lineHeight: 1.45 }}>
                      <span className="text-ash font-light">{p.lead}</span>{" "}
                      <span className="text-snow font-semibold">{p.key}</span>
                    </p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Funnel section ---------------- */
function FunnelSection() {
  const stages = [
    { icon: Video, label: "Video ngắn đa kênh", desc: "TikTok · YouTube Shorts · Reels", action: "Call to Action" },
    { icon: BookOpen, label: "Website EdTech Portal", desc: "Bài học cụ thể trên Web", action: "Hành động" },
    { icon: Filter, label: "Tài nguyên + Game + Prompt", desc: "Tải · Chơi · Copy prompt", action: "Ứng dụng" },
  ];

  return (
    <section id="funnel" className="px-5 sm:px-8 py-20 bg-mist">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <span className="inline-flex items-center text-[12px] font-medium text-snow bg-obsidian mb-4"
              style={{ borderRadius: "12px", padding: "4px 10px" }}
            >
              Nguyên tắc phễu
            </span>
            <h2
              className="font-bold text-obsidian tracking-tight mb-4"
              style={{ fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.25 }}
            >
              Phễu <span className="text-ash font-light">3 tầng</span>
            </h2>
            <p className="text-ink" style={{ fontSize: "16px", lineHeight: 1.5 }}>
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
                  className="bg-snow shadow-card-inset h-full relative"
                  style={{ borderRadius: "36px", padding: "28px" }}
                >
                  {/* giant number */}
                  <span
                    className="absolute top-6 right-6 font-bold text-fog select-none pointer-events-none"
                    style={{ fontSize: "64px", lineHeight: 1 }}
                  >
                    0{i + 1}
                  </span>
                  <div
                    className="inline-flex items-center justify-center bg-fog text-obsidian mb-5 relative"
                    style={{ borderRadius: "40px", width: "48px", height: "48px" }}
                  >
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <p className="text-[12px] uppercase tracking-[0.2em] text-ember font-semibold mb-1">
                    {s.action}
                  </p>
                  <h3
                    className="font-bold text-obsidian mb-1 leading-tight"
                    style={{ fontSize: "20px", lineHeight: 1.35 }}
                  >
                    {s.label}
                  </h3>
                  <p className="text-[14px] text-steel">{s.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* formula */}
        <Reveal delay={400}>
          <div
            className="mt-8 bg-snow shadow-card-inset text-center"
            style={{ borderRadius: "36px", padding: "32px" }}
          >
            <p className="text-ink" style={{ fontSize: "18px", lineHeight: 1.45 }}>
              <span className="font-bold text-obsidian">Video ngắn</span>
              <span className="text-ash font-light"> → </span>
              <span className="font-bold text-obsidian">Website</span>
              <span className="text-ash font-light"> → </span>
              <span className="font-bold text-obsidian">Tài nguyên + Game + Prompt</span>
            </p>
            <p className="mt-3 text-[12px] uppercase tracking-[0.2em] text-steel">
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
    <section className="px-5 sm:px-8 py-20 bg-mist">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div
            className="bg-obsidian text-snow text-center"
            style={{ borderRadius: "48px", padding: "64px 40px" }}
          >
            <span className="inline-flex items-center text-[12px] font-medium text-obsidian bg-snow mb-4"
              style={{ borderRadius: "12px", padding: "4px 10px" }}
            >
              Sẵn sàng bắt đầu?
            </span>
            <h2
              className="font-bold tracking-tight mb-4"
              style={{ fontSize: "clamp(32px, 5vw, 48px)", lineHeight: 1.12 }}
            >
              Khóa học Đòn Bẩy AI{" "}
              <span className="text-ash font-light">v8.0</span>
            </h2>
            <p className="text-ash max-w-xl mx-auto mb-8" style={{ fontSize: "16px", lineHeight: 1.5 }}>
              11 bài học thực chiến · 11 kịch bản video ngắn đa kênh ·
              Hệ sinh thái Gemini & NotebookLM.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
              <Link
                href="/khoa-hoc"
                className="inline-flex items-center gap-2 text-obsidian font-medium bg-snow hover:bg-fog transition-colors shadow-pill-physical"
                style={{ borderRadius: "36px", padding: "12px 20px", fontSize: "14px" }}
              >
                Xem lộ trình 11 bài
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/video"
                className="inline-flex items-center gap-2 text-snow font-medium border border-graphite hover:border-ash transition-colors"
                style={{ borderRadius: "36px", padding: "12px 20px", fontSize: "14px" }}
              >
                <Video className="w-4 h-4" />
                11 kịch bản video
              </Link>
            </div>
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
      <StatsRow />
      <FeaturesRow />
      <ModulesOverview />
      <ProblemPanel />
      <FunnelSection />
      <FinalCTA />
      <SiteFooter />
    </>
  );
}
