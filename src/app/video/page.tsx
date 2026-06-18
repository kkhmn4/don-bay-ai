"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Video,
  ArrowRight,
  Music2,
  Hash,
  Clock,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { PageHero } from "@/components/site/page-hero";
import { SiteFooter } from "@/components/site/footer";

const VIDEOS = [
  {
    no: "01",
    lesson: "Bài 01",
    title: "Soạn bài bằng Gemini Custom Gem",
    hook: "Soạn bài bằng AI ra toàn chữ chung chung?",
    solution: "Custom Gem \"GEMS Assistant\" tự động lập giáo án và phiếu học tập trong 10 phút.",
    cta: "Copy prompt cấu hình Gem tại Bài 1 trên Web.",
    duration: "60s",
    accent: "oklch(0.74 0.13 85)",
  },
  {
    no: "02",
    lesson: "Bài 02",
    title: "NotebookLM chống AI ảo giác",
    hook: "Sơ AI tự chế kiến thức ngoài sách giáo khoa?",
    solution: "Nạp trực tiếp PDF SGK vào NotebookLM để làm não chống ảo giác, soạn đề chính xác 100%.",
    cta: "Lấy câu lệnh soạn đề chẩn đoán tại Bài 2 trên Web.",
    duration: "60s",
    accent: "oklch(0.74 0.13 85)",
  },
  {
    no: "03",
    lesson: "Bài 03",
    title: "Podcast Flipped Classroom bằng NotebookLM Audio",
    hook: "Biến SGK thành podcast 2 MC AI tiếng Anh cực dễ!",
    solution: "Generate Audio trong NotebookLM + tải tệp phụ đề Việt dịch sẵn trên website.",
    cta: "Tải audio mẫu và phụ đề tiếng Việt tại Bài 3.",
    duration: "60s",
    accent: "oklch(0.74 0.13 85)",
  },
  {
    no: "04",
    lesson: "Bài 04",
    title: "Template Word 2 cột in ấn tiết kiệm mực",
    hook: "In phiếu học tập bị nhòe đen, tốn mực của trường?",
    solution: "Template Word 2 cột, lề 1.5cm, viền bảng ẩn màu xám nhạt — tiết kiệm 90% mực in.",
    cta: "Tải template Word chuẩn in ấn tại Bài 4.",
    duration: "60s",
    accent: "oklch(0.74 0.13 85)",
  },
  {
    no: "05",
    lesson: "Bài 05",
    title: "Thí nghiệm dòng truyền nhiệt SVG tương tác",
    hook: "Chạm tay kéo slider chạy dòng truyền nhiệt thời gian thực!",
    solution: "Học sinh quét QR trên phiếu mở trang SVG tương tác, kéo slider cảm nhận dòng nhiệt.",
    cta: "Trải nghiệm mô phỏng dòng nhiệt tại Bài 5.",
    duration: "60s",
    accent: "oklch(0.62 0.08 145)",
  },
  {
    no: "06",
    lesson: "Bài 06",
    title: "Nhiệt kế Spring Bounce với CSS cubic-bezier",
    hook: "Nhiệt kế dâng nước nảy nhẹ quán tính chất lỏng cực chất!",
    solution: "Mô phỏng nhiệt kế 3D dâng mực nước có quán tính nảy nhẹ ở đỉnh — cubic-bezier overshoot 1.56.",
    cta: "Chơi thử mô phỏng nhiệt kế nảy lò xo tại Bài 6.",
    duration: "60s",
    accent: "oklch(0.62 0.08 145)",
  },
  {
    no: "07",
    lesson: "Bài 07",
    title: "Động học phân tử khí trên HTML5 Canvas 60fps",
    hook: "Tự tạo video hoạt họa 60fps đăng TikTok chỉ 1 dòng lệnh!",
    solution: "Mô phỏng hàng trăm phân tử khí chuyển động 60fps trên Canvas, tăng nhiệt độ làm hạt va đập nhanh hơn.",
    cta: "Nhận mã nguồn mô phỏng phân tử tại Bài 7.",
    duration: "60s",
    accent: "oklch(0.62 0.08 145)",
  },
  {
    no: "08",
    lesson: "Bài 08",
    title: "Game Warm-up Quiz trắc nghiệm đầu giờ",
    hook: "Làm trò chơi khởi động đầu giờ chỉ trong 5 phút soạn bằng AI!",
    solution: "Game trắc nghiệm tính giờ lật ô chữ phần thưởng — học sinh quét QR thi đấu.",
    cta: "Chơi thử Game Khởi động tại Bài 8.",
    duration: "60s",
    accent: "oklch(0.55 0.06 50)",
  },
  {
    no: "09",
    lesson: "Bài 09",
    title: "Game Icebreaker click nổ bóng nhiệt giải lao",
    hook: "Học sinh mệt mỏi, ngủ gật giữa tiết học dài?",
    solution: "Mini game click bóng nhiệt rơi tự do trong 30 giây — tỉnh ngủ tức thì, không cần cài app.",
    cta: "Chơi thử Game Bóng Nhiệt Giải Lao tại Bài 9.",
    duration: "60s",
    accent: "oklch(0.55 0.06 50)",
  },
  {
    no: "10",
    lesson: "Bài 10",
    title: "Game Wrap-up Đúng/Sai chẩn đoán ngộ nhận",
    hook: "Sờ vào sắt lạnh hơn gỗ ở cùng 20 độ C?",
    solution: "Game Đúng/Sai 4 phát biểu bẫy — chọn đáp án và hiện lời giải thích khoa học lập tức.",
    cta: "Chơi thử Game Củng cố tại Bài 10.",
    duration: "60s",
    accent: "oklch(0.55 0.06 50)",
  },
  {
    no: "11",
    lesson: "Bài 11",
    title: "Dạy học xoay trạm 5 trạm bằng QR Code",
    hook: "Xoay 5 trạm học tập công nghệ cực nề nếp bằng mã QR!",
    solution: "5 trạm: Thực nghiệm · Mô phỏng · Game củng cố · Mindmap · Video STEM — chạy mượt bằng 4G nhóm trưởng.",
    cta: "Tải giáo án mẫu dạy học theo trạm tại Bài 11.",
    duration: "60s",
    accent: "oklch(0.55 0.06 50)",
  },
];

