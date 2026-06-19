"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Play, Star } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { PageHero } from "@/components/site/page-hero";
import { SiteFooter } from "@/components/site/footer";

const VIDEOS = [
  { no: "01", lesson: "Bài 01", title: "Soạn bài bằng Gemini Custom Gem", hook: "Soạn bài bằng AI ra toàn chữ chung chung?", solution: "Custom Gem \"GEMS Assistant\" tự động lập giáo án và phiếu học tập trong 10 phút.", cta: "Copy prompt cấu hình Gem tại Bài 1 trên Web.", duration: "60s", category: "Module 1 · Soạn giảng", image: "/images/video-01.png", wash: "mint" as const },
  { no: "02", lesson: "Bài 02", title: "NotebookLM chống AI ảo giác", hook: "Sơ AI tự chế kiến thức ngoài sách giáo khoa?", solution: "Nạp trực tiếp PDF SGK vào NotebookLM để làm não chống ảo giác, soạn đề chính xác 100%.", cta: "Lấy câu lệnh soạn đề chẩn đoán tại Bài 2 trên Web.", duration: "60s", category: "Module 1 · Soạn giảng", image: "/images/video-02.png", wash: "cream" as const },
  { no: "03", lesson: "Bài 03", title: "Podcast Flipped Classroom NotebookLM", hook: "Biến SGK thành podcast 2 MC AI tiếng Anh cực dễ!", solution: "Generate Audio trong NotebookLM + tải tệp phụ đề Việt dịch sẵn trên website.", cta: "Tải audio mẫu và phụ đề tiếng Việt tại Bài 3.", duration: "60s", category: "Module 1 · Soạn giảng", image: "/images/video-03.png", wash: "blossom" as const },
  { no: "04", lesson: "Bài 04", title: "Template Word 2 cột tiết kiệm mực", hook: "In phiếu học tập bị nhòe đen, tốn mực của trường?", solution: "Template Word 2 cột, lề 1.5cm, viền bảng ẩn — tiết kiệm 90% mực in.", cta: "Tải template Word chuẩn in ấn tại Bài 4.", duration: "60s", category: "Module 1 · Soạn giảng", image: "/images/video-04.png", wash: "mint" as const },
  { no: "05", lesson: "Bài 05", title: "Thí nghiệm SVG truyền nhiệt tương tác", hook: "Chạm tay kéo slider chạy dòng truyền nhiệt thời gian thực!", solution: "Học sinh quét QR trên phiếu mở trang SVG, kéo slider cảm nhận dòng nhiệt.", cta: "Trải nghiệm mô phỏng dòng nhiệt tại Bài 5.", duration: "60s", category: "Module 2 · Thí nghiệm ảo", image: "/images/video-05.png", wash: "cream" as const },
  { no: "06", lesson: "Bài 06", title: "Nhiệt kế Spring Bounce cubic-bezier", hook: "Nhiệt kế dâng nước nảy nhẹ quán tính chất lỏng cực chất!", solution: "Mô phỏng nhiệt kế 3D dâng mực nước có quán tính nảy ở đỉnh — cubic-bezier 1.56.", cta: "Chơi thử mô phỏng nhiệt kế nảy lò xo tại Bài 6.", duration: "60s", category: "Module 2 · Thí nghiệm ảo", image: "/images/video-06.png", wash: "blossom" as const },
  { no: "07", lesson: "Bài 07", title: "Động học phân tử khí HTML5 Canvas 60fps", hook: "Tự tạo video hoạt họa 60fps đăng TikTok chỉ 1 dòng lệnh!", solution: "Mô phỏng hàng trăm phân tử khí 60fps trên Canvas, tăng nhiệt độ làm hạt va đập nhanh.", cta: "Nhận mã nguồn mô phỏng phân tử tại Bài 7.", duration: "60s", category: "Module 2 · Thí nghiệm ảo", image: "/images/video-07.png", wash: "mint" as const },
  { no: "08", lesson: "Bài 08", title: "Game Warm-up Quiz trắc nghiệm đầu giờ", hook: "Làm trò chơi khởi động đầu giờ chỉ trong 5 phút soạn bằng AI!", solution: "Game trắc nghiệm tính giờ lật ô chữ phần thưởng — học sinh quét QR thi đấu.", cta: "Chơi thử Game Khởi động tại Bài 8.", duration: "60s", category: "Module 3 · Trò chơi", image: "/images/video-08.png", wash: "cream" as const },
  { no: "09", lesson: "Bài 09", title: "Game Icebreaker bóng nhiệt giải lao", hook: "Học sinh mệt mỏi, ngủ gật giữa tiết học dài?", solution: "Mini game click bóng nhiệt rơi tự do trong 30 giây — tỉnh ngủ tức thì.", cta: "Chơi thử Game Bóng Nhiệt Giải Lao tại Bài 9.", duration: "60s", category: "Module 3 · Trò chơi", image: "/images/video-09.png", wash: "blossom" as const },
  { no: "10", lesson: "Bài 10", title: "Game Wrap-up Đúng/Sai chẩn đoán ngộ nhận", hook: "Sờ vào sắt lạnh hơn gỗ ở cùng 20 độ C?", solution: "Game Đúng/Sai 4 phát biểu bẫy — chọn đáp án và hiện lời giải thích khoa học lập tức.", cta: "Chơi thử Game Củng cố tại Bài 10.", duration: "60s", category: "Module 3 · Trò chơi", image: "/images/video-10.png", wash: "mint" as const },
  { no: "11", lesson: "Bài 11", title: "Dạy học xoay trạm 5 trạm bằng QR Code", hook: "Xoay 5 trạm học tập công nghệ cực nề nếp bằng mã QR!", solution: "5 trạm: Thực nghiệm · Mô phỏng · Game củng cố · Mindmap · Video STEM — chạy mượt bằng 4G.", cta: "Tải giáo án mẫu dạy học theo trạm tại Bài 11.", duration: "60s", category: "Module 3 · Trò chơi", image: "/images/video-11.png", wash: "cream" as const },
];

