"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Leaf, Sparkles, BookOpen, Gamepad2, GraduationCap, Quote, Target, ShieldCheck, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { SiteFooter } from "@/components/site/footer";
import { PageHero } from "@/components/site/page-hero";

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Chuẩn sư phạm GEMS",
    desc: "7 nguyên tắc sư phạm cốt lõi — Phiếu học tập, Slide và Bài tập đồng bộ 1-1, kiểm định 15 tiêu chí QA.",
    wash: "mint"
  },
  {
    icon: Target,
    title: "Chuyên sâu Vật lý 12",
    desc: "Đi sâu chương trình GDPT 2018 — Kết nối tri thức. 12 loại nhiệm vụ học tập, CD1-CD7 pipeline tự động.",
    wash: "cream"
  },
  {
    icon: Sparkles,
    title: "AI Teacher-First",
    desc: "Giáo viên kiểm soát hoàn toàn, AI là công cụ tối ưu hiệu suất — không thay thế, không chung chung.",
    wash: "blossom"
  }
];

const MILESTONES = [
  { year: "2024", event: "Khởi xướng ý tưởng hệ sinh thái học liệu tương tác tích hợp AI cho giáo viên Vật lý THPT." },
  { year: "06/2025", event: "Hoàn thiện phiên bản GEMS v6.0 và ra mắt các mẫu PHT, Slide đầu tiên." },
  { year: "06/2026", event: "Phiên bản GEMS v7.0 ra mắt với 15 tiêu chí QA, 12 loại nhiệm vụ học tập, 6 bước vận hành." },
  { year: "Hiện tại", event: "Ra mắt hệ sinh thái Đòn Bẩy AI: Web Portal don-bay-ai, AR Games Hub, Student Portal & thư viện khóa học AI." }
];

