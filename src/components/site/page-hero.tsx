"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  italic?: string;
  subtitle?: string;
  variant?: "light" | "dark";
  prevLabel?: string;
}

export function PageHero({
  eyebrow,
  title,
  italic,
  subtitle,
  variant = "light",
  prevLabel = "Trang chủ",
}: PageHeroProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={`relative pt-32 pb-16 sm:pt-40 sm:pb-20 px-5 sm:px-8 overflow-hidden ${
        isDark ? "bg-foreground text-background" : "bg-background text-foreground"
      }`}
    >
      {/* ambient */}
      <div
        className={`absolute -top-20 right-0 w-[40vw] h-[40vw] rounded-full opacity-15 blur-3xl pointer-events-none`}
        style={{ background: "oklch(0.74 0.13 85)" }}
      />
      {isDark && <div className="absolute inset-0 bg-grain-dark opacity-40 pointer-events-none" aria-hidden />}

      <div className="max-w-5xl mx-auto relative">
        {/* breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 text-xs mb-8"
        >
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 transition-colors ${
              isDark ? "text-background/60 hover:text-accent" : "text-foreground/60 hover:text-accent"
            }`}
          >
            <ArrowLeft className="w-3 h-3" />
            {prevLabel}
          </Link>
          <ChevronRight className={`w-3 h-3 ${isDark ? "text-background/30" : "text-foreground/30"}`} />
          <span className="text-accent font-medium">{eyebrow}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 mb-5"
        >
          <span className="h-px w-8 bg-accent/60" />
          <span className="text-[11px] tracking-[0.3em] uppercase font-semibold text-accent">
            {eyebrow}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight"
        >
          {title} {italic && <span className="italic font-light text-accent">{italic}</span>}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className={`mt-6 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl ${
              isDark ? "text-background/70" : "text-muted-foreground"
            }`}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
