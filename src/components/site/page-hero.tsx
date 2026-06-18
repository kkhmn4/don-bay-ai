"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  prevLabel?: string;
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  prevLabel = "Trang chủ",
}: PageHeroProps) {
  return (
    <section className="relative pt-32 pb-12 sm:pt-36 sm:pb-16 px-5 sm:px-8 bg-pure-black">
      <div className="max-w-[1200px] mx-auto">
        {/* breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-2 text-[13px] mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-muted-text hover:text-pure-white transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            {prevLabel}
          </Link>
          <ChevronRight className="w-3 h-3 text-border-gray" />
          <span className="text-pure-white font-semibold">{eyebrow}</span>
        </motion.div>

        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-4"
        >
          <span className="text-[11px] tracking-[0.3em] uppercase font-bold text-amber-glow">
            {eyebrow}
          </span>
        </motion.div>

        {/* title — capped at 24px per design spec */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-extrabold text-pure-white tracking-tight"
          style={{ fontSize: "24px", lineHeight: 1.33 }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 text-body-lg text-helper-gray max-w-2xl leading-relaxed"
            style={{ fontSize: "18px", lineHeight: 1.56, fontWeight: 400 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
