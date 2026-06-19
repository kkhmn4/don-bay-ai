"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Play } from "lucide-react";
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
    image: "/images/video-01.png",
    accent: false,
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
    image: "/images/video-02.png",
    accent: false,
  },
  {
    no: "03",
    lesson: "Bài 03",
    title: "Podcast Flipped Classroom NotebookLM",
    hook: "Biến SGK thành podcast 2 MC AI tiếng Anh cực dễ!",
    solution: "Generate Audio trong NotebookLM + tải tệp phụ đề Việt dịch sẵn trên website.",
    cta: "Tải audio mẫu và phụ đề tiếng Việt tại Bài 3.",
    duration: "60s",
    category: "Module 1 · Soạn giảng",
    image: "/images/video-03.png",
    accent: true, // Orchid Flash decorative tile
  },
  {
    no: "04",
    lesson: "Bài 04",
    title: "Template Word 2 cột tiết kiệm mực",
    hook: "In phiếu học tập bị nhòe đen, tốn mực của trường?",
    solution: "Template Word 2 cột, lề 1.5cm, viền bảng ẩn — tiết kiệm 90% mực in.",
    cta: "Tải template Word chuẩn in ấn tại Bài 4.",
    duration: "60s",
    category: "Module 1 · Soạn giảng",
    image: "/images/video-04.png",
    accent: false,
  },
  {
    no: "05",
    lesson: "Bài 05",
    title: "Thí nghiệm SVG truyền nhiệt tương tác",
    hook: "Chạm tay kéo slider chạy dòng truyền nhiệt thời gian thực!",
    solution: "Học sinh quét QR trên phiếu mở trang SVG, kéo slider cảm nhận dòng nhiệt.",
    cta: "Trải nghiệm mô phỏng dòng nhiệt tại Bài 5.",
    duration: "60s",
    category: "Module 2 · Thí nghiệm ảo",
    image: "/images/video-05.png",
    accent: false,
  },
  {
    no: "06",
    lesson: "Bài 06",
    title: "Nhiệt kế Spring Bounce cubic-bezier",
    hook: "Nhiệt kế dâng nước nảy nhẹ quán tính chất lỏng cực chất!",
    solution: "Mô phỏng nhiệt kế 3D dâng mực nước có quán tính nảy ở đỉnh — cubic-bezier 1.56.",
    cta: "Chơi thử mô phỏng nhiệt kế nảy lò xo tại Bài 6.",
    duration: "60s",
    category: "Module 2 · Thí nghiệm ảo",
    image: "/images/video-06.png",
    accent: false,
  },
  {
    no: "07",
    lesson: "Bài 07",
    title: "Động học phân tử khí HTML5 Canvas 60fps",
    hook: "Tự tạo video hoạt họa 60fps đăng TikTok chỉ 1 dòng lệnh!",
    solution: "Mô phỏng hàng trăm phân tử khí 60fps trên Canvas, tăng nhiệt độ làm hạt va đập nhanh.",
    cta: "Nhận mã nguồn mô phỏng phân tử tại Bài 7.",
    duration: "60s",
    category: "Module 2 · Thí nghiệm ảo",
    image: "/images/video-07.png",
    accent: false,
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
    image: "/images/video-08.png",
    accent: false,
  },
  {
    no: "09",
    lesson: "Bài 09",
    title: "Game Icebreaker bóng nhiệt giải lao",
    hook: "Học sinh mệt mỏi, ngủ gật giữa tiết học dài?",
    solution: "Mini game click bóng nhiệt rơi tự do trong 30 giây — tỉnh ngủ tức thì.",
    cta: "Chơi thử Game Bóng Nhiệt Giải Lao tại Bài 9.",
    duration: "60s",
    category: "Module 3 · Trò chơi",
    image: "/images/video-09.png",
    accent: false,
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
    image: "/images/video-10.png",
    accent: false,
  },
  {
    no: "11",
    lesson: "Bài 11",
    title: "Dạy học xoay trạm 5 trạm bằng QR Code",
    hook: "Xoay 5 trạm học tập công nghệ cực nề nếp bằng mã QR!",
    solution: "5 trạm: Thực nghiệm · Mô phỏng · Game củng cố · Mindmap · Video STEM — chạy mượt bằng 4G.",
    cta: "Tải giáo án mẫu dạy học theo trạm tại Bài 11.",
    duration: "60s",
    category: "Module 3 · Trò chơi",
    image: "/images/video-11.png",
    accent: false,
  },
];