/* ---------------- Video structure infographic ---------------- */
function StructureInfographic() {
  const phases = [
    { label: "Hook", time: "0–15s", desc: "Câu hỏi gây tò mò", color: "oklch(0.74 0.13 85)" },
    { label: "Solution", time: "15–45s", desc: "Demo công cụ/giải pháp", color: "oklch(0.62 0.08 145)" },
    { label: "CTA", time: "45–60s", desc: "Kêu gọi hành động về Web", color: "oklch(0.55 0.06 50)" },
  ];

  return (
    <section className="relative py-12 px-5 sm:px-8 bg-secondary/30 border-y border-border">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <p className="text-center text-[11px] tracking-[0.3em] uppercase font-semibold text-accent mb-6">
            Cấu trúc 60 giây mỗi video
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-3">
          {phases.map((p, i) => (
            <Reveal key={p.label} delay={i * 100}>
              <div className="relative p-5 rounded-xl bg-card border border-border overflow-hidden">
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ background: p.color }}
                />
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="font-serif italic font-bold text-2xl"
                    style={{ color: p.color }}
                  >
                    {p.label}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-mono">
                    {p.time}
                  </span>
                </div>
                <p className="text-sm text-foreground/70">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Timeline bar */}
        <Reveal delay={400}>
          <div className="mt-6 flex h-3 rounded-full overflow-hidden">
            <div className="flex-[15]" style={{ background: "oklch(0.74 0.13 85)" }} />
            <div className="flex-[30]" style={{ background: "oklch(0.62 0.08 145)" }} />
            <div className="flex-[15]" style={{ background: "oklch(0.55 0.06 50)" }} />
          </div>
          <p className="text-center text-[10px] text-muted-foreground mt-2 font-mono">
            0s ─────────────────────────────────────── 60s
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Video card ---------------- */
function VideoCard({ video }: { video: typeof VIDEOS[0] }) {
  return (
    <Reveal>
      <article className="group relative rounded-2xl bg-card border border-border hover:border-foreground/15 transition-all duration-500 hover:shadow-lg overflow-hidden">
        {/* Thumbnail area with number */}
        <div
          className="relative aspect-video flex items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${video.accent}25 0%, ${video.accent}10 100%)`,
          }}
        >
          {/* Giant number */}
          <span
            className="font-serif italic font-bold text-[10rem] leading-none select-none pointer-events-none"
            style={{ color: `${video.accent}30` }}
          >
            {video.no}
          </span>

          {/* Play icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md"
              style={{ background: `${video.accent}40` }}
            >
              <Video className="w-7 h-7 text-white" strokeWidth={1.5} />
            </div>
          </div>

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span
              className="text-[10px] uppercase tracking-[0.25em] font-semibold px-2 py-1 rounded backdrop-blur-sm"
              style={{ background: `${video.accent}40`, color: "white" }}
            >
              {video.lesson}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded bg-foreground/60 text-background backdrop-blur-sm">
              <Clock className="w-3 h-3" />
              {video.duration}
            </span>
          </div>

          {/* Bottom platform tags */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
            {["TikTok", "Shorts", "Reels"].map((p) => (
              <span
                key={p}
                className="text-[10px] uppercase tracking-[0.15em] px-2 py-0.5 rounded bg-foreground/30 text-background backdrop-blur-sm"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          <h3 className="font-serif text-lg sm:text-xl text-foreground mb-3 leading-tight">
            {video.title}
          </h3>

          {/* Hook */}
          <div className="mb-3 p-3 rounded-lg bg-secondary/40 border-l-2" style={{ borderColor: video.accent }}>
            <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-foreground/50 mb-1">
              Hook (0–15s)
            </p>
            <p className="text-sm text-foreground/85 italic font-serif">{video.hook}</p>
          </div>

          {/* Solution */}
          <div className="mb-3 flex gap-3">
            <span className="shrink-0 text-[10px] uppercase tracking-[0.25em] font-semibold text-accent mt-0.5">
              Solution
            </span>
            <p className="text-sm text-foreground/75 leading-snug">{video.solution}</p>
          </div>

          {/* CTA */}
          <div className="pt-3 border-t border-border flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-accent shrink-0">
              CTA
            </span>
            <p className="text-xs font-serif italic text-foreground/80">{video.cta}</p>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* ---------------- Page ---------------- */
export default function VideoPage() {
  return (
    <>
      <PageHero
        eyebrow="11 kịch bản video ngắn đa kênh"
        title="Video ngắn"
        italic="TikTok · Shorts · Reels"
        subtitle="11 kịch bản video đồng bộ 1-1 với 11 bài học. Mỗi video 60 giây với cấu trúc Hook → Solution → CTA rõ ràng."
      />

      {/* Structure infographic */}
      <StructureInfographic />

      {/* Video grid */}
      <section className="relative py-16 sm:py-20 px-5 sm:px-8">
        <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" aria-hidden />
        <div className="max-w-7xl mx-auto relative">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-[11px] tracking-[0.3em] uppercase font-semibold text-accent mb-3">
                11 kịch bản hoàn chỉnh
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl text-foreground leading-tight">
                Mỗi video — <span className="italic text-accent">một bài học</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIDEOS.map((v) => (
              <VideoCard key={v.no} video={v} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA back to course */}
      <section className="relative py-16 px-5 sm:px-8 bg-foreground text-background">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="text-[11px] tracking-[0.3em] uppercase font-semibold text-accent mb-4">
              Đọc chi tiết
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl mb-4 leading-tight">
              Mỗi kịch bản = 1 bài học đầy đủ
            </h3>
            <p className="text-sm sm:text-base text-background/70 mb-8 leading-relaxed">
              Xem 3 hướng Hook thực chiến, Solution và CTA chi tiết cho mỗi bài.
            </p>
            <Link
              href="/khoa-hoc"
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-accent text-accent-foreground font-medium hover:bg-background hover:text-foreground transition-all duration-300 shadow-lg"
            >
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-0.5 transition-transform" />
              Xem 11 bài học chi tiết
            </Link>
          </Reveal>
        </div>
      </section>

      <SiteFooter dark />
    </>
  );
}
