"use client";

import Link from "next/link";
import { ArrowRight, Clock, Video } from "lucide-react";
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
    category: "Module 1 · Soạn giảng",
  },
  {
    no: "02",
    lesson: "Bài 02",
    title: "NotebookLM chống AI ảo giác",
    hook: "Sơ AI tự chế kiến thức ngoài sách giáo khoa?",
    solution: "Nạp trực tiếp PDF SGK vào NotebookLM để làm não chống ảo giác, soạn đề chính xác 100%.",
    cta: "Lấy câu lệnh soạn đề chẩn đoán tại Bài 2 trên Web.",
    duration: "60s",
    category: "Module 1 · Soạn giảng",
  },
  {
    no: "03",
    lesson: "Bài 03",
    title: "Podcast Flipped Classroom bằng NotebookLM Audio",
    hook: "Biến SGK thành podcast 2 MC AI tiếng Anh cực dễ!",
    solution: "Generate Audio trong NotebookLM + tải tệp phụ đề Việt dịch sẵn trên website.",
    cta: "Tải audio mẫu và phụ đề tiếng Việt tại Bài 3.",
    duration: "60s",
    category: "Module 1 · Soạn giảng",
  },
  {
    no: "04",
    lesson: "Bài 04",
    title: "Template Word 2 cột in ấn tiết kiệm mực",
    hook: "In phiếu học tập bị nhòe đen, tốn mực của trường?",
    solution: "Template Word 2 cột, lề 1.5cm, viền bảng ẩn màu xám nhạt — tiết kiệm 90% mực in.",
    cta: "Tải template Word chuẩn in ấn tại Bài 4.",
    duration: "60s",
    category: "Module 1 · Soạn giảng",
  },
  {
    no: "05",
    lesson: "Bài 05",
    title: "Thí nghiệm dòng truyền nhiệt SVG tương tác",
    hook: "Chạm tay kéo slider chạy dòng truyền nhiệt thời gian thực!",
    solution: "Học sinh quét QR trên phiếu mở trang SVG tương tác, kéo slider cảm nhận dòng nhiệt.",
    cta: "Trải nghiệm mô phỏng dòng nhiệt tại Bài 5.",
    duration: "60s",
    category: "Module 2 · Thí nghiệm ảo",
  },
  {
    no: "06",
    lesson: "Bài 06",
    title: "Nhiệt kế Spring Bounce với CSS cubic-bezier",
    hook: "Nhiệt kế dâng nước nảy nhẹ quán tính chất lỏng cực chất!",
    solution: "Mô phỏng nhiệt kế 3D dâng mực nước có quán tính nảy nhẹ ở đỉnh — cubic-bezier overshoot 1.56.",
    cta: "Chơi thử mô phỏng nhiệt kế nảy lò xo tại Bài 6.",
    duration: "60s",
    category: "Module 2 · Thí nghiệm ảo",
  },
  {
    no: "07",
    lesson: "Bài 07",
    title: "Động học phân tử khí trên HTML5 Canvas 60fps",
    hook: "Tự tạo video hoạt họa 60fps đăng TikTok chỉ 1 dòng lệnh!",
    solution: "Mô phỏng hàng trăm phân tử khí chuyển động 60fps trên Canvas, tăng nhiệt độ làm hạt va đập nhanh hơn.",
    cta: "Nhận mã nguồn mô phỏng phân tử tại Bài 7.",
    duration: "60s",
    category: "Module 2 · Thí nghiệm ảo",
  },
  {
    no: "08",
    lesson: "Bài 08",
    title: "Game Warm-up Quiz trắc nghiệm đầu giờ",
    hook: "Làm trò chơi khởi động đầu giờ chỉ trong 5 phút soạn bằng AI!",
    solution: "Game trắc nghiệm tính giờ lật ô chữ phần thưởng — học sinh quét QR thi đấu.",
    cta: "Chơi thử Game Khởi động tại Bài 8.",
    duration: "60s",
    category: "Module 3 · Trò chơi",
  },
  {
    no: "09",
    lesson: "Bài 09",
    title: "Game Icebreaker click nổ bóng nhiệt giải lao",
    hook: "Học sinh mệt mỏi, ngủ gật giữa tiết học dài?",
    solution: "Mini game click bóng nhiệt rơi tự do trong 30 giây — tỉnh ngủ tức thì, không cần cài app.",
    cta: "Chơi thử Game Bóng Nhiệt Giải Lao tại Bài 9.",
    duration: "60s",
    category: "Module 3 · Trò chơi",
  },
  {
    no: "10",
    lesson: "Bài 10",
    title: "Game Wrap-up Đúng/Sai chẩn đoán ngộ nhận",
    hook: "Sờ vào sắt lạnh hơn gỗ ở cùng 20 độ C?",
    solution: "Game Đúng/Sai 4 phát biểu bẫy — chọn đáp án và hiện lời giải thích khoa học lập tức.",
    cta: "Chơi thử Game Củng cố tại Bài 10.",
    duration: "60s",
    category: "Module 3 · Trò chơi",
  },
  {
    no: "11",
    lesson: "Bài 11",
    title: "Dạy học xoay trạm 5 trạm bằng QR Code",
    hook: "Xoay 5 trạm học tập công nghệ cực nề nếp bằng mã QR!",
    solution: "5 trạm: Thực nghiệm · Mô phỏng · Game củng cố · Mindmap · Video STEM — chạy mượt bằng 4G nhóm trưởng.",
    cta: "Tải giáo án mẫu dạy học theo trạm tại Bài 11.",
    duration: "60s",
    category: "Module 3 · Trò chơi",
  },
];

