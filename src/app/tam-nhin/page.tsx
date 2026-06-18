"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Compass,
  Zap,
  Layers,
  ArrowRight,
  Quote,
  Target,
  Microscope,
  Users,
  Calendar,
  GraduationCap,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { PageHero } from "@/components/site/page-hero";
import { LeverDiagram } from "@/components/site/lever-diagram";
import { SiteFooter } from "@/components/site/footer";

/* ---------------- Triết lý section ---------------- */
function PhilosophySection() {
  return (
    <section id="triet-ly" className="relative py-20 sm:py-28 px-5 sm:px-8 bg-foreground text-background overflow-hidden">
      <div className="absolute inset-0 bg-grain-dark opacity-40 pointer-events-none" aria-hidden />
      <div
        className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "oklch(0.74 0.13 85)" }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Section heading */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2.5 mb-5 justify-center">
              <span className="h-px w-8 bg-accent/60" />
              <span className="text-[11px] tracking-[0.3em] uppercase font-semibold text-accent">
                Phần 01 · Triết lý vận hành
              </span>
              <span className="h-px w-8 bg-accent/60" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
              Chuyên môn làm <span className="italic text-accent font-light">điểm tựa</span>
              <br />
              AI làm <span className="italic text-accent font-light">đòn bẩy</span>
            </h2>
          </div>
        </Reveal>

        {/* Big quote */}
        <Reveal delay={150}>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full border border-accent/30 mb-6">
              <Quote className="w-6 h-6 text-accent" />
            </div>
            <p className="font-display text-2xl sm:text-3xl md:text-4xl leading-snug italic text-background/90">
              Khi có <span className="text-accent not-italic font-medium">điểm tựa vững chắc</span>,
              một lực nhỏ từ AI sẽ nâng toàn bộ hiệu suất dạy học lên
              <span className="text-accent not-italic font-medium"> gấp 10 lần</span>.
            </p>
          </div>
        </Reveal>

        {/* Two-column: lever diagram + image */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <Reveal delay={200}>
            <div className="rounded-3xl border border-background/10 bg-background/5 backdrop-blur-sm p-6 sm:p-8 h-full">
              <LeverDiagram className="w-full h-auto" />
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div className="relative rounded-3xl overflow-hidden h-full min-h-[400px]">
              <img
                src="https://sfile.chatglm.cn/images-ppt/478c06e221cf.jpg"
                alt="Sơ đồ đòn bẩy vật lý kinh điển — minh hoạ nguyên lý Archimedes"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-[10px] tracking-[0.25em] uppercase text-accent mb-2">
                  Nguyên lý vật lý kinh điển
                </p>
                <p className="font-serif text-lg italic text-background leading-snug">
                  "Cho tôi một điểm tựa đủ dài, tôi sẽ nâng bổng cả thế giới."
                </p>
                <p className="text-[10px] tracking-[0.25em] uppercase text-background/50 mt-2">
                  — Archimedes
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Three pillars */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Compass,
              label: "Điểm tựa",
              title: "Pivot Point",
              desc: "Chuyên môn, nghiệp vụ sư phạm và trách nhiệm của người giáo viên. Điểm tựa phải vững chắc — giáo viên làm chủ 100% nội dung.",
              color: "oklch(0.82 0.13 85)",
            },
            {
              icon: Zap,
              label: "Lực tác động",
              title: "Force Input",
              desc: "Sự hỗ trợ tốc độ từ các mô hình AI — Gemini Gems, NotebookLM, Marp CLI, HTML-to-Video — biến công việc giờ thành giây.",
              color: "oklch(0.74 0.13 85)",
            },
            {
              icon: Layers,
              label: "Vật nâng",
              title: "Load",
              desc: "Khối lượng công việc soạn giáo án, thiết kế slide, vẽ hình vector, soạn đề thi và chấm bài — được nâng nhẹ nhàng nhờ đòn bẩy.",
              color: "oklch(0.62 0.08 145)",
            },
          ].map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 120}>
                <div className="group h-full p-7 rounded-2xl border border-background/10 bg-background/[0.03] hover:bg-background/[0.06] transition-all duration-500">
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-5"
                    style={{ background: `${p.color}20`, color: p.color }}
                  >
                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                  </div>
                  <p
                    className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-1"
                    style={{ color: p.color }}
                  >
                    {p.label}
                  </p>
                  <h3 className="font-serif text-2xl mb-3 text-background">{p.title}</h3>
                  <p className="text-sm text-background/65 leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Warning note */}
        <Reveal delay={400}>
          <div className="mt-10 max-w-3xl mx-auto p-6 rounded-2xl border border-accent/30 bg-accent/5">
            <p className="text-sm text-background/80 leading-relaxed text-center">
              <span className="font-serif italic text-accent">⚠ Lưu ý cốt lõi:</span> Nếu điểm tựa
              chuyên môn bị lỏng lẻo — giáo viên tin tưởng mù quáng vào AI mà không kiểm duyệt —
              lực đẩy của AI sẽ làm sụp đổ hệ thống kiến thức, gây ảo giác và sai số vật lý.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Tầm nhìn 2030 section ---------------- */
