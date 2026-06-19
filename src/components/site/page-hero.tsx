"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight } from "lucide-react";

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
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
    <section className="relative pt-32 pb-12 sm:pt-36 sm:pb-16 px-5 sm:px-8 bg-mist">
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
            className="inline-flex items-center gap-1.5 text-steel hover:text-obsidian transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            {prevLabel}
          </Link>
          <ChevronRight className="w-3 h-3 text-pebble" />
          <span className="text-obsidian font-medium">{eyebrow}</span>
        </motion.div>

        {/* eyebrow — caption sized */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-4"
        >
          <span className="inline-flex items-center text-[12px] font-medium text-snow bg-obsidian"
            style={{ borderRadius: "12px", padding: "4px 10px" }}
          >
            {eyebrow}
          </span>
        </motion.div>

        {/* display heading — 56-64px, weight 700, with ash accent word */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-bold text-obsidian tracking-tight max-w-3xl"
          style={{ fontSize: "clamp(36px, 6vw, 56px)", lineHeight: 1.12 }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 text-ink max-w-2xl"
            style={{ fontSize: "18px", lineHeight: 1.45, fontWeight: 400 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
