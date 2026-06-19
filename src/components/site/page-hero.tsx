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
    <section className="relative pt-32 pb-12 sm:pt-36 sm:pb-16 px-5 sm:px-8 bg-paper">
      <div className="max-w-[720px] mx-auto text-center">
        {/* breadcrumb — centered */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center gap-2 text-[13px] mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-mist hover:text-deep-teal transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            {prevLabel}
          </Link>
          <ChevronRight className="w-3 h-3 text-hairline" />
          <span className="text-ink font-medium">{eyebrow}</span>
        </motion.div>

        {/* mint pill eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-6 flex justify-center"
        >
          <span className="badge-mint">
            {eyebrow}
          </span>
        </motion.div>

        {/* serif headline — 46-60px, weight 400 */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="headline-serif text-ink"
          style={{ fontSize: "clamp(34px, 5.5vw, 46px)", lineHeight: 1.15 }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 font-sans text-ink max-w-[560px] mx-auto"
            style={{ fontSize: "18px", lineHeight: 1.5, fontWeight: 400 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
