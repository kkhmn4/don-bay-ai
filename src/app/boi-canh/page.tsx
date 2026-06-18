"use client";

import { motion } from "framer-motion";
import { Quote, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/site/reveal";
import { PageHero } from "@/components/site/page-hero";
import { SiteFooter } from "@/components/site/footer";

export default function BoiCanhPage() {
  return (
    <>
      <PageHero
        eyebrow="Bối cảnh & Khát vọng"
        title="Nghịch lý của"
        italic="giáo viên Việt Nam"
        subtitle="Trong làn sóng AI bùng nổ, giáo viên đứng trước một thách thức chưa từng có — bơi giữa hàng nghìn công cụ nhưng vẫn lạc lối khi áp dụng vào lớp học thực tế."
      />

      {/* Magazine layout: main article + sidebar */}
      <section className="relative py-16 sm:py-20 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Main article column */}
            <article className="lg:col-span-8 space-y-8">
              {/* Drop cap intro */}
              <Reveal>
                <p className="font-display text-2xl sm:text-3xl leading-snug text-foreground/90 first-letter:font-serif first-letter:text-7xl first-letter:font-bold first-letter:text-accent first-letter:mr-3 first-letter:float-left first-letter:leading-[0.85]">
                  Trong làn sóng chuyển đổi số và trí tuệ nhân tạo (AI) bùng nổ, giáo viên Việt Nam đang đứng trước một nghịch lý lớn: bơi giữa hàng nghìn công cụ AI và khóa học viết prompt chung chung, nhưng khi áp dụng vào lớp học thực tế thì slide một đường, phiếu học tập một nẻo, kiến thức rời rạc và ảo giác thông tin của AI gây lệch chuẩn kiến thức.
                </p>
              </Reveal>

              {/* Featured image */}
              <Reveal delay={100}>
                <figure className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-accent/10 to-primary/5 rounded-3xl blur-2xl" />
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src="https://sfile.chatglm.cn/images-ppt/c93745097fd2.jpg"
                      alt="Lớp học Vật lý hiện đại với giáo viên sử dụng công nghệ"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-foreground/5 to-transparent" />
                    <figcaption className="absolute bottom-0 left-0 right-0 p-6 text-background">
                      <p className="text-[10px] tracking-[0.25em] uppercase text-background/70 mb-1">
                        Hiện trạng
                      </p>
                      <p className="font-serif text-lg italic">
                        "Slide một đường, phiếu học tập một nẻo, kiến thức rời rạc."
                      </p>
                    </figcaption>
                  </div>
                </figure>
              </Reveal>

              <Reveal delay={150}>
                <p className="text-base sm:text-lg text-foreground/85 leading-relaxed">
                  Dự án <span className="font-serif italic text-accent">Đòn Bẩy AI</span> được
                  sáng lập bởi thầy <strong className="text-foreground">Kha Khung Hiệp</strong> với
                  khát vọng chấm dứt tình trạng ứng dụng AI hời hợt. Chúng tôi không dạy giáo viên
                  cách dùng AI như một công cụ tạo chữ tự động thông thường.
                </p>
              </Reveal>

              <Reveal delay={200}>
                <p className="text-base sm:text-lg text-foreground/85 leading-relaxed">
                  Chúng tôi trao cho giáo viên một <strong className="text-foreground">triết lý sư phạm kiểm soát</strong> kết
                  hợp với <strong className="text-foreground">hệ sinh thái công nghệ Edu-Graphic đồng bộ</strong> —
                  biến AI thành chiếc đòn bẩy thực thụ giúp giải phóng sức lao động và nâng tầm
                  chất lượng dạy học Vật lý/Khoa học Tự nhiên.
                </p>
              </Reveal>

              {/* Pull quote */}
              <Reveal delay={250}>
                <blockquote className="relative my-12 pl-8 sm:pl-12 border-l-4 border-accent">
                  <Quote className="absolute -left-3 -top-3 w-8 h-8 text-accent bg-background p-1 rounded-full" />
                  <p className="font-display text-2xl sm:text-3xl italic text-foreground/90 leading-snug">
                    Ảo giác thông tin của AI — không phải bug, mà là feature nguy hiểm nếu
                    giáo viên quên mình là <span className="text-accent not-italic font-medium">điểm tựa</span>.
                  </p>
                  <footer className="mt-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                    — Thầy Kha Khung Hiệp
                  </footer>
                </blockquote>
              </Reveal>

              {/* Tags */}
              <Reveal delay={300}>
                <div className="flex flex-wrap gap-3 pt-4">
                  {["Vật lý THPT", "Khoa học Tự nhiên", "GDPT 2018", "Edu-Graphic"].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 rounded-full bg-secondary/60 text-secondary-foreground text-xs font-medium border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Reveal>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-8">
              <Reveal delay={200}>
                {/* Author card */}
                <div className="p-6 rounded-2xl bg-foreground text-background">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center font-serif italic text-2xl text-accent-foreground">
                      K
                    </div>
                    <div>
                      <p className="font-serif italic text-lg">Thầy Kha Khung Hiệp</p>
                      <p className="text-[10px] uppercase tracking-[0.25em] text-background/50 mt-0.5">
                        GEMS Physics Leader
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-background/70 leading-relaxed">
                    Sáng lập Đòn Bẩy AI. Tiên phong kết hợp triết lý sư phạm kiểm soát
                    với hệ sinh thái Edu-Graphic đồng bộ cho giáo viên Vật lý THPT.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={300}>
                {/* Key facts */}
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-accent mb-4">
                    Số liệu cốt lõi
                  </p>
                  <ul className="space-y-3">
                    {[
                      { label: "Hệ sinh thái AI", value: "4 công cụ" },
                      { label: "Bài học thực chiến", value: "15 bài" },
                      { label: "Module đào tạo", value: "3 module" },
                      { label: "Trụ cột GEMS V6", value: "G · E · M · S" },
                    ].map((item) => (
                      <li key={item.label} className="flex items-center justify-between pb-3 border-b border-border last:border-0 last:pb-0">
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                        <span className="font-serif italic text-foreground">{item.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={400}>
                {/* Next chapter */}
                <Link
                  href="/triet-ly"
                  className="group block p-6 rounded-2xl bg-accent/10 border border-accent/30 hover:bg-accent/20 transition-colors"
                >
                  <p className="text-[10px] uppercase tracking-[0.25em] font-semibold text-accent mb-2">
                    Chương tiếp theo →
                  </p>
                  <p className="font-serif text-xl text-foreground mb-2">
                    Triết lý vận hành
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">
                    Chuyên môn giáo viên làm điểm tựa — Công nghệ AI làm đòn bẩy.
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
                    Đọc chương 02
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