/* ---------------- Structure infographic ---------------- */
function StructureInfographic() {
  const phases = [
    { label: "Hook", time: "0–15s", desc: "Câu hỏi gây tò mò", color: "bg-obsidian" },
    { label: "Solution", time: "15–45s", desc: "Demo công cụ/giải pháp", color: "bg-graphite" },
    { label: "CTA", time: "45–60s", desc: "Kêu gọi hành động về Web", color: "bg-steel" },
  ];

  return (
    <section className="px-5 sm:px-8 py-16 bg-mist border-t border-pebble">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <p className="text-center text-[12px] uppercase tracking-[0.2em] font-semibold text-ember mb-6">
            Cấu trúc 60 giây mỗi video
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          {phases.map((p, i) => (
            <Reveal key={p.label} delay={i * 80}>
              <div
                className="bg-snow shadow-card-inset relative overflow-hidden"
                style={{ borderRadius: "28px", padding: "24px" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`inline-flex items-center justify-center text-snow font-bold ${p.color}`}
                    style={{ borderRadius: "12px", padding: "6px 12px", fontSize: "14px" }}
                  >
                    {p.label}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.15em] text-steel font-mono">
                    {p.time}
                  </span>
                </div>
                <p className="text-[14px] text-graphite">{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Timeline bar */}
        <Reveal delay={300}>
          <div className="flex h-3 overflow-hidden" style={{ borderRadius: "9999px" }}>
            <div className="flex-[15] bg-obsidian" />
            <div className="flex-[30] bg-graphite" />
            <div className="flex-[15] bg-steel" />
          </div>
          <p className="text-center text-[11px] text-steel mt-2 font-mono">
            0s ─────────────────────────────────────── 60s
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Video card — portfolio tile style ---------------- */
function VideoCard({ video }: { video: typeof VIDEOS[0] }) {
  return (
    <Reveal>
      <article
        className="group bg-snow shadow-card-inset hover:shadow-card-soft transition-shadow duration-300 overflow-hidden h-full flex flex-col"
        style={{ borderRadius: "36px" }}
      >
        {/* thumbnail — 16:9 with overlay badges */}
        <div className="relative aspect-video overflow-hidden bg-fog">
          {video.accent ? (
            <div className="absolute inset-0 bg-orchid" />
          ) : (
            <Image
              src={video.image}
              alt={video.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-obsidian/20 to-transparent" />

          {/* hover play button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div
              className="inline-flex items-center justify-center bg-snow text-obsidian shadow-pill-physical"
              style={{ borderRadius: "9999px", width: "56px", height: "56px" }}
            >
              <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
            </div>
          </div>

          {/* lesson badge — top left */}
          <div className="absolute top-4 left-4">
            <span
              className="text-[12px] font-semibold text-snow bg-obsidian/70 backdrop-blur-sm"
              style={{ borderRadius: "12px", padding: "4px 10px" }}
            >
              {video.lesson}
            </span>
          </div>

          {/* duration badge — bottom right */}
          <div className="absolute bottom-4 right-4">
            <span
              className="inline-flex items-center gap-1 text-[12px] font-semibold text-snow"
              style={{ background: "rgba(9, 9, 11, 0.85)", borderRadius: "8px", padding: "4px 8px" }}
            >
              <Clock className="w-3 h-3" />
              {video.duration}
            </span>
          </div>

          {/* platform tags — bottom left */}
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5">
            {["TikTok", "Shorts", "Reels"].map((p) => (
              <span
                key={p}
                className="text-[10px] uppercase tracking-[0.15em] text-snow"
                style={{
                  background: "rgba(9, 9, 11, 0.6)",
                  borderRadius: "8px",
                  padding: "3px 8px",
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* content */}
        <div className="flex-1 flex flex-col" style={{ padding: "24px" }}>
          <p className="text-[11px] uppercase tracking-[0.2em] text-steel mb-2">
            {video.category}
          </p>
          <h3
            className="font-bold text-obsidian leading-tight mb-3"
            style={{ fontSize: "18px", lineHeight: 1.35 }}
          >
            {video.title}
          </h3>

          {/* hook */}
          <div className="mb-3 pl-3 border-l-2 border-pebble">
            <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-steel mb-1">
              Hook (0–15s)
            </p>
            <p className="text-[14px] text-obsidian font-semibold italic leading-snug">
              {video.hook}
            </p>
          </div>

          {/* solution */}
          <div className="mb-3 flex gap-3">
            <span className="shrink-0 text-[11px] uppercase tracking-[0.2em] font-semibold text-ember mt-0.5">
              Solution
            </span>
            <p className="text-[13px] text-graphite leading-snug flex-1">{video.solution}</p>
          </div>

          {/* CTA */}
          <div className="mt-auto pt-3 border-t border-pebble flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-ember shrink-0">
              CTA
            </span>
            <p className="text-[13px] font-semibold text-obsidian">{video.cta}</p>
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
        title={<>Video ngắn <span className="text-ash font-light">TikTok · Shorts · Reels</span></>}
        subtitle="11 kịch bản video đồng bộ 1-1 với 11 bài học. Mỗi video 60 giây với cấu trúc Hook → Solution → CTA rõ ràng."
      />

      <StructureInfographic />

      {/* Video grid */}
      <section className="px-5 sm:px-8 py-16 bg-mist">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <div className="mb-10 max-w-2xl">
              <span className="inline-flex items-center text-[12px] font-medium text-snow bg-obsidian mb-4"
                style={{ borderRadius: "12px", padding: "4px 10px" }}
              >
                11 kịch bản hoàn chỉnh
              </span>
              <h2
                className="font-bold text-obsidian tracking-tight"
                style={{ fontSize: "clamp(28px, 4vw, 40px)", lineHeight: 1.25 }}
              >
                Mỗi video — <span className="text-ash font-light">một bài học</span>
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

      {/* CTA back to course — dark panel */}
      <section className="px-5 sm:px-8 py-16 bg-mist">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <div
              className="bg-obsidian text-snow"
              style={{ borderRadius: "36px", padding: "40px" }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <span className="inline-flex items-center text-[12px] font-medium text-obsidian bg-snow mb-3"
                    style={{ borderRadius: "12px", padding: "4px 10px" }}
                  >
                    Đọc chi tiết
                  </span>
                  <h3
                    className="font-bold mb-2"
                    style={{ fontSize: "28px", lineHeight: 1.28 }}
                  >
                    Mỗi kịch bản = <span className="text-ash font-light">1 bài học đầy đủ</span>
                  </h3>
                  <p className="text-ash text-[15px]">
                    Xem 3 hướng Hook thực chiến, Solution và CTA chi tiết cho mỗi bài.
                  </p>
                </div>
                <Link
                  href="/khoa-hoc"
                  className="inline-flex items-center gap-2 text-obsidian font-medium bg-snow hover:bg-fog transition-colors shadow-pill-physical shrink-0"
                  style={{ borderRadius: "36px", padding: "14px 24px", fontSize: "14px" }}
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
