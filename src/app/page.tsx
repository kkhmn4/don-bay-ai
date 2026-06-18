"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Sparkles,
  Target,
  Eye,
  Rocket,
  GraduationCap,
  Users,
  BookOpen,
  Layers,
  PenTool,
  Cpu,
  QrCode,
  Video,
  Globe,
  Bot,
  FileText,
  School,
  ArrowRight,
  ArrowDown,
  Quote,
  CheckCircle2,
  Zap,
  Compass,
  Award,
  Microscope,
  Palette,
  ScanLine,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { LeverDiagram } from "@/components/site/lever-diagram";
import { ImpactFunnel } from "@/components/site/impact-funnel";
import { Navbar } from "@/components/site/navbar";

/* ---------------- Hero ---------------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-foreground text-background"
    >
      {/* layered background */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 z-0"
        aria-hidden
      >
        {/* base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.28 0.04 165) 0%, oklch(0.2 0.025 165) 45%, oklch(0.16 0.02 165) 100%)",
          }}
        />
        {/* gold mist */}
        <div
          className="absolute -top-32 right-0 w-[60vw] h-[60vw] rounded-full opacity-25 blur-3xl animate-pulse-glow"
          style={{ background: "oklch(0.74 0.13 85 / 0.5)" }}
        />
        {/* sage mist */}
        <div
          className="absolute bottom-0 -left-20 w-[40vw] h-[40vw] rounded-full opacity-20 blur-3xl"
          style={{ background: "oklch(0.62 0.08 145 / 0.4)" }}
        />
        {/* grain */}
        <div className="absolute inset-0 bg-grain-dark opacity-60" />
        {/* gold radial lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.08]" aria-hidden>
          <defs>
            <pattern id="heroGrid" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M 64 0 L 0 0 0 64" fill="none" stroke="oklch(0.82 0.13 85)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGrid)" />
        </svg>
      </motion.div>

      {/* content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 min-h-screen flex flex-col"
      >
        <div className="flex-1 flex flex-col items-center justify-center px-5 sm:px-8 pt-32 pb-20 text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-background/15 bg-background/5 backdrop-blur-sm mb-10"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-medium text-background/80">
              Tuyên Ngôn · Tầm Nhìn · Sứ Mệnh
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.95] tracking-tight"
          >
            <span className="block italic font-light text-background/90">Dự án</span>
            <span className="block text-gold-gradient font-semibold">Đòn Bẩy AI</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-2xl text-base sm:text-lg md:text-xl text-background/70 font-light leading-relaxed"
          >
            Biến AI thành chiếc đòn bẩy thực thụ — giải phóng sức lao động,
            nâng tầm chất lượng dạy học Vật lý & Khoa học Tự nhiên.
          </motion.p>

          {/* signature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45 }}
            className="mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
          >
            <div className="h-px w-12 bg-accent/40 hidden sm:block" />
            <div className="text-center sm:text-left">
              <p className="font-serif italic text-lg text-background/90">Thầy Kha Khung Hiệp</p>
              <p className="text-[11px] tracking-[0.3em] uppercase text-background/50 mt-1">
                GEMS Physics Leader
              </p>
            </div>
            <div className="h-px w-12 bg-accent/40 hidden sm:block" />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-14 flex flex-col sm:flex-row gap-4 items-center"
          >
            <a
              href="#boi-canh"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-accent-foreground font-medium hover:bg-background hover:text-foreground transition-all duration-300 shadow-lg shadow-accent/20"
            >
              Khám phá tuyên ngôn
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>
            <a
              href="#15-bai"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-background/20 text-background/90 hover:border-accent hover:text-accent transition-colors duration-300"
            >
              Lộ trình 15 bài học
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-background/40"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Cuộn xuống</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-accent/60 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------------- Section header ---------------- */
function SectionHeader({
  eyebrow,
  title,
  italic,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-3xl"}>
      <div
        className={`inline-flex items-center gap-2.5 mb-5 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-8 bg-accent/60" />
        <span className="text-[11px] tracking-[0.3em] uppercase font-semibold text-accent">
          {eyebrow}
        </span>
        <span className="h-px w-8 bg-accent/60" />
      </div>
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight text-foreground tracking-tight">
        {title} {italic && <span className="italic font-light text-accent">{italic}</span>}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed ${
            align === "center" ? "max-w-2xl mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ---------------- Section 1: Bối cảnh ---------------- */
function BackgroundSection() {
  return (
    <section id="boi-canh" className="relative py-24 sm:py-32 px-5 sm:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" aria-hidden />
      <div className="max-w-7xl mx-auto relative">
        <Reveal>
          <SectionHeader
            eyebrow="Bối cảnh & Khát vọng"
            title="Nghịch lý của"
            italic="giáo viên Việt Nam"
            subtitle="Trong làn sóng AI bùng nổ, giáo viên đứng trước một thách thức chưa từng có — bơi giữa hàng nghìn công cụ nhưng vẫn lạc lối khi áp dụng vào lớp học thực tế."
          />
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* left: image */}
          <Reveal className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/10 to-primary/5 rounded-3xl blur-2xl" />
              <div className="relative aspect-[4/5] sm:aspect-[5/6] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://sfile.chatglm.cn/images-ppt/c93745097fd2.jpg"
                  alt="Lớp học Vật lý hiện đại với giáo viên sử dụng công nghệ"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
                  <p className="text-[10px] tracking-[0.25em] uppercase text-background/70 mb-1">
                    Hiện trạng
                  </p>
                  <p className="font-serif text-lg italic">
                    "Slide một đường, phiếu học tập một nẻo, kiến thức rời rạc."
                  </p>
                </div>
              </div>
              {/* floating quote card */}
              <div className="absolute -top-6 -right-4 sm:-right-8 max-w-[220px] glass-card rounded-xl p-4 shadow-xl rotate-2 animate-float-slow">
                <Quote className="w-5 h-5 text-accent mb-2" />
                <p className="text-xs text-foreground/80 leading-relaxed italic">
                  Ảo giác thông tin của AI gây lệch chuẩn kiến thức vật lý cốt lõi.
                </p>
              </div>
            </div>
          </Reveal>

          {/* right: content */}
          <div className="order-1 lg:order-2 space-y-6">
            <Reveal delay={100}>
              <p className="text-base sm:text-lg text-foreground/85 leading-relaxed">
                Trong làn sóng chuyển đổi số và trí tuệ nhân tạo (AI) bùng nổ, giáo viên
                Việt Nam đang đứng trước một <strong className="text-foreground">nghịch lý lớn</strong>:
                bơi giữa hàng nghìn công cụ AI và khóa học viết prompt chung chung, nhưng
                khi áp dụng vào lớp học thực tế thì slide một đường, phiếu học tập một nẻo,
                kiến thức rời rạc và ảo giác thông tin của AI gây lệch chuẩn kiến thức.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <p className="text-base sm:text-lg text-foreground/85 leading-relaxed">
                Dự án <span className="font-serif italic text-accent">Đòn Bẩy AI</span> được
                sáng lập bởi thầy <strong className="text-foreground">Kha Khung Hiệp</strong> với
                khát vọng chấm dứt tình trạng ứng dụng AI hời hợt. Chúng tôi không dạy giáo viên
                cách dùng AI như một công cụ tạo chữ tự động thông thường.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-base sm:text-lg text-foreground/85 leading-relaxed">
                Chúng tôi trao cho giáo viên một <strong className="text-foreground">triết lý sư phạm kiểm soát</strong> kết
                hợp với <strong className="text-foreground">hệ sinh thái công nghệ Edu-Graphic đồng bộ</strong> —
                biến AI thành chiếc đòn bẩy thực thụ giúp giải phóng sức lao động và nâng tầm
                chất lượng dạy học Vật lý/Khoa học Tự nhiên.
              </p>
            </Reveal>

            <Reveal delay={400}>
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
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Section 2: Triết lý ---------------- */
function PhilosophySection() {
  return (
    <section
      id="triet-ly"
      className="relative py-24 sm:py-32 px-5 sm:px-8 bg-foreground text-background overflow-hidden"
    >
      <div className="absolute inset-0 bg-grain-dark opacity-40 pointer-events-none" aria-hidden />
      {/* ambient */}
      <div
        className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "oklch(0.74 0.13 85)" }}
      />

      <div className="max-w-7xl mx-auto relative">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2.5 mb-5 justify-center">
              <span className="h-px w-8 bg-accent/60" />
              <span className="text-[11px] tracking-[0.3em] uppercase font-semibold text-accent">
                Triết lý vận hành cốt lõi
              </span>
              <span className="h-px w-8 bg-accent/60" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
              Chuyên môn giáo viên làm <span className="italic text-accent font-light">điểm tựa</span>
              <br />
              Công nghệ AI làm <span className="italic text-accent font-light">đòn bẩy</span>
            </h2>
          </div>
        </Reveal>

        {/* Big quote */}
        <Reveal delay={150}>
          <div className="mt-12 max-w-3xl mx-auto text-center">
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

        {/* Lever diagram */}
        <Reveal delay={300}>
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="rounded-3xl border border-background/10 bg-background/5 backdrop-blur-sm p-6 sm:p-10">
              <LeverDiagram className="w-full h-auto" />
            </div>
          </div>
        </Reveal>

        {/* Three pillars */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Compass,
              label: "Điểm tựa",
              title: "Pivot Point",
              desc: "Chuyên môn, nghiệp vụ sư phạm và trách nhiệm của người giáo viên. Điểm tựa phải vững chắc — giáo viên làm chủ 100% nội dung, kiểm soát mọi thông tin đầu ra của AI.",
              color: "oklch(0.82 0.13 85)",
            },
            {
              icon: Zap,
              label: "Lực tác động",
              title: "Force Input",
              desc: "Sự hỗ trợ tốc độ từ các mô hình AI — Gemini Gems, Google NotebookLM, Marp CLI, HTML-to-Video — biến công việc giờ thành giây.",
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
          <div className="mt-10 max-w-3xl mx-auto p-6 rounded-2xl border border-accent/20 bg-accent/5">
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

/* ---------------- Section 3: Tầm nhìn 2030 ---------------- */
function VisionSection() {
  const pillars = [
    {
      icon: Target,
      tag: "Định vị",
      title: "Cổng học liệu số #1",
      desc: "Trở thành cổng học liệu và trợ lý AI thực chiến số 1 tại Việt Nam dành cho giáo viên Vật lý và Khoa học Tự nhiên THPT bám sát chương trình GDPT 2018.",
    },
    {
      icon: Microscope,
      tag: "Tác động giáo dục",
      title: "Tiên phong GEMS V6",
      desc: "Dẫn dắt phương pháp thiết kế tài liệu chuẩn sư phạm GEMS V6 kết hợp kỹ thuật lập trình đồ họa tương tác (Edu-Graphic) vào lớp học tích cực.",
    },
    {
      icon: Users,
      tag: "Cộng đồng",
      title: "Giáo viên chuyển đổi số",
      desc: "Xây dựng thế hệ giáo viên chuyển đổi số thực chiến — đứng trên vai khổng lồ của công nghệ nhưng luôn nắm giữ quyền kiểm soát sư phạm cao nhất.",
    },
  ];

  return (
    <section id="tam-nhin" className="relative py-24 sm:py-32 px-5 sm:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" aria-hidden />
      <div className="max-w-7xl mx-auto relative">
        <Reveal>
          <SectionHeader
            eyebrow="Tầm nhìn 2030"
            title="Mười năm tới —"
            italic="một tầm nhìn dài hạn"
            subtitle="Định vị rõ ràng, tác động giáo dục sâu rộng, và một cộng đồng giáo viên thực chiến vững mạnh."
          />
        </Reveal>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.title} delay={i * 130}>
                <div className="group relative h-full p-8 rounded-2xl bg-card border border-border hover:border-accent/40 transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                  <div className="absolute top-6 right-6 font-serif italic text-6xl text-accent/10 group-hover:text-accent/20 transition-colors leading-none">
                    0{i + 1}
                  </div>
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-500">
                    <Icon className="w-7 h-7" strokeWidth={1.5} />
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.25em] font-semibold text-accent mb-2">
                    {p.tag}
                  </p>
                  <h3 className="font-serif text-2xl text-foreground mb-4 leading-tight">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Image banner */}
        <Reveal delay={400}>
          <div className="mt-12 relative rounded-3xl overflow-hidden shadow-2xl">
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
                <p className="text-[10px] tracking-[0.3em] uppercase text-accent mb-3">2030</p>
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

/* ---------------- Section 4: Sứ mệnh ---------------- */
function MissionSection() {
  const missions = [
    {
      icon: GraduationCap,
      tag: "4.1",
      audience: "Đối với Giáo viên",
      title: "Giải phóng & Trao quyền",
      points: [
        {
          sub: "Giải phóng thời gian",
          desc: "Giúp giáo viên rút ngắn thời gian chuẩn bị bài từ hàng giờ xuống hàng giây nhờ quy trình tự động hóa E2E — tạo slide từ tài liệu nguồn bằng NotebookLM, xuất PPTX bằng Marp CLI trong 3 giây, tự vẽ sơ đồ vector bằng TikZ Gem.",
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
      points: [
        {
          sub: "Bẻ gãy ngộ nhận (MythBusters)",
          desc: "Giúp học sinh vượt qua các ngộ nhận vật lý kinh điển thông qua bộ đề trắc nghiệm chẩn đoán Đúng/Sai 2025 — phát hiện và sửa chữa sai lầm khái niệm ngay từ gốc.",
        },
        {
          sub: "STEM thực tiễn",
          desc: "Kích thích tư duy khám phá qua mô phỏng tương tác SVG trên di động (dòng nhiệt chuyển động, nhiệt kế nảy lò xo Spring Bounce) và hoạt động học tập luân chuyển trạm tích hợp QR Code.",
        },
      ],
    },
    {
      icon: BookOpen,
      tag: "4.3",
      audience: "Đối với Học liệu",
      title: "Chuẩn hóa GEMS V6",
      points: [
        {
          sub: "Đồng bộ hệ sinh thái",
          desc: "Bốn trụ cột G-E-M-S định nghĩa lại tiêu chuẩn học liệu Vật lý: đồ họa vector sắc nét, trải nghiệm giác quan, bố cục tối giản tinh tế và bản chất khoa học trung thực.",
        },
        {
          sub: "Tối ưu cho lớp học",
          desc: "Phối màu organic dịu mắt, in ấn trắng đen vẫn sắc nét (Grayscale optimize), bố cục 2 cột thoáng đãng — sẵn sàng cho mọi điều kiện基infrastructure của trường học Việt Nam.",
        },
      ],
    },
  ];

  return (
    <section
      id="su-menh"
      className="relative py-24 sm:py-32 px-5 sm:px-8 bg-secondary/40 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none" aria-hidden />
      <div className="max-w-7xl mx-auto relative">
        <Reveal>
          <SectionHeader
            eyebrow="Sứ mệnh của dự án"
            title="Ba đối tượng —"
            italic="một sứ mệnh chung"
            subtitle="Mỗi đối tượng được trao một giá trị cụ thể, cùng hướng tới mục tiêu nâng tầm dạy học Vật lý Việt Nam."
          />
        </Reveal>

        <div className="mt-16 space-y-8">
          {missions.map((m, i) => {
            const Icon = m.icon;
            const isReversed = i % 2 === 1;
            return (
              <Reveal key={m.tag} delay={i * 120}>
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 p-7 sm:p-10 rounded-3xl bg-card border border-border shadow-sm">
                  {/* Left: icon & meta */}
                  <div
                    className={`lg:col-span-4 ${
                      isReversed ? "lg:order-2 lg:border-l lg:border-border lg:pl-12" : "lg:order-1 lg:border-r lg:border-border lg:pr-12"
                    }`}
                  >
                    <div className="flex items-start gap-4 mb-6">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/15 text-accent shrink-0">
                        <Icon className="w-7 h-7" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-[10px] tracking-[0.3em] uppercase text-accent font-semibold mb-1">
                          Sứ mệnh {m.tag}
                        </p>
                        <p className="text-xs text-muted-foreground">{m.audience}</p>
                      </div>
                    </div>
                    <h3 className="font-serif text-3xl sm:text-4xl text-foreground leading-tight mb-4">
                      {m.title}
                    </h3>
                    <div className="h-px w-12 bg-accent/40" />
                  </div>

                  {/* Right: points */}
                  <div className={`lg:col-span-8 ${isReversed ? "lg:order-1" : "lg:order-2"} space-y-6`}>
                    {m.points.map((p, idx) => (
                      <div key={p.sub} className="flex gap-4">
                        <div className="shrink-0 mt-1">
                          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-semibold font-serif italic">
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
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Section 5: Impact Funnel ---------------- */
function FunnelSection() {
  return (
    <section
      id="phieu"
      className="relative py-24 sm:py-32 px-5 sm:px-8 bg-foreground text-background overflow-hidden"
    >
      <div className="absolute inset-0 bg-grain-dark opacity-40 pointer-events-none" aria-hidden />
      <div
        className="absolute bottom-0 right-0 w-[40vw] h-[40vw] rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "oklch(0.74 0.13 85)" }}
      />

      <div className="max-w-7xl mx-auto relative">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2.5 mb-5 justify-center">
              <span className="h-px w-8 bg-accent/60" />
              <span className="text-[11px] tracking-[0.3em] uppercase font-semibold text-accent">
                Mô hình phễu tác động
              </span>
              <span className="h-px w-8 bg-accent/60" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight tracking-tight">
              Phễu khép kín —
              <span className="italic text-accent font-light"> tối đa giá trị chia sẻ</span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-background/70 leading-relaxed max-w-2xl mx-auto">
              Dự án Đòn Bẩy AI vận hành theo mô hình phễu khép kín — từ tiếp cận cộng đồng đến
              ứng dụng thực tế tại lớp học.
            </p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-20">
            <ImpactFunnel />
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-20 grid sm:grid-cols-3 gap-4">
            {[
              { icon: Video, label: "Video ngắn", value: "TikTok · Shorts · Reels" },
              { icon: Globe, label: "Web portal", value: "Bài giảng chi tiết" },
              { icon: School, label: "Lớp thực chiến", value: "QR Code · Trạm xoay" },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="flex items-center gap-4 p-5 rounded-2xl border border-background/10 bg-background/[0.04] backdrop-blur-sm"
                >
                  <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-accent/15 text-accent shrink-0">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-background/50 mb-0.5">
                      {s.label}
                    </p>
                    <p className="text-sm font-medium text-background/90">{s.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Section 6: 15 Bài học ---------------- */
function ModulesSection() {
  const modules = [
    {
      no: "Module 01",
      range: "Bài 1 — 5",
      title: "Hệ sinh thái AI Soạn Giảng",
      icon: Cpu,
      desc: "Thiết lập Gemini Gems, NotebookLM, Marp CLI để sinh slide PowerPoint màu giấy kem organic và phiếu học tập từ tài liệu nguồn chỉ với 1 click.",
      lessons: [
        "Thiết lập Gemini Custom Gems",
        "NotebookLM — tổng hợp tài liệu",
        "Marp CLI — xuất PPTX trong 3 giây",
        "Phiếu học tập GEMS tự động",
        "Quy trình E2E hoàn chỉnh",
      ],
      accent: "oklch(0.74 0.13 85)",
    },
    {
      no: "Module 02",
      range: "Bài 6 — 10",
      title: "Đồ họa & Trực quan hóa",
      icon: PenTool,
      desc: "Lập trình Edu-Graphic, tự động xuất video dọc hoạt họa bằng HTML-Video CLI, vẽ hình vector TikZ sắc nét và lập trình mô phỏng tương tác SVG có độ nảy vật lý.",
      lessons: [
        "Edu-Graphic — lập trình đồ họa",
        "HTML-Video CLI — video dọc",
        "TikZ — vector phóng 1000%",
        "SVG tương tác có vật lý",
        "Spring Bounce — mô phỏng nảy",
      ],
      accent: "oklch(0.62 0.08 145)",
    },
    {
      no: "Module 03",
      range: "Bài 11 — 15",
      title: "Đánh giá & Lớp học Số",
      icon: QrCode,
      desc: "Ra đề thi Đúng/Sai chẩn đoán ngộ nhận 2025, cấu hình AI trợ lý chấm bài tự luận viết tay theo barem điểm và thiết kế lớp học xoay trạm số hóa bằng QR Code.",
      lessons: [
        "Đề Đúng/Sai chẩn đoán 2025",
        "AI chấm tự luận theo barem",
        "Lớp học xoay trạm số hóa",
        "Tích hợp QR Code",
        "Đánh giá & phản hồi học sinh",
      ],
      accent: "oklch(0.55 0.06 50)",
    },
  ];

  return (
    <section id="15-bai" className="relative py-24 sm:py-32 px-5 sm:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" aria-hidden />
      <div className="max-w-7xl mx-auto relative">
        <Reveal>
          <SectionHeader
            eyebrow="15 bài học hành động đồng bộ 1-1"
            title="Lộ trình thực chiến —"
            italic="ba Module, mười lăm bài"
            subtitle="Dự án hiện thực hóa tầm nhìn thông qua lộ trình 15 bài giảng thực chiến, chia làm 3 Module chính bám sát tiến trình soạn giảng."
          />
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-3 gap-6">
          {modules.map((m, i) => {
            const Icon = m.icon;
            return (
              <Reveal key={m.no} delay={i * 150}>
                <article className="group relative h-full flex flex-col rounded-3xl bg-card border border-border overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                  {/* top color bar */}
                  <div className="h-1.5 w-full" style={{ background: m.accent }} />

                  <div className="p-7 sm:p-8 flex-1 flex flex-col">
                    {/* number + icon */}
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <p
                          className="text-[10px] uppercase tracking-[0.3em] font-semibold mb-1"
                          style={{ color: m.accent }}
                        >
                          {m.no}
                        </p>
                        <p className="text-xs text-muted-foreground">{m.range}</p>
                      </div>
                      <div
                        className="inline-flex items-center justify-center w-12 h-12 rounded-2xl"
                        style={{ background: `${m.accent}20`, color: m.accent }}
                      >
                        <Icon className="w-6 h-6" strokeWidth={1.5} />
                      </div>
                    </div>

                    <h3 className="font-serif text-2xl text-foreground mb-3 leading-tight">
                      {m.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{m.desc}</p>

                    {/* lessons list */}
                    <ul className="space-y-2.5 mt-auto pt-6 border-t border-border">
                      {m.lessons.map((l, idx) => (
                        <li key={l} className="flex items-center gap-3 text-sm">
                          <span
                            className="flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-semibold font-serif italic shrink-0"
                            style={{ background: `${m.accent}25`, color: m.accent }}
                          >
                            {idx + 1}
                          </span>
                          <span className="text-foreground/80">{l}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* CTA */}
        <Reveal delay={400}>
          <div className="mt-14 text-center">
            <a
              href="#gems"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-foreground text-background font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-lg"
            >
              Tiếp tục khám phá GEMS V6
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Section 7: GEMS V6 ---------------- */
function GemsSection() {
  const gems = [
    {
      letter: "G",
      name: "Graphic",
      vi: "Đồ họa cao cấp",
      icon: Palette,
      desc: "Sơ đồ vector TikZ sắc nét phóng to 1000% không vỡ hạt, thay thế hoàn toàn hình ảnh nhòe đen tải từ Internet.",
      points: ["Vector TikZ", "Phóng 1000%", "Không vỡ hạt", "In ấn sắc nét"],
      accent: "oklch(0.74 0.13 85)",
    },
    {
      letter: "E",
      name: "Experiential",
      vi: "Trải nghiệm giác quan",
      icon: Sparkles,
      desc: "Tiến trình bài học dẫn dắt học sinh đi từ trải nghiệm thực tế đến lý thuyết cốt lõi — học qua làm, hiểu qua cảm nhận.",
      points: ["Học qua làm", "Trải nghiệm thực", "Lý thuyết cốt lõi", "Cảm nhận giác quan"],
      accent: "oklch(0.62 0.08 145)",
    },
    {
      letter: "M",
      name: "Minimalist",
      vi: "Tối giản tinh tế",
      icon: Layers,
      desc: "Phối màu organic (xanh sage, đồng cỏ, kem) dịu mắt, in ấn trắng đen vẫn sắc nét, bố cục 2 cột thoáng đãng.",
      points: ["Phối màu organic", "Grayscale optimize", "Bố cục 2 cột", "Dịu mắt"],
      accent: "oklch(0.55 0.06 50)",
    },
    {
      letter: "S",
      name: "Scientific Realism",
      vi: "Bản chất khoa học",
      icon: Microscope,
      desc: "Tuyệt đối trung thành với hiện tượng vật lý đời thực, loại bỏ các hình hoạt họa bong bóng phi thực tế.",
      points: ["Trung thực vật lý", "Loại bỏ bong bóng", "Hiện tượng đời thực", "Bản chất khoa học"],
      accent: "oklch(0.45 0.045 165)",
    },
  ];

  return (
    <section
      id="gems"
      className="relative py-24 sm:py-32 px-5 sm:px-8 bg-secondary/40 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none" aria-hidden />
      <div className="max-w-7xl mx-auto relative">
        <Reveal>
          <SectionHeader
            eyebrow="GEMS V6 — Bốn trụ cột học liệu"
            title="Chuẩn sư phạm —"
            italic="G · E · M · S"
            subtitle="Bốn chữ cái định nghĩa lại tiêu chuẩn học liệu Vật lý: đồ họa, trải nghiệm, tối giản, và bản chất khoa học."
          />
        </Reveal>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {gems.map((g, i) => {
            const Icon = g.icon;
            return (
              <Reveal key={g.letter} delay={i * 120}>
                <article className="group relative h-full p-8 sm:p-10 rounded-3xl bg-card border border-border hover:border-foreground/20 transition-all duration-500 overflow-hidden">
                  {/* giant letter */}
                  <span
                    className="absolute top-4 right-6 font-serif italic font-bold text-[180px] leading-none select-none pointer-events-none opacity-[0.06] group-hover:opacity-[0.12] transition-opacity"
                    style={{ color: g.accent }}
                  >
                    {g.letter}
                  </span>

                  <div className="relative">
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className="flex items-center justify-center w-16 h-16 rounded-2xl font-serif italic text-3xl font-bold"
                        style={{ background: `${g.accent}18`, color: g.accent }}
                      >
                        {g.letter}
                      </div>
                      <div>
                        <h3 className="font-serif text-2xl text-foreground leading-tight">
                          {g.name}
                        </h3>
                        <p className="text-sm" style={{ color: g.accent }}>
                          {g.vi}
                        </p>
                      </div>
                      <div className="ml-auto">
                        <Icon className="w-6 h-6 text-muted-foreground" strokeWidth={1.5} />
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{g.desc}</p>

                    <div className="flex flex-wrap gap-2">
                      {g.points.map((p) => (
                        <span
                          key={p}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium border"
                          style={{
                            background: `${g.accent}10`,
                            color: g.accent,
                            borderColor: `${g.accent}30`,
                          }}
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Quote */}
        <Reveal delay={300}>
          <div className="mt-16 max-w-3xl mx-auto text-center p-8 sm:p-10 rounded-3xl bg-foreground text-background">
            <Quote className="w-10 h-10 text-accent mx-auto mb-5" />
            <p className="font-display text-2xl sm:text-3xl italic leading-snug text-background/90">
              GEMS V6 — không chỉ là bộ tiêu chuẩn học liệu,
              <br className="hidden sm:block" />
              <span className="text-accent not-italic font-medium">
                {" "}là triết lý sư phạm hiện đại.
              </span>
            </p>
            <p className="mt-6 text-[11px] tracking-[0.3em] uppercase text-background/50">
              Đòn Bẩy AI · GEMS Physics Leader
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Section 8: Final CTA ---------------- */
function FinalCTA() {
  return (
    <section className="relative py-24 sm:py-32 px-5 sm:px-8 overflow-hidden bg-foreground text-background">
      <div className="absolute inset-0 bg-grain-dark opacity-40 pointer-events-none" aria-hidden />
      {/* ambient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vw] rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{ background: "oklch(0.74 0.13 85 / 0.5)" }}
      />

      <div className="max-w-5xl mx-auto relative text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-background/15 bg-background/5 backdrop-blur-sm mb-8">
            <Award className="w-3.5 h-3.5 text-accent" />
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

        <Reveal delay={300}>
          <p className="mt-10 max-w-2xl mx-auto text-base sm:text-lg text-background/65 leading-relaxed">
            Không phải AI thay giáo viên. Chính giáo viên — với chuyên môn vững vàng —
            dùng AI như chiếc đòn bẩy để nâng tầm lớp học Vật lý Việt Nam.
          </p>
        </Reveal>

        <Reveal delay={450}>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="#top"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-accent-foreground font-medium hover:bg-background hover:text-foreground transition-all duration-300 shadow-lg shadow-accent/20"
            >
              Về đầu trang
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#15-bai"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-background/20 text-background/90 hover:border-accent hover:text-accent transition-colors duration-300"
            >
              Xem lại lộ trình 15 bài
            </a>
          </div>
        </Reveal>

        {/* signature */}
        <Reveal delay={600}>
          <div className="mt-20 pt-10 border-t border-background/10">
            <p className="font-serif italic text-xl text-background/90">Thầy Kha Khung Hiệp</p>
            <p className="text-[11px] tracking-[0.3em] uppercase text-background/40 mt-2">
              GEMS Physics Leader · Sáng lập Đòn Bẩy AI
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="bg-foreground text-background/60 border-t border-background/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* brand */}
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 40 40" className="w-8 h-8">
              <polygon points="20,4 36,32 4,32" fill="oklch(0.74 0.13 85)" />
              <rect x="6" y="22" width="28" height="2.5" rx="1" fill="oklch(0.18 0.025 165)" />
              <circle cx="20" cy="32" r="3" fill="oklch(0.18 0.025 165)" />
            </svg>
            <div>
              <p className="font-serif text-sm text-background/90">Đòn Bẩy AI</p>
              <p className="text-[10px] tracking-[0.25em] uppercase text-background/40">
                GEMS Physics Leader
              </p>
            </div>
          </div>

          {/* nav */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs">
            <a href="#boi-canh" className="hover:text-accent transition-colors">Bối cảnh</a>
            <a href="#triet-ly" className="hover:text-accent transition-colors">Triết lý</a>
            <a href="#tam-nhin" className="hover:text-accent transition-colors">Tầm nhìn</a>
            <a href="#su-menh" className="hover:text-accent transition-colors">Sứ mệnh</a>
            <a href="#phieu" className="hover:text-accent transition-colors">Phễu tác động</a>
            <a href="#15-bai" className="hover:text-accent transition-colors">15 Bài học</a>
            <a href="#gems" className="hover:text-accent transition-colors">GEMS V6</a>
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-background/40">
          <p>© {new Date().getFullYear()} Đòn Bẩy AI · Thầy Kha Khung Hiệp</p>
          <p className="italic font-serif">Giáo viên kiểm soát, AI tối ưu hiệu suất.</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Page ---------------- */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <BackgroundSection />
        <PhilosophySection />
        <VisionSection />
        <MissionSection />
        <FunnelSection />
        <ModulesSection />
        <GemsSection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