function getWashBg(wash: string) {
  switch (wash) {
    case "mint": return "#b9ffe8";
    case "cream": return "#fffded";
    case "blossom": return "#ffc3e6";
    default: return "#ffffff";
  }
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Giới thiệu"
        title={<>Về <span className="text-teal-gradient">Đòn Bẩy AI</span></>}
        subtitle="Giáo viên chủ động dẫn dắt — AI tối ưu hiệu suất soạn giảng. Một hệ sinh thái học liệu từ tâm huyết của Thầy Kha Khung Hiệp."
      />

      {/* ===== Sứ mệnh ===== */}
      <section className="py-16 px-5 sm:px-8 bg-paper border-y border-hairline">
        <div className="max-w-[860px] mx-auto">
          <Reveal>
            <div className="flex items-start gap-6 p-8 bg-mint-glass/30 rounded-[24px] border border-hairline">
              <Quote className="w-10 h-10 text-deep-teal shrink-0 mt-1" strokeWidth={1.2} />
              <div>
                <p className="headline-serif text-ink text-[24px] leading-snug mb-4">
                  "Lever metaphor — Sức mạnh AI làm điểm tựa, giúp nâng khối lượng công việc nặng nề của giáo viên"
                </p>
                <p className="font-sans text-mist text-[15px]">
                  <strong className="text-ink">Cốt lõi:</strong> Đòn bẩy là công cụ nhân lực — AI là điểm tựa kiến thức — 
                  Nỗ lực của giáo viên được khuếch đại để nâng tầm học sinh. 
                  Đây là một hệ sinh thái đồng bộ, không phải một ứng dụng riêng lẻ.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Tác giả ===== */}
      <section className="py-20 px-5 sm:px-8 bg-paper">
        <div className="max-w-[860px] mx-auto grid md:grid-cols-[300px_1fr] gap-10 items-start">
          <Reveal>
            <div className="bg-cream rounded-[24px] p-8 text-center border border-hairline">
              <div className="w-28 h-28 mx-auto mb-4 bg-gradient-to-br from-deep-teal to-bright-teal rounded-full flex items-center justify-center">
                <GraduationCap className="w-14 h-14 text-white" />
              </div>
              <h2 className="headline-serif text-ink text-[22px]">Thầy Kha Khung Hiệp</h2>
              <p className="font-sans text-mist text-[14px] mt-1">Chuyên gia AI & Mô phỏng dạy học tương tác</p>
              <div className="mt-4 px-4 py-3 bg-mint-glass/40 rounded-xl">
                <p className="font-sans text-ink text-[13px] font-medium">
                  Giáo viên Vật lý THPT
                </p>
                <p className="font-sans text-mist text-[12px]">Chương trình GDPT 2018 · Kết nối tri thức</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="space-y-4">
              <p className="font-sans text-mist text-[16px] leading-relaxed">
                Với hơn 15 năm kinh nghiệm giảng dạy Vật lý bậc THPT, Thầy Kha Khung Hiệp nhận thấy 
                sự lãng phí khổng lồ về thời gian và công sức của giáo viên trong việc soạn giáo án, 
                thiết kế phiếu học tập và bài kiểm tra.
              </p>
              <p className="font-sans text-mist text-[16px] leading-relaxed">
                <strong className="text-ink">Đòn Bẩy AI</strong> ra đời như một giải pháp tổng thể — 
                không chỉ là một trang web khóa học, mà là <strong className="text-ink">hệ sinh thái đồng bộ</strong> 
                kết nối 3 cấu phần: <strong className="text-deep-teal">Soạn tài liệu</strong> (Core Engine), 
                <strong className="text-deep-teal"> Cổng thông tin</strong> (Web Portal), và 
                <strong className="text-deep-teal"> Hệ thống Video</strong> (Bài giảng đa kênh).
              </p>
              <p className="font-sans text-mist text-[16px] leading-relaxed">
                Phương châm của Thầy: <em>"Giáo viên kiểm soát hoàn toàn quy trình sư phạm,
                AI đảm nhận các tác vụ tối ưu hóa hiệu suất, lặp lại và xử lý dữ liệu."</em>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Giá trị cốt lõi ===== */}
      <section className="py-20 px-5 sm:px-8 bg-cream border-y border-hairline">
        <div className="max-w-[1000px] mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <span className="badge-mint mb-4">Giá trị cốt lõi</span>
              <h2 className="headline-serif text-ink text-[clamp(32px,4vw,40px)]">
                Ba trụ cột của <span className="text-teal-gradient">Đòn Bẩy AI</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.title} delay={i * 100}>
                  <div className="bg-paper border border-hairline rounded-[24px] p-8 h-full">
                    <div
                      className="inline-flex items-center justify-center mb-5 w-14 h-14 rounded-2xl"
                      style={{ backgroundColor: getWashBg(v.wash) }}
                    >
                      <Icon className="w-7 h-7 text-deep-teal" strokeWidth={1.5} />
                    </div>
                    <h3 className="font-sans font-semibold text-ink text-[18px] mb-3">{v.title}</h3>
                    <p className="font-sans text-mist text-[15px] leading-relaxed">{v.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Hệ sinh thái ===== */}
      <section className="py-20 px-5 sm:px-8 bg-paper">
        <div className="max-w-[860px] mx-auto text-center">
          <Reveal>
            <span className="badge-mint mb-4">Kiến trúc đồng bộ</span>
            <h2 className="headline-serif text-ink text-[clamp(28px,3.5vw,36px)] mb-6">
              Hệ sinh thái 3 cấu phần
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-5 text-left">
            {[
              { no: "1", title: "Core Engine", desc: "Tự động sinh PHT in ấn, Slide bài giảng, Bài tập LaTeX & TikZ theo chuẩn GEMS v7.0.", sub: "Python · python-docx · LaTeX" },
              { no: "2", title: "Web Portal", desc: "11 bài học thực hành, game AR tương tác Webcam, cổng trò chơi đối kháng.", sub: "Next.js 16 · Tailwind · MediaPipe" },
              { no: "3", title: "Video Engine", desc: "Kịch bản video 60s đa nền tảng (TikTok/YouTube Shorts) song hành với nội dung bài học.", sub: "FFmpeg · HTML-video · Remotion" },
            ].map((c, i) => (
              <Reveal key={c.no} delay={i * 80}>
                <div className="border border-hairline rounded-[24px] p-6 h-full">
                  <div className="bg-mint-glass text-deep-teal w-10 h-10 rounded-full flex items-center justify-center text-[18px] font-bold mb-4">{c.no}</div>
                  <h3 className="font-sans font-semibold text-ink text-[18px] mb-2">{c.title}</h3>
                  <p className="font-sans text-mist text-[14px] leading-relaxed mb-3">{c.desc}</p>
                  <p className="font-sans text-[12px] text-deep-teal font-mono">{c.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-10 p-6 bg-mint-glass/20 border border-hairline rounded-[24px]">
              <p className="font-sans text-mist text-[14px] leading-relaxed">
                <strong className="text-ink">Luồng dữ liệu:</strong> Nguồn bài viết SGK gốc 
                → Core Engine sinh tài liệu → Tích hợp lên Web Portal làm bài học 
                → Kịch bản video xuất bản đa kênh → Thu hút người dùng về web.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Dấu mốc ===== */}
      <section className="py-20 px-5 sm:px-8 bg-cream border-y border-hairline">
        <div className="max-w-[720px] mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <span className="badge-mint mb-4">Hành trình</span>
              <h2 className="headline-serif text-ink text-[clamp(28px,3.5vw,36px)]">
                Các dấu mốc
              </h2>
            </div>
          </Reveal>

          <div className="space-y-0">
            {MILESTONES.map((m, i) => (
              <Reveal key={m.year} delay={i * 60}>
                <div className="flex gap-5 pb-8 relative">
                  {/* Timeline dot + line */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-4 h-4 rounded-full bg-deep-teal border-2 border-paper z-10" />
                    {i < MILESTONES.length - 1 && (
                      <div className="w-px flex-1 bg-hairline mt-1" />
                    )}
                  </div>
                  <div className="pb-4">
                    <span className="badge-mint text-[12px] mb-2 inline-block">{m.year}</span>
                    <p className="font-sans text-mist text-[15px] leading-relaxed">{m.event}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Lợi thế cạnh tranh ===== */}
      <section className="py-20 px-5 sm:px-8 bg-paper">
        <div className="max-w-[860px] mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <span className="badge-mint mb-4">Lợi thế</span>
              <h2 className="headline-serif text-ink text-[clamp(28px,3.5vw,36px)]">
                Vì sao Đòn Bẩy AI khác biệt?
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              { title: "Chuyên sâu Vật lý 12", desc: "Không dàn trải 50 môn — đi sâu duy nhất một môn, một chương trình." },
              { title: "GEMS v7.0", desc: "Bộ khung sư phạm 7 nguyên tắc, 12 nhiệm vụ, 6 bước, 15 tiêu chí QA." },
              { title: "AI Agent Pipeline", desc: "Từ YCCĐ → Giáo án → PHT → Slide → Homework → Kiểm định — 1 luồng hoàn chỉnh." },
              { title: "Tương tác AR & Game", desc: "Webcam hand tracking, game đối kháng, phòng thí nghiệm ảo 3D." },
              { title: "Hoàn toàn không quảng cáo", desc: "Premium No-Ads — tôn trọng trải nghiệm dạy và học." },
              { title: "Đồng bộ 1-1", desc: "PHT học sinh - Slide giáo viên khớp 100% tiến trình, không lạc nhịp." },
            ].map((adv, i) => (
              <Reveal key={adv.title} delay={i * 60}>
                <div className="flex gap-4 p-5 bg-cream/50 border border-hairline rounded-[16px] h-full">
                  <div className="w-1 shrink-0 bg-deep-teal rounded-full" />
                  <div>
                    <h3 className="font-sans font-semibold text-ink text-[15px] mb-1">{adv.title}</h3>
                    <p className="font-sans text-mist text-[14px] leading-relaxed">{adv.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 px-5 sm:px-8 bg-mint-glass">
        <div className="max-w-[720px] mx-auto text-center">
          <Reveal>
            <span className="badge-mint mb-6 animate-badge-bounce">Sẵn sàng nâng tầm?</span>
            <h2 className="headline-serif text-ink mb-4" style={{ fontSize: "clamp(36px, 5.5vw, 52px)", lineHeight: 1.1 }}>
              Bắt đầu với <span className="text-teal-gradient">Đòn Bẩy AI</span>
            </h2>
            <p className="font-sans text-ink mx-auto mb-8" style={{ fontSize: "18px", lineHeight: 1.5, maxWidth: "560px" }}>
              11 bài học thực hành, game AR và trợ lý soạn giảng AI — tất cả trong một hệ sinh thái đồng bộ.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/khoa-hoc" className="btn-teal inline-flex items-center justify-center gap-2">
                Khám phá 11 bài học
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