function getWashBg(wash: string) {
  switch (wash) {
    case "mint": return "#b9ffe8";
    case "cream": return "#fffded";
    case "blossom": return "#ffc3e6";
    default: return "#ffffff";
  }
}

/* ---------------- Structure infographic ---------------- */
function StructureInfographic() {
  const phases = [
    { label: "Hook", time: "0–15s", desc: "Câu hỏi gây tò mò" },
    { label: "Solution", time: "15–45s", desc: "Demo công cụ/giải pháp" },
    { label: "CTA", time: "45–60s", desc: "Kêu gọi hành động về Web" },
  ];

  return (
    <section className="py-20 px-5 sm:px-8 bg-mint-glass border-y border-hairline">
      <div className="max-w-[1200px] mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <p className="font-sans font-medium text-deep-teal mb-4" style={{ fontSize: "13px" }}>
              CẤU TRÚC 60 GIÂY MỖI VIDEO
            </p>
            <h2 className="headline-serif text-ink" style={{ fontSize: "clamp(32px, 4vw, 40px)", lineHeight: 1.15 }}>
              Hook → Solution → CTA
            </h2>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-3 gap-6 mb-6">
          {phases.map((p, i) => (
            <Reveal key={p.label} delay={i * 80}>
              <div
                className="bg-paper border border-hairline relative overflow-hidden"
                style={{ borderRadius: "24px", padding: "32px 24px" }}
              >
                <span
                  className="absolute top-4 right-6 headline-serif text-mint-glass select-none pointer-events-none"
                  style={{ fontSize: "80px", lineHeight: 1, opacity: 0.6 }}
                >
                  0{i + 1}
                </span>
                <div className="flex items-center justify-between mb-3 relative">
                  <span
                    className="inline-flex items-center justify-center font-sans font-medium text-paper bg-deep-teal"
                    style={{ borderRadius: "9999px", padding: "6px 14px", fontSize: "14px" }}
                  >
                    {p.label}
                  </span>
                  <span className="font-sans text-mist" style={{ fontSize: "13px" }}>
                    {p.time}
                  </span>
                </div>
                <p className="font-sans text-ink" style={{ fontSize: "15px", lineHeight: 1.5 }}>
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Timeline bar */}
        <Reveal delay={300}>
          <div className="flex h-2 overflow-hidden" style={{ borderRadius: "9999px" }}>
            <div className="flex-[15] bg-deep-teal" />
            <div className="flex-[30] bg-bright-teal" />
            <div className="flex-[15] bg-mint-glass" />
          </div>
          <p className="text-center font-sans text-mist mt-2" style={{ fontSize: "13px" }}>
            0s ─────────────────────────────────────── 60s
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Video card — product feature card with tri-tone wash ---------------- */
function VideoCard({ video }: { video: typeof VIDEOS[0] }) {
  return (
    <Reveal>
      <article
        className="group h-full flex flex-col overflow-hidden"
        style={{
          backgroundColor: getWashBg(video.wash),
          borderRadius: "24px",
        }}
      >
        {/* Image container with 8px radius inside 24px wash card */}
        <div style={{ padding: "20px 20px 0 20px" }}>
          <div
            className="relative aspect-video overflow-hidden bg-paper"
            style={{ borderRadius: "8px" }}
          >
            <Image
              src={video.image}
              alt={video.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />

            {/* hover play button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div
                className="inline-flex items-center justify-center bg-paper text-deep-teal animate-gentle-pulse"
                style={{ borderRadius: "9999px", width: "56px", height: "56px" }}
              >
                <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
              </div>
            </div>

            {/* lesson badge — top left, teal filled */}
            <div className="absolute top-3 left-3">
              <span
                className="font-sans font-medium text-paper"
                style={{
                  backgroundColor: "#006e75",
                  borderRadius: "9999px",
                  padding: "4px 12px",
                  fontSize: "13px",
                }}
              >
                {video.lesson}
              </span>
            </div>

            {/* duration badge — bottom right, ink filled */}
            <div className="absolute bottom-3 right-3">
              <span
                className="inline-flex items-center gap-1 font-sans font-medium text-paper"
                style={{
                  backgroundColor: "rgba(6, 29, 41, 0.85)",
                  borderRadius: "8px",
                  padding: "4px 8px",
                  fontSize: "12px",
                }}
              >
                <Clock className="w-3 h-3" />
                {video.duration}
              </span>
            </div>

            {/* platform tags — bottom left */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
              {["TikTok", "Shorts", "Reels"].map((p) => (
                <span
                  key={p}
                  className="font-sans text-paper"
                  style={{
                    backgroundColor: "rgba(6, 29, 41, 0.7)",
                    borderRadius: "8px",
                    padding: "3px 8px",
                    fontSize: "11px",
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* content */}
        <div className="flex-1 flex flex-col" style={{ padding: "20px" }}>
          <p className="font-sans text-mist mb-2" style={{ fontSize: "13px" }}>
            {video.category}
          </p>
          <h3
            className="headline-serif text-ink mb-3"
            style={{ fontSize: "22px", lineHeight: 1.22 }}
          >
            {video.title}
          </h3>

          {/* hook */}
          <div className="mb-3 pl-3 border-l-2 border-deep-teal">
            <p className="font-sans font-medium text-deep-teal mb-1" style={{ fontSize: "12px" }}>
              HOOK (0–15s)
            </p>
            <p className="font-sans font-medium text-ink italic leading-snug" style={{ fontSize: "14px" }}>
              {video.hook}
            </p>
          </div>

          {/* solution */}
          <div className="mb-3 flex gap-3">
            <span className="shrink-0 font-sans font-medium text-deep-teal mt-0.5" style={{ fontSize: "12px" }}>
              SOLUTION
            </span>
            <p className="font-sans text-mist leading-snug flex-1" style={{ fontSize: "13px" }}>{video.solution}</p>
          </div>

          {/* CTA */}
          <div className="mt-auto pt-3 border-t border-ink/10 flex items-center gap-2">
            <span className="font-sans font-medium text-deep-teal shrink-0" style={{ fontSize: "12px" }}>
              CTA
            </span>
            <p className="font-sans font-medium text-ink" style={{ fontSize: "13px" }}>{video.cta}</p>
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
        title={<>Video ngắn <span className="text-mist">TikTok · Shorts · Reels</span></>}
        subtitle="11 kịch bản video đồng bộ 1-1 với 11 bài học. Mỗi video 60 giây với cấu trúc Hook → Solution → CTA rõ ràng."
      />

      <StructureInfographic />

      {/* Video grid */}
      <section className="py-20 px-5 sm:px-8 bg-paper">
        <div className="max-w-[1200px] mx-auto">
          <Reveal>
            <div className="text-center mb-16 max-w-[720px] mx-auto">
              <span className="badge-mint mb-6">11 kịch bản hoàn chỉnh</span>
              <h2
                className="headline-serif text-ink mb-4"
                style={{ fontSize: "clamp(36px, 5vw, 46px)", lineHeight: 1.15 }}
              >
                Mỗi video — một bài học
              </h2>
              <p className="font-sans text-ink mx-auto" style={{ fontSize: "18px", lineHeight: 1.5, maxWidth: "560px" }}>
                11 portfolio tiles với hình minh hoạ, badges thời lượng, và platform tags.
                Hoàn chỉnh Hook → Solution → CTA cho từng video.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIDEOS.map((v) => (
              <VideoCard key={v.no} video={v} />
            ))}
          </div>

          {/* Rating proof */}
          <Reveal delay={300}>
            <div className="mt-16 flex items-center justify-center gap-3 flex-wrap">
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
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA back to course on cream */}
      <section className="py-20 px-5 sm:px-8 bg-cream">
        <div className="max-w-[720px] mx-auto text-center">
          <Reveal>
            <span className="badge-mint mb-6">Đọc chi tiết</span>
            <h2
              className="headline-serif text-ink mb-4"
              style={{ fontSize: "clamp(32px, 4vw, 40px)", lineHeight: 1.15 }}
            >
              Mỗi kịch bản = 1 bài học đầy đủ
            </h2>
            <p className="font-sans text-ink mx-auto mb-8" style={{ fontSize: "18px", lineHeight: 1.5, maxWidth: "560px" }}>
              Xem 3 hướng Hook thực chiến, Solution và CTA chi tiết cho mỗi bài.
            </p>
            <Link href="/khoa-hoc" className="btn-teal animate-gentle-pulse inline-flex items-center justify-center gap-2">
              <ArrowRight className="w-4 h-4 rotate-180" />
              Xem 11 bài học chi tiết
            </Link>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