/* ---------------- Structure infographic ---------------- */
function StructureInfographic() {
  const phases = [
    { label: "Hook", time: "0–15s", desc: "Câu hỏi gây tò mò" },
    { label: "Solution", time: "15–45s", desc: "Demo công cụ/giải pháp" },
    { label: "CTA", time: "45–60s", desc: "Kêu gọi hành động về Web" },
  ];

  return (
    <section className="px-5 sm:px-8 py-8 border-t border-border-gray bg-pure-black">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <p className="text-center text-[11px] tracking-[0.3em] uppercase font-bold text-amber-glow mb-6">
            Cấu trúc 60 giây mỗi video
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-3 mb-4">
          {phases.map((p, i) => (
            <Reveal key={p.label} delay={i * 80}>
              <div
                className="surface-card border border-border-gray rounded-md relative overflow-hidden"
                style={{ padding: "16px" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="font-extrabold text-pure-white"
                    style={{ fontSize: "20px", lineHeight: 1 }}
                  >
                    {p.label}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.2em] text-muted-text font-mono">
                    {p.time}
                  </span>
                </div>
                <p className="text-[15px] text-helper-gray">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Timeline bar — monochrome */}
        <Reveal delay={300}>
          <div className="flex h-2 rounded overflow-hidden">
            <div className="flex-[15] bg-lifted-charcoal" />
            <div className="flex-[30] bg-helper-gray" />
            <div className="flex-[15] bg-pure-white" />
          </div>
          <p className="text-center text-[11px] text-muted-text mt-2 font-mono">
            0s ─────────────────────────────────────── 60s
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Video card — flat with thumbnail placeholder + duration badge ---------------- */
function VideoCard({ video }: { video: typeof VIDEOS[0] }) {
  return (
    <Reveal>
      <article
        className="surface-card border border-border-gray rounded-md transition-colors hover:border-edge-gray overflow-hidden"
      >
        {/* Thumbnail area — pure black with giant number (no real image per design spec) */}
        <div className="relative aspect-video surface-canvas flex items-center justify-center overflow-hidden">
          {/* Giant number */}
          <span
            className="font-extrabold select-none pointer-events-none"
            style={{
              fontSize: "96px",
              lineHeight: 1,
              color: "#252525",
            }}
          >
            {video.no}
          </span>

          {/* Hover play icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full surface-canvas border border-border-gray flex items-center justify-center">
              <Video className="w-5 h-5 text-pure-white" strokeWidth={1.5} />
            </div>
          </div>

          {/* Top-left lesson badge */}
          <div className="absolute top-3 left-3">
            <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-pure-white px-2 py-1 rounded surface-canvas">
              {video.lesson}
            </span>
          </div>

          {/* Bottom-right duration badge — per design spec */}
          <div className="absolute bottom-3 right-3">
            <span
              className="inline-flex items-center gap-1 text-[13px] font-semibold text-pure-white rounded"
              style={{
                background: "rgba(0, 0, 0, 0.8)",
                padding: "4px 8px",
              }}
            >
              <Clock className="w-3 h-3" />
              {video.duration}
            </span>
          </div>

          {/* Bottom-left platform tags */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
            {["TikTok", "Shorts", "Reels"].map((p) => (
              <span
                key={p}
                className="text-[10px] uppercase tracking-[0.15em] text-helper-gray px-1.5 py-0.5 rounded"
                style={{ background: "rgba(0, 0, 0, 0.6)" }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Content — 16px padding, 8px gap between elements */}
        <div style={{ padding: "16px" }}>
          {/* title — Inter 700/16px white */}
          <h3
            className="font-bold text-pure-white leading-tight"
            style={{ fontSize: "16px", lineHeight: 1.4, marginBottom: "4px" }}
          >
            {video.title}
          </h3>

          {/* category label — Inter 400/15px helper-gray */}
          <p className="text-[15px] text-helper-gray mb-3">
            {video.category}
          </p>

          {/* hook */}
          <div className="mb-3 pl-3 border-l-2 border-border-gray">
            <p className="text-[11px] uppercase tracking-[0.25em] font-bold text-muted-text mb-1">
              Hook (0–15s)
            </p>
            <p className="text-[15px] text-pure-white font-semibold italic">{video.hook}</p>
          </div>

          {/* solution */}
          <div className="mb-3 flex gap-3">
            <span className="shrink-0 text-[11px] uppercase tracking-[0.25em] font-bold text-amber-glow mt-0.5">
              Solution
            </span>
            <p className="text-[15px] text-helper-gray leading-snug flex-1">{video.solution}</p>
          </div>

          {/* CTA */}
          <div className="pt-3 border-t border-border-gray flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-amber-glow shrink-0">
              CTA
            </span>
            <p className="text-[15px] font-semibold text-pure-white">{video.cta}</p>
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
        title="Video ngắn TikTok · Shorts · Reels"
        subtitle="11 kịch bản video đồng bộ 1-1 với 11 bài học. Mỗi video 60 giây với cấu trúc Hook → Solution → CTA rõ ràng."
      />

      {/* Structure infographic */}
      <StructureInfographic />

      {/* Section heading + video grid */}
      <section className="px-5 sm:px-8 py-12 border-t border-border-gray bg-pure-black">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <div className="mb-8">
              <span className="text-[11px] tracking-[0.3em] uppercase font-bold text-amber-glow">
                11 kịch bản hoàn chỉnh
              </span>
              <h2
                className="font-bold text-pure-white tracking-tight mt-2"
                style={{ fontSize: "24px", lineHeight: 1.33 }}
              >
                Mỗi video — một bài học
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VIDEOS.map((v) => (
              <VideoCard key={v.no} video={v} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA back to course — promo banner style */}
      <section className="px-5 sm:px-8 py-12 border-t border-border-gray bg-pure-black">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <div
              className="relative rounded border border-border-gray overflow-hidden"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255, 200, 64, 0.12) 0%, rgba(250, 58, 25, 0.10) 100%), #000000",
              }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-6">
                <div>
                  <span className="text-[11px] tracking-[0.3em] uppercase font-bold text-amber-glow">
                    Đọc chi tiết
                  </span>
                  <p
                    className="font-bold text-pure-white mt-2"
                    style={{ fontSize: "20px", lineHeight: 1.4 }}
                  >
                    Mỗi kịch bản = 1 bài học đầy đủ
                  </p>
                  <p className="text-[15px] text-helper-gray mt-1">
                    Xem 3 hướng Hook thực chiến, Solution và CTA chi tiết cho mỗi bài.
                  </p>
                </div>
                <Link
                  href="/khoa-hoc"
                  className="inline-flex items-center gap-2 text-pure-white font-bold rounded-md transition-opacity hover:opacity-90 shrink-0"
                  style={{
                    padding: "8px 16px",
                    fontSize: "15px",
                    background: "linear-gradient(90deg, #ff8a00 0%, #fa3a19 100%)",
                  }}
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Xem 11 bài học chi tiết
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
