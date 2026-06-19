"use client";

import { motion } from "framer-motion";

/**
 * Custom SVG illustration of a physics lever (đòn bẩy) — the core metaphor
 * of the project. Forest green base, copper-gold fulcrum, animated force arrow.
 */
export function LeverDiagram({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 720 460"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Sơ đồ đòn bẩy vật lý minh hoạ triết lý dự án: Điểm tựa — Lực tác động — Vật nâng"
    >
      <defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="oklch(0.74 0.13 85)" />
          <stop offset="50%" stopColor="oklch(0.82 0.13 85)" />
          <stop offset="100%" stopColor="oklch(0.55 0.1 50)" />
        </linearGradient>
        <linearGradient id="fulcrumGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.82 0.13 85)" />
          <stop offset="100%" stopColor="oklch(0.45 0.08 50)" />
        </linearGradient>
        <linearGradient id="loadGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.62 0.08 145)" />
          <stop offset="100%" stopColor="oklch(0.36 0.045 165)" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.82 0.13 85 / 0.55)" />
          <stop offset="100%" stopColor="oklch(0.82 0.13 85 / 0)" />
        </radialGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* ambient glow under fulcrum */}
      <ellipse cx="360" cy="380" rx="220" ry="32" fill="url(#glow)" filter="url(#soft)" />

      {/* ground line */}
      <line
        x1="40"
        y1="380"
        x2="680"
        y2="380"
        stroke="oklch(0.45 0.035 160 / 0.5)"
        strokeWidth="1.5"
        strokeDasharray="2 6"
      />

      {/* fulcrum triangle (Pivot — Teacher expertise) */}
      <motion.g
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <polygon
          points="360,200 310,380 410,380"
          fill="url(#fulcrumGrad)"
          stroke="oklch(0.45 0.08 50)"
          strokeWidth="1.5"
        />
        <polygon
          points="360,200 310,380 410,380"
          fill="none"
          stroke="oklch(0.985 0.012 95 / 0.4)"
          strokeWidth="1"
          strokeDasharray="2 4"
        />
        <text
          x="360"
          y="430"
          textAnchor="middle"
          fontFamily="var(--font-playfair), Georgia, serif"
          fontStyle="italic"
          fontSize="18"
          fill="oklch(0.985 0.012 95)"
        >
          Điểm tựa
        </text>
        <text
          x="360"
          y="450"
          textAnchor="middle"
          fontFamily="var(--font-inter), sans-serif"
          fontSize="11"
          fill="oklch(0.985 0.012 95 / 0.7)"
          letterSpacing="2"
        >
          CHUYÊN MÔN GIÁO VIÊN
        </text>
      </motion.g>

      {/* lever bar (animated subtle rotation) */}
      <motion.g
        initial={{ rotate: -3, originX: "360px", originY: "200px" }}
        whileInView={{ rotate: 0, originX: "360px", originY: "200px" }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <rect
          x="80"
          y="195"
          width="560"
          height="14"
          rx="7"
          fill="url(#barGrad)"
          stroke="oklch(0.45 0.08 50)"
          strokeWidth="1"
        />
        {/* highlight on bar */}
        <rect x="84" y="197" width="552" height="3" rx="1.5" fill="oklch(0.985 0.012 95 / 0.5)" />

        {/* Load (right side — heavy box) */}
        <motion.g
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <rect
            x="540"
            y="120"
            width="120"
            height="70"
            rx="6"
            fill="url(#loadGrad)"
            stroke="oklch(0.28 0.035 160)"
            strokeWidth="1.5"
          />
          <rect x="546" y="126" width="108" height="58" rx="4" fill="none" stroke="oklch(0.985 0.012 95 / 0.25)" strokeWidth="1" />
          <text x="600" y="150" textAnchor="middle" fontFamily="var(--font-playfair), Georgia, serif" fontStyle="italic" fontSize="15" fill="oklch(0.985 0.012 95)">
            Vật nâng
          </text>
          <text x="600" y="170" textAnchor="middle" fontFamily="var(--font-inter), sans-serif" fontSize="9.5" fill="oklch(0.985 0.012 95 / 0.75)" letterSpacing="1.5">
            SOẠN KẾ HOẠCH BÀI DẠY · TRÌNH CHIẾU · ĐỀ THI
          </text>
        </motion.g>

        {/* Force input (left side — arrow down) */}
        <motion.g
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <motion.path
            d="M 140 100 L 140 195"
            stroke="oklch(0.82 0.13 85)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1.2 }}
          />
          <polygon points="140,200 130,180 150,180" fill="oklch(0.82 0.13 85)" />
          <text x="140" y="80" textAnchor="middle" fontFamily="var(--font-playfair), Georgia, serif" fontStyle="italic" fontSize="15" fill="oklch(0.985 0.012 95)">
            Lực tác động
          </text>
          <text x="140" y="95" textAnchor="middle" fontFamily="var(--font-inter), sans-serif" fontSize="9.5" fill="oklch(0.985 0.012 95 / 0.7)" letterSpacing="1.5">
            GEMINI · NOTEBOOKLM · MARP
          </text>
        </motion.g>
      </motion.g>

      {/* decorative sparkle dots */}
      <g fill="oklch(0.82 0.13 85 / 0.5)">
        <circle cx="60" cy="120" r="2" />
        <circle cx="680" cy="80" r="1.5" />
        <circle cx="200" cy="60" r="1.5" />
        <circle cx="500" cy="40" r="2" />
        <circle cx="640" cy="280" r="1.5" />
      </g>
    </svg>
  );
}
