"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LeverProps {
  className?: string;
}

const C = {
  teal: "#006e75", tealLight: "#0b978e", mint: "#b9ffe8",
  blossom: "#ffc3e6", cream: "#fffded", white: "#ffffff", ember: "#ff492c",
  sand: "#d4a574", sandDark: "#b8956a", sky: "#e8f4fd", mist: "#7d8a95",
};

export function LeverInteractive({ className = "" }: LeverProps) {
  const [showTip, setShowTip] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShowTip(true), 2500); return () => clearTimeout(t); }, []);

  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 620 480" className="w-full h-full" fill="none" aria-label="Đòn bẩy AI nâng Trái Đất">
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.sky} />
            <stop offset="100%" stopColor={C.white} />
          </linearGradient>
          <radialGradient id="earthGrad" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#64b5f6" />
            <stop offset="50%" stopColor="#2196f3" />
            <stop offset="100%" stopColor="#0d47a1" />
          </radialGradient>
          <radialGradient id="landGrad" cx="55%" cy="55%" r="50%">
            <stop offset="0%" stopColor="#81c784" />
            <stop offset="100%" stopColor="#2e7d32" />
          </radialGradient>
          <linearGradient id="staffGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={C.sand} />
            <stop offset="50%" stopColor={C.sandDark} />
            <stop offset="100%" stopColor="#8d6e4a" />
          </linearGradient>
          <linearGradient id="beamGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f5e6c8" />
            <stop offset="50%" stopColor="#e8d5b7" />
            <stop offset="100%" stopColor="#d4b896" />
          </linearGradient>
          <radialGradient id="glowEarth" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#64b5f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1565c0" stopOpacity="0" />
          </radialGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <filter id="glowStrong"><feGaussianBlur stdDeviation="10" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>

        {/* Sky background */}
        <rect width="620" height="480" fill="url(#skyGrad)" />

        {/* Ground sand */}
        <ellipse cx="310" cy="460" rx="320" ry="50" fill={C.sand} />
        <ellipse cx="310" cy="470" rx="300" ry="20" fill={C.sandDark} opacity="0.3" />

        {/* Earth glow */}
        <circle cx="470" cy="180" r="80" fill="url(#glowEarth)" />

        {/* ───── EARTH ───── */}
        <motion.g
          animate={{ y: [0, -3, 0], rotate: [-0.5, 0.5, -0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Atmosphere glow */}
          <circle cx="470" cy="180" r="68" fill="url(#glowEarth)" opacity="0.4" />
        
          {/* Ocean */}
          <circle cx="470" cy="180" r="60" fill="url(#earthGrad)" />
        
          {/* Continents */}
          <path d="M430 150 Q445 142 465 140 Q485 138 505 145 Q515 158 508 175 Q498 185 482 182 Q470 180 460 178 Q450 175 442 165 Q435 158 430 150 Z"
            fill="url(#landGrad)" stroke="#1b5e20" strokeWidth="0.5" />
        
          {/* Africa/Europe */}
          <path d="M445 195 Q455 188 470 185 Q482 188 490 198 Q492 210 480 218 Q468 215 455 210 Q448 205 445 195 Z"
            fill="#4caf50" opacity="0.9" />
          <path d="M420 200 Q428 195 440 192 Q448 200 440 208 Q432 212 422 208 Q418 205 420 200 Z"
            fill="#4caf50" opacity="0.7" />
        
          {/* Clouds */}
          <ellipse cx="430" cy="135" rx="25" ry="8" fill={C.white} opacity="0.6" />
          <ellipse cx="505" cy="145" rx="18" ry="6" fill={C.white} opacity="0.5" />
          <ellipse cx="410" cy="210" rx="15" ry="5" fill={C.white} opacity="0.4" />
        </motion.g>

      {/* ───── STAFF / CROOK ───── */}
      <motion.g style={{ originX: 150, originY: 380 }}>
        {/* Staff shadow */}
        <path d="M150 380 Q150 120 160 90"
          stroke={C.teal} strokeWidth="18" strokeLinecap="round" opacity="0.08" />
        
        {/* Staff main - curved shaft */}
        <path d="M150 380 Q150 120 160 90"
          stroke="url(#staffGrad)" strokeWidth="14" strokeLinecap="round" />
        <path d="M150 380 Q150 120 160 90"
          stroke={C.white} strokeWidth="3" strokeLinecap="round" opacity="0.15" />
        
        {/* Crook hook at top */}
        <path d="M160 90 Q190 90 205 105 Q220 120 210 145"
          stroke="url(#staffGrad)" strokeWidth="14" strokeLinecap="round" fill="none" />
        <path d="M160 90 Q190 90 205 105 Q220 120 210 145"
          stroke={C.white} strokeWidth="3" strokeLinecap="round" opacity="0.15" fill="none" />
        
        {/* Grip tape */}
        <rect x="135" y="320" width="30" height="50" rx="4" fill="#8b6d3e" opacity="0.6" />
        <rect x="135" y="335" width="30" height="8" rx="2" fill="#6b4f2e" />

      {/* ───── CHARACTER ───── */}
      <motion.g initial={{ rotate: -5, y: 20 }}
        animate={{ rotate: [0, 3, -2, 0], y: [0, 3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Robe */}
        <path d="M160 380 Q160 320 180 300 Q200 320 200 380 Q180 400 160 400 Z"
          fill={C.white} stroke={C.sand} strokeWidth="1.5" />
        <path d="M165 385 Q175 340 185 320"
          stroke={C.sand} strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* Arms */}
        <path d="M160 310 Q165 270 190 150"
          stroke={C.sand} strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M175 315 Q185 275 215 145"
          stroke={C.sand} strokeWidth="8" strokeLinecap="round" fill="none" />
        {/* Hands on staff */}
        <circle cx="178" cy="152" r="7" fill={C.sandDark} />
        <circle cx="198" cy="148" r="7" fill={C.sandDark} />
        {/* Head */}
        <circle cx="182" cy="288" r="20" fill={C.sandDark} />
        {/* Beard */}
        <path d="M172 295 Q182 325 192 295" fill="#3d2e1e" />
        {/* Face - shouting "YEEESSS" */}
        <ellipse cx="182" cy="285" rx="8" ry="12" fill="#1a1a1a" /> {/* mouth open */}
        <ellipse cx="174" cy="280" rx="3" ry="5" fill="#1a1a1a" /> {/* eye */}
        <ellipse cx="190" cy="280" rx="3" ry="5" fill="#1a1a1a" />
        {/* Head covering */}
        <ellipse cx="182" cy="268" rx="22" ry="18" fill={C.white} opacity="0.95" />
        <ellipse cx="182" cy="270" rx="18" ry="14" fill="#f0f0f0" />
        {/* Headband */}
        <rect x="156" y="255" width="52" height="6" rx="3" fill="#1a1a1a" />
      </motion.g>

      {/* ───── SPEECH BUBBLE "YEEESSS!" ───── */}
      <motion.g initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 10, delay: 1.2 }}>
          <path d="M155 210 Q140 180 160 165 Q175 155 195 155 Q215 155 220 170 Q225 185 210 195 Q195 205 180 200 L165 215 Z"
            fill={C.white} stroke={C.tealLight} strokeWidth="2" opacity="0.95" />
          <text x="190" y="182" textAnchor="middle" fill={C.ember} fontSize="14" fontWeight="900" fontFamily="Inter, sans-serif">
            YEEESSS!
          </text>
        </motion.g>

        {/* ───── CONNECTION TO EARTH ───── */}
        <motion.path d="M210 120 Q250 125 290 140 Q330 155 370 165 Q420 175 450 170"
          stroke={C.tealLight} strokeWidth="3" strokeLinecap="round" fill="none" strokeDasharray="6 4"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.circle cx="210" cy="120" r="5" fill={C.tealLight}
          animate={{ r: [4, 6, 4] }} transition={{ duration: 2, repeat: Infinity }} />
        <motion.circle cx="450" cy="170" r="5" fill={C.tealLight}
          animate={{ r: [4, 6, 4] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />

        {/* ───── LABELS ───── */}
        <motion.text x="130" y="435" textAnchor="middle" fill={C.ember} fontSize="9" fontWeight="700" fontFamily="Inter, sans-serif"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.3 }}>
          🖐️ NỖ LỰC
        </motion.text>
        <motion.text x="130" y="448" textAnchor="middle" fill={C.mist} fontSize="8" fontFamily="Inter, sans-serif"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
          Thời gian & Công sức GV
        </motion.text>

        <motion.text x="300" y="435" textAnchor="middle" fill={C.tealLight} fontSize="10" fontWeight="700" fontFamily="Inter, sans-serif"
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, type: "spring" }}>
          📍 ĐIỂM TỰA KIẾN THỨC
        </motion.text>
        <motion.text x="300" y="448" textAnchor="middle" fill={C.mist} fontSize="7" fontFamily="Inter, sans-serif"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}>
          Chuyên môn · Kinh nghiệm · Sáng tạo
        </motion.text>

        <motion.text x="470" y="435" textAnchor="middle" fill={C.mint} fontSize="9" fontWeight="700" fontFamily="Inter, sans-serif"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }}>
          🌍 KHỐI LƯỢNG CÔNG VIỆC
        </motion.text>
        <motion.text x="470" y="448" textAnchor="middle" fill={C.mist} fontSize="8" fontFamily="Inter, sans-serif"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}>
          Soạn · Chấm · Tạo đề · Phiếu HT
        </motion.text>

        {/* Tooltip */}
        {showTip && (
          <motion.text x="300" y="418" textAnchor="middle" fill={C.mist} fontSize="7" fontFamily="Inter, sans-serif"
            initial={{ opacity: 0 }} animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}>
            GV × AI = Nâng tầm học sinh · YEEESSS!
          </motion.text>
        )}
      </motion.g>
      </svg>
    </div>
  );
}
export default LeverInteractive;