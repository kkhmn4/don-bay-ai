"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Palette, Sparkles, Layers, Microscope, CheckCircle2, Quote, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { PageHero } from "@/components/site/page-hero";
import { SiteFooter } from "@/components/site/footer";

const PILLARS = [
  {
    letter: "G",
    name: "Graphic",
    vi: "Đồ họa cao cấp",
    icon: Palette,
    desc: "Sơ đồ vector TikZ sắc nét phóng to 1000% không vỡ hạt, thay thế hoàn toàn hình ảnh nhòe đen tải từ Internet.",
    points: ["Vector TikZ", "Phóng 1000%", "Không vỡ hạt", "In ấn sắc nét"],
    accent: "oklch(0.74 0.13 85)",
    detail:
      "Trong thời đại slide PowerPoint ngập hình ảnh tải từ Google, GEMS V6 chọn con đường vector. Mỗi đường vẽ, mỗi ký hiệu vật lý đều được lập trình bằng TikZ — phóng to 1000 lần vẫn sắc nét, in trắng đen vẫn rõ ràng, có thể chỉnh sửa từng pixel.",
  },
  {
    letter: "E",
    name: "Experiential",
    vi: "Trải nghiệm giác quan",
    icon: Sparkles,
    desc: "Tiến trình bài học dẫn dắt học sinh đi từ trải nghiệm thực tế đến lý thuyết cốt lõi — học qua làm, hiểu qua cảm nhận.",
    points: ["Học qua làm", "Trải nghiệm thực", "Lý thuyết cốt lõi", "Cảm nhận giác quan"],
    accent: "oklch(0.62 0.08 145)",
    detail:
      "Học sinh không tiếp thu vật lý qua định nghĩa khô khan. Mỗi khái niệm bắt đầu từ một hiện tượng cảm nhận được — dòng nhiệt trên da, độ nảy của lò xo, ánh sáng khúc xạ — rồi mới đến công thức và định lý.",
  },
  {
    letter: "M",
    name: "Minimalist",
    vi: "Tối giản tinh tế",
    icon: Layers,
    desc: "Phối màu organic (xanh sage, đồng cỏ, kem) dịu mắt, in ấn trắng đen vẫn sắc nét, bố cục 2 cột thoáng đãng.",
    points: ["Phối màu organic", "Grayscale optimize", "Bố cục 2 cột", "Dịu mắt"],
    accent: "oklch(0.55 0.06 50)",
    detail:
      "Triết lý minimalism không phải là bớt cho nhẹ — mà là chọn lọc từng yếu tố để mỗi chi tiết đều có ý nghĩa. Phối màu organic dịu mắt giúp học sinh không bị mỏi sau 45 phút. Bố cục 2 cột thoáng đãng cho phép giáo viên in 2 mặt tiết kiệm giấy.",
  },
  {
    letter: "S",
    name: "Scientific Realism",
    vi: "Bản chất khoa học",
    icon: Microscope,
    desc: "Tuyệt đối trung thành với hiện tượng vật lý đời thực, loại bỏ các hình hoạt họa bong bóng phi thực tế.",
    points: ["Trung thực vật lý", "Loại bỏ bong bóng", "Hiện tượng đời thực", "Bản chất khoa học"],
    accent: "oklch(0.45 0.045 165)",
    detail:
      "Không nhân hoá vật thể. Không vẽ electron có mắt. Mỗi hình vẽ trong GEMS V6 phản ánh chính xác hiện tượng vật lý đời thực — vì học sinh cần hiểu bản chất khoa học, không phải nhớ hình hoạt hình.",
  },
];

export default function GemsPage() {
  return (
    <>
      <PageHero
        eyebrow="GEMS V6 — Bốn trụ cột học liệu"
        title="Chuẩn sư phạm —"
        italic="G · E · M · S"
        subtitle="Bốn chữ cái định nghĩa lại tiêu chuẩn học liệu Vật lý: đồ họa, trải nghiệm, tối giản, và bản chất khoa học."
      />

      {/* GEMS letters preview */}
      <section className="relative py-16 px-5 sm:px-8 bg-foreground text-background overflow-hidden">
        <div className="absolute inset-0 bg-grain-dark opacity-30 pointer-events-none" aria-hidden />
        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PILLARS.map((p, i) => (
              <Reveal key={p.letter} delay={i * 100}>
                <div className="text-center p-6 rounded-2xl border border-background/10 bg-background/[0.03]">
                  <p
                    className="font-serif italic font-bold text-7xl sm:text-8xl mb-2"
                    style={{ color: p.accent }}
                  >
                    {p.letter}
                  </p>
                  <p className="font-serif text-lg text-background/90">{p.name}</p>
                  <p className="text-[10px] uppercase tracking-[0.25em] mt-1" style={{ color: p.accent }}>
                    {p.vi}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed pillars - alternating layout */}
      <section className="relative py-20 sm:py-28 px-5 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" aria-hidden />
        <div className="max-w-6xl mx-auto relative space-y-16 sm:space-y-24">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            const isReversed = i % 2 === 1;
            return (
              <Reveal key={p.letter} delay={i * 100}>
                <article className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  {/* Letter showcase */}
                  <div className={`lg:col-span-4 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                    <div
                      className="relative aspect-square max-w-sm mx-auto rounded-3xl flex items-center justify-center overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, ${p.accent}18 0%, ${p.accent}05 100%)`,
                      }}
                    >
                      <span
                        className="font-serif italic font-bold text-[16rem] leading-none select-none pointer-events-none"
                        style={{ color: `${p.accent}40` }}
                      >
                        {p.letter}
                      </span>
                      <div
                        className="absolute top-6 right-6 inline-flex items-center justify-center w-12 h-12 rounded-2xl"
                        style={{ background: `${p.accent}25`, color: p.accent }}
                      >
                        <Icon className="w-6 h-6" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`lg:col-span-8 ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
                    <p
                      className="text-[10px] uppercase tracking-[0.3em] font-semibold mb-3"
                      style={{ color: p.accent }}
                    >
                      Trụ cột {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-serif text-3xl sm:text-4xl text-foreground mb-2 leading-tight">
                      {p.name}
                    </h3>
                    <p className="font-serif italic text-xl mb-5" style={{ color: p.accent }}>
                      {p.vi}
                    </p>
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-5">
                      {p.desc}
                    </p>
                    <p className="text-sm text-foreground/75 leading-relaxed mb-6 italic">
                      {p.detail}
                    </p>

                    {/* tags */}
                    <div className="flex flex-wrap gap-2">
                      {p.points.map((pt) => (
                        <span
                          key={pt}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border"
                          style={{
                            background: `${p.accent}10`,
                            color: p.accent,
                            borderColor: `${p.accent}30`,
                          }}
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          {pt}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Final manifesto */}
      <section className="relative py-20 px-5 sm:px-8 bg-secondary/40">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <Quote className="w-12 h-12 text-accent mx-auto mb-6" />
            <p className="font-display text-2xl sm:text-3xl md:text-4xl italic leading-snug text-foreground/90">
              GEMS V6 — không chỉ là bộ tiêu chuẩn học liệu,
              <br className="hidden sm:block" />
              <span className="text-accent not-italic font-medium">
                {" "}là triết lý sư phạm hiện đại.
              </span>
            </p>
            <p className="mt-8 text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
              Đòn Bẩy AI · GEMS Physics Leader
            </p>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 px-5 sm:px-8 bg-foreground text-background overflow-hidden">
        <div className="absolute inset-0 bg-grain-dark opacity-30 pointer-events-none" aria-hidden />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vw] rounded-full opacity-25 blur-3xl pointer-events-none"
          style={{ background: "oklch(0.74 0.13 85 / 0.5)" }}
        />

        <div className="max-w-5xl mx-auto relative text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-background/15 bg-background/5 backdrop-blur-sm mb-8">
              <span className="text-[11px] tracking-[0.25em] uppercase font-medium text-background/80">
                Triết lý cốt lõi
              </span>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
              <span className="block italic font-light text-background/80">Đòn Bẩy AI</span>
              <span className="block mt-2">
                Giáo viên <span className="text-accent">kiểm soát</span>,
              </span>
              <span className="block">
                AI <span className="text-accent">tối ưu hiệu suất</span>.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={450}>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-accent-foreground font-medium hover:bg-background hover:text-foreground transition-all duration-300 shadow-lg shadow-accent/20"
              >
                Về trang chủ
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/triet-ly"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-background/20 text-background/90 hover:border-accent hover:text-accent transition-colors duration-300"
              >
                Đọc lại Triết lý
              </Link>
            </div>
          </Reveal>

          <Reveal delay={600}>
            <div className="mt-16 pt-10 border-t border-background/10">
              <p className="font-serif italic text-xl text-background/90">Thầy Kha Khung Hiệp</p>
              <p className="text-[11px] tracking-[0.3em] uppercase text-background/40 mt-2">
                GEMS Physics Leader · Sáng lập Đòn Bẩy AI
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter dark />
    </>
  );
}
