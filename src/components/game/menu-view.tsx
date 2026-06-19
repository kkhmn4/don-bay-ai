'use client'

import { useGame } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Hand, Users, GraduationCap, Sparkles, Trophy, Zap, Brain, ArrowRight, Settings as SettingsIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import SettingsModal from './settings-modal'
import { sounds } from '@/lib/sounds'

export default function MenuView() {
  const setView = useGame((s) => s.setView)
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center px-4 py-10 overflow-hidden">
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-emerald-400/20 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-amber-400/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-20 left-1/4 w-72 h-72 rounded-full bg-cyan-400/20 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        {/* Decorative rotating ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-emerald-500/5 animate-spin-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-amber-500/5 animate-spin-slow" style={{ animationDirection: 'reverse' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center mb-10"
      >
        {/* Floating hand emoji */}
        <div className="text-6xl mb-3 animate-float-hand inline-block">🖐️</div>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-5 border border-emerald-500/20 glass">
          <Sparkles className="w-4 h-4" />
          Thực tế tăng cường · Theo dõi tay · Đa người chơi
        </div>
        <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-4">
          <span className="bg-gradient-to-r from-emerald-500 via-amber-500 to-cyan-500 bg-clip-text text-transparent animate-gradient-shift">
            HandQuiz AR
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Trò chơi đố vui tương tác bằng tay qua webcam. Học sinh dùng ngón tay để
          <span className="text-foreground font-semibold"> kéo-thả </span>
          đáp án. Giáo viên có thể thêm câu hỏi tùy ý.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl mb-8"
      >
        <FeatureCard
          icon={<Hand className="w-6 h-6" />}
          title="Tương tác bằng tay"
          desc="Chập ngón cái và ngón trỏ để kẹp thẻ, kéo thả vào ô đáp án."
          color="emerald"
        />
        <FeatureCard
          icon={<Users className="w-6 h-6" />}
          title="Tối đa 4 người"
          desc="Chơi theo lượt, mỗi người một màu. Bảng điểm realtime."
          color="amber"
        />
        <FeatureCard
          icon={<GraduationCap className="w-6 h-6" />}
          title="Giáo viên thêm câu hỏi"
          desc="Dashboard quản lý câu hỏi theo chủ đề và độ khó."
          color="cyan"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative z-10 flex flex-col sm:flex-row gap-3"
      >
        <Button
          size="lg"
          onClick={() => setView('SETUP')}
          className="text-base px-8 h-14 rounded-xl shadow-lg shadow-emerald-500/20 relative overflow-hidden shimmer-sweep"
        >
          <Zap className="w-5 h-5 mr-2" />
          Bắt đầu chơi
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => setView('TEACHER')}
          className="text-base px-8 h-14 rounded-xl"
        >
          <GraduationCap className="w-5 h-5 mr-2" />
          Khu giáo viên
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => setView('LEADERBOARD')}
          className="text-base px-8 h-14 rounded-xl"
        >
          <Trophy className="w-5 h-5 mr-2 text-amber-500" />
          Xếp hạng
        </Button>
        <Button
          size="lg"
          variant="ghost"
          onClick={() => setView('INSTRUCTIONS')}
          className="text-base px-8 h-14 rounded-xl"
        >
          <Trophy className="w-5 h-5 mr-2" />
          Xem hướng dẫn
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="relative z-10 mt-12 grid grid-cols-3 gap-6 text-center max-w-md"
      >
        <Stat icon={<Brain className="w-5 h-5" />} label="Chủ đề" value="9+" />
        <Stat icon={<Trophy className="w-5 h-5" />} label="Câu hỏi" value="71+" />
        <Stat icon={<Users className="w-5 h-5" />} label="Người chơi" value="1-4" />
      </motion.div>

      {/* Settings floating button */}
      <button
        onClick={() => { sounds.click(); setSettingsOpen(true) }}
        className="fixed bottom-20 right-4 sm:right-6 z-20 w-12 h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all"
        aria-label="Cài đặt"
      >
        <SettingsIcon className="w-5 h-5" />
      </button>

      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  )
}

function FeatureCard({ icon, title, desc, color }: { icon: React.ReactNode; title: string; desc: string; color: string }) {
  const colorMap: Record<string, string> = {
    emerald: 'from-emerald-500/10 to-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
    amber: 'from-amber-500/10 to-amber-500/5 border-amber-500/20 text-amber-600 dark:text-amber-400',
    cyan: 'from-cyan-500/10 to-cyan-500/5 border-cyan-500/20 text-cyan-600 dark:text-cyan-400',
  }
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card className={`bg-gradient-to-br ${colorMap[color]} border glass hover:shadow-xl transition-shadow`}>
        <CardContent className="p-5">
          <div className="w-12 h-12 rounded-xl bg-background/80 flex items-center justify-center mb-3 shadow-sm">
            {icon}
          </div>
          <h3 className="font-bold text-base mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-muted-foreground">{icon}</div>
      <div className="text-2xl font-black bg-gradient-to-br from-emerald-500 to-cyan-500 bg-clip-text text-transparent">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  )
}
