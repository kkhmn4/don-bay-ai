"use client";

import { motion } from "framer-motion";
import { Video, Globe, FileText, Bot, School, QrCode } from "lucide-react";

const stages = [
  {
    id: "A",
    icon: Video,
    title: "Kênh Video Ngắn",
    subtitle: "TikTok · Shorts · Reels",
    desc: "Chia sẻ mẹo thực chiến & WOW hiệu ứng",
    accent: "oklch(0.74 0.13 85)",
  },
  {
    id: "B",
    icon: Globe,
    title: "Website EdTech Portal",
    subtitle: "Bài giảng chi tiết",
    desc: "Cổng học liệu trung tâm, nơi mọi tài nguyên hội tụ",
    accent: "oklch(0.62 0.08 145)",
  },
  {
    id: "C",
    icon: FileText,
    title: "Phiếu học tập GEMS",
    subtitle: "& Code TikZ Vector",
    desc: "Tải miễn phí — sẵn sàng mang vào lớp",
    accent: "oklch(0.55 0.06 50)",
  },
  {
    id: "D",
    icon: Bot,
    title: "9 Prompt Gemini Gems",
    subtitle: "& NotebookLM",
    desc: "Bộ prompts đã chuẩn hoá — sao chép & dùng ngay",
    accent: "oklch(0.45 0.045 165)",
  },
  {
    id: "E",
    icon: QrCode,
    title: "Lớp học tích cực",
    subtitle: "Luân chuyển trạm · QR Code",
    desc: "Ứng dụng thực tế — học sinh tương tác chủ động",
    accent: "oklch(0.74 0.13 85)",
  },
];

export function ImpactFunnel({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="grid gap-4 md:grid-cols-5 relative">
        {/* connecting line */}
        <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

        {stages.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center text-center"
            >
              {/* node */}
              <div className="relative mb-4">
                <div
                  className="absolute inset-0 rounded-full blur-xl opacity-30"
                  style={{ background: s.accent }}
                />
                <div
                  className="relative w-24 h-24 rounded-full flex items-center justify-center border-2 bg-card shadow-lg"
                  style={{ borderColor: s.accent }}
                >
                  <Icon className="w-9 h-9" style={{ color: s.accent }} strokeWidth={1.5} />
                  <span
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center text-white font-serif italic"
                    style={{ background: s.accent }}
                  >
                    {i + 1}
                  </span>
                </div>
              </div>
              <h4 className="font-serif text-lg text-foreground mb-1 leading-tight">
                {s.title}
              </h4>
              <p className="text-[11px] uppercase tracking-widest text-foreground/50 mb-2 font-medium">
                {s.subtitle}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-[180px]">
                {s.desc}
              </p>

              {/* arrow between nodes (desktop) */}
              {i < stages.length - 1 && (
                <div className="hidden md:block absolute top-11 -right-2 w-4 h-4">
                  <svg viewBox="0 0 16 16" fill="none" className="w-full h-full">
                    <path d="M2 8 L14 8 M10 4 L14 8 L10 12" stroke="oklch(0.74 0.13 85)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* convergence note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-10 text-center"
      >
        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-foreground/5 border border-foreground/10">
          <School className="w-4 h-4 text-accent" />
          <span className="text-sm text-foreground/70 font-medium">
            C & D hội tụ → Ứng dụng thực tế tại <span className="text-accent font-semibold">Lớp học tích cực</span>
          </span>
        </div>
      </motion.div>
    </div>
  );
}