function VisionSection() {
  const milestones = [
    {
      year: "2024",
      icon: Target,
      tag: "Định vị",
      title: "Cổng học liệu số #1",
      desc: "Trở thành cổng học liệu và trợ lý AI thực chiến số 1 tại Việt Nam cho giáo viên Vật lý và KHTN THPT bám sát GDPT 2018.",
      accent: "oklch(0.74 0.13 85)",
    },
    {
      year: "2026",
      icon: Microscope,
      tag: "Tác động giáo dục",
      title: "Tiên phong GEMS V6",
      desc: "Dẫn dắt phương pháp thiết kế tài liệu chuẩn sư phạm GEMS V6 kết hợp Edu-Graphic vào lớp học tích cực.",
      accent: "oklch(0.62 0.08 145)",
    },
    {
      year: "2030",
      icon: Users,
      tag: "Cộng đồng",
      title: "Giáo viên chuyển đổi số",
      desc: "Xây dựng thế hệ giáo viên thực chiến — đứng trên vai khổng lồ công nghệ nhưng luôn nắm quyền kiểm soát sư phạm.",
      accent: "oklch(0.55 0.06 50)",
    },
  ];

  return (
    <section id="tam-nhin-2030" className="relative py-20 sm:py-28 px-5 sm:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" aria-hidden />
      <div className="max-w-7xl mx-auto relative">
        {/* Section heading */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2.5 mb-5 justify-center">
              <span className="h-px w-8 bg-accent/60" />
              <span className="text-[11px] tracking-[0.3em] uppercase font-semibold text-accent">
                Phần 02 · Tầm nhìn 2030
              </span>
              <span className="h-px w-8 bg-accent/60" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-foreground tracking-tight">
              Mười năm tới — <span className="italic font-light text-accent">một tầm nhìn dài hạn</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Định vị rõ ràng, tác động giáo dục sâu rộng, và một cộng đồng giáo viên thực chiến vững mạnh.
            </p>
          </div>
        </Reveal>

        {/* Timeline */}
        <div className="relative mb-16">
          {/* horizontal line */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-accent/20 via-accent/40 to-accent/20" />
          <div className="grid md:grid-cols-3 gap-8 md:gap-6 relative">
            {milestones.map((m, i) => {
              const Icon = m.icon;
              return (
                <Reveal key={m.year} delay={i * 150}>
                  <div className="relative flex flex-col items-center text-center">
                    <div className="relative mb-6 z-10">
                      <div
                        className="absolute inset-0 rounded-full blur-xl opacity-30"
                        style={{ background: m.accent }}
                      />
                      <div
                        className="relative w-20 h-20 rounded-full flex items-center justify-center border-2 bg-card shadow-xl"
                        style={{ borderColor: m.accent }}
                      >
                        <Icon className="w-9 h-9" style={{ color: m.accent }} strokeWidth={1.5} />
                      </div>
                      <span
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold font-serif italic text-background whitespace-nowrap"
                        style={{ background: m.accent }}
                      >
                        {m.year}
                      </span>
                    </div>
                    <p
                      className="text-[10px] uppercase tracking-[0.3em] font-semibold mt-4 mb-2"
                      style={{ color: m.accent }}
                    >
                      {m.tag}
                    </p>
                    <h3 className="font-serif text-2xl text-foreground mb-3 leading-tight">
                      {m.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                      {m.desc}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Image banner */}
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <div className="aspect-[21/9] sm:aspect-[3/1]">
              <img
                src="https://sfile.chatglm.cn/images-ppt/378e39681c7e.jpg"
                alt="Tầm nhìn tương lai giáo dục công nghệ"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/60 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-xl px-8 sm:px-14 text-background">
                <p className="text-[10px] tracking-[0.3em] uppercase text-accent mb-3 flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  2030
                </p>
                <p className="font-serif text-2xl sm:text-4xl leading-tight">
                  Đứng trên vai khổng lồ công nghệ, giữ vững quyền kiểm soát sư phạm.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Sứ mệnh section ---------------- */
function MissionSection() {
  const missions = [
    {
      icon: GraduationCap,
      tag: "4.1",
      audience: "Đối với Giáo viên",
      title: "Giải phóng & Trao quyền",
      accent: "oklch(0.74 0.13 85)",
      image: "https://sfile.chatglm.cn/images-ppt/022751ed6abd.jpg",
      points: [
        {
          sub: "Giải phóng thời gian",
          desc: "Rút ngắn thời gian chuẩn bị bài từ hàng giờ xuống hàng giây nhờ quy trình tự động hóa E2E — NotebookLM tạo slide, Marp CLI xuất PPTX trong 3 giây, TikZ Gem vẽ sơ đồ vector.",
        },
        {
          sub: "Trao quyền kiểm soát",
          desc: "Định hình quy trình kiểm duyệt chéo nội dung AI (ví dụ: bắt buộc giải toán 3 bước để kiểm tra sai số) giúp giáo viên hoàn toàn kiểm soát chuyên môn lớp học.",
        },
      ],
    },
    {
      icon: Sparkles,
      tag: "4.2",
      audience: "Đối với Học sinh",
      title: "Trực quan & Tương tác chủ động",
      accent: "oklch(0.62 0.08 145)",
      image: "https://sfile.chatglm.cn/images-ppt/53e0e8de6eb5.jpeg",
      points: [
        {
          sub: "Bẻ gãy ngộ nhận (MythBusters)",
          desc: "Vượt qua các ngộ nhận vật lý kinh điển thông qua bộ đề trắc nghiệm chẩn đoán Đúng/Sai 2025 — phát hiện và sửa chữa sai lầm khái niệm ngay từ gốc.",
        },
        {
          sub: "STEM thực tiễn",
          desc: "Kích thích tư duy khám phá qua mô phỏng tương tác SVG trên di động (dòng nhiệt, nhiệt kế Spring Bounce) và hoạt động luân chuyển trạm tích hợp QR Code.",
        },
      ],
    },
    {
      icon: BookOpen,
      tag: "4.3",
      audience: "Đối với Học liệu",
      title: "Chuẩn hóa GEMS V6",
      accent: "oklch(0.55 0.06 50)",
      image: "https://sfile.chatglm.cn/images-ppt/db1f6315d5d4.jpg",
      points: [
        {
          sub: "Đồng bộ hệ sinh thái",
          desc: "Bốn trụ cột G-E-M-S định nghĩa lại tiêu chuẩn học liệu Vật lý: đồ họa vector sắc nét, trải nghiệm giác quan, bố cục tối giản và bản chất khoa học trung thực.",
        },
        {
          sub: "Tối ưu cho lớp học",
          desc: "Phối màu organic dịu mắt, in ấn trắng đen vẫn sắc nét (Grayscale optimize), bố cục 2 cột thoáng đãng — sẵn sàng cho mọi điều kiện trường học Việt Nam.",
        },
      ],
    },
  ];

  return (
    <section id="su-menh" className="relative py-20 sm:py-28 px-5 sm:px-8 bg-secondary/40 overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none" aria-hidden />
      <div className="max-w-7xl mx-auto relative">
        {/* Section heading */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2.5 mb-5 justify-center">
              <span className="h-px w-8 bg-accent/60" />
              <span className="text-[11px] tracking-[0.3em] uppercase font-semibold text-accent">
                Phần 03 · Sứ mệnh
              </span>
              <span className="h-px w-8 bg-accent/60" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-foreground tracking-tight">
              Ba đối tượng — <span className="italic font-light text-accent">một sứ mệnh chung</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Mỗi đối tượng được trao một giá trị cụ thể, cùng hướng tới mục tiêu nâng tầm dạy học Vật lý Việt Nam.
            </p>
          </div>
        </Reveal>

        {/* Missions with image — alternating */}
        <div className="space-y-12">
          {missions.map((m, i) => {
            const Icon = m.icon;
            const isReversed = i % 2 === 1;
            return (
              <Reveal key={m.tag} delay={i * 120}>
                <article className="grid lg:grid-cols-12 gap-8 lg:gap-12 p-7 sm:p-10 rounded-3xl bg-card border border-border shadow-sm">
                  {/* Image side */}
                  <div className={`lg:col-span-5 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                      <img
                        src={m.image}
                        alt={`${m.audience} — ${m.title}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <div
                          className="inline-flex items-center justify-center w-11 h-11 rounded-xl backdrop-blur-sm"
                          style={{ background: `${m.accent}30`, color: m.accent }}
                        >
                          <Icon className="w-6 h-6" strokeWidth={1.5} />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <p
                          className="text-[10px] uppercase tracking-[0.25em] font-semibold mb-0.5"
                          style={{ color: m.accent }}
                        >
                          Sứ mệnh {m.tag}
                        </p>
                        <p className="text-xs text-background/70">{m.audience}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content side */}
                  <div className={`lg:col-span-7 ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
                    <h3 className="font-serif text-2xl sm:text-3xl text-foreground mb-6 leading-tight">
                      {m.title}
                    </h3>
                    <div className="space-y-5">
                      {m.points.map((p, idx) => (
                        <div key={p.sub} className="flex gap-4">
                          <div className="shrink-0 mt-1">
                            <span
                              className="flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold font-serif italic"
                              style={{ background: `${m.accent}15`, color: m.accent }}
                            >
                              {idx + 1}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-serif text-lg text-foreground mb-1.5">{p.sub}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Unifying statement */}
        <Reveal>
          <div className="mt-16 max-w-3xl mx-auto text-center p-8 sm:p-10 rounded-3xl bg-foreground text-background">
            <p className="text-[11px] tracking-[0.3em] uppercase font-semibold text-accent mb-4">
              Mục tiêu chung
            </p>
            <p className="font-display text-2xl sm:text-3xl italic leading-snug text-background/90">
              Giáo viên <span className="text-accent not-italic font-medium">giải phóng</span> thời gian,
              học sinh <span className="text-accent not-italic font-medium">chủ động</span> tương tác,
              học liệu <span className="text-accent not-italic font-medium">chuẩn hoá</span> sư phạm —
              một hệ sinh thái đồng bộ.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Page ---------------- */
export default function TamNhinPage() {
  return (
    <>
      <PageHero
        eyebrow="Triết lý · Tầm nhìn · Sứ mệnh"
        title="Một triết lý —"
        italic="một tầm nhìn, một sứ mệnh"
        subtitle="Ba phần hợp nhất trong một trang: triết lý đòn bẩy làm nền, tầm nhìn 2030 làm định hướng, sứ mệnh ba đối tượng làm hành động."
      />

      <PhilosophySection />
      <VisionSection />
      <MissionSection />

      {/* Next chapter CTA */}
      <section className="relative py-16 px-5 sm:px-8 border-t border-border">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <Link
              href="/phieu"
              className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-foreground text-background font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-lg"
            >
              Chương tiếp · Phễu tác động
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
