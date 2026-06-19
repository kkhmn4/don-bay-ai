'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { evaluateAchievements, RARITY_LABEL, RARITY_GLOW, type Achievement, type PlayerGameStats } from '@/lib/achievements'
import type { Player } from '@/lib/types'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog'

interface AchievementsDisplayProps {
  players: Player[]
  playerStats: Record<number, { correctCount: number; fastestCorrectMs: number | null; questionStartTime: number | null; currentStreak: number; maxStreak: number }>
  totalQuestions: number
}

export default function AchievementsDisplay({ players, playerStats, totalQuestions }: AchievementsDisplayProps) {
  const ranked = [...players].sort((a, b) => b.score - a.score)
  const winnerId = ranked[0]?.id
  const [selected, setSelected] = useState<Achievement | null>(null)

  // Compute achievements per player
  const playerAchievements = players.map((p) => {
    const stats = playerStats[p.id] || { correctCount: 0, fastestCorrectMs: null, questionStartTime: null, currentStreak: 0, maxStreak: 0 }
    const gameStats: PlayerGameStats = {
      name: p.name,
      score: p.score,
      correctCount: stats.correctCount,
      totalQuestions,
      fastestCorrectMs: stats.fastestCorrectMs,
      isWinner: p.id === winnerId && p.score > 0,
      playerCount: players.length,
      maxStreak: stats.maxStreak,
    }
    return { player: p, achievements: evaluateAchievements(gameStats) }
  }).filter((pa) => pa.achievements.length > 0)

  if (playerAchievements.length === 0) return null

  return (
    <>
      <div className="w-full mb-6 relative z-10">
        <h3 className="text-center text-sm font-bold text-muted-foreground uppercase tracking-wide mb-3">
          🎖️ Huy hiệu đạt được
        </h3>
        <div className="space-y-2">
          {playerAchievements.map(({ player, achievements }) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center gap-2 p-2.5 rounded-xl bg-card/60 border"
            >
              <span className="text-lg mr-1">{player.avatar}</span>
              <span className="text-xs font-semibold" style={{ color: player.color }}>{player.name}</span>
              <div className="flex flex-wrap gap-1.5">
                <AnimatePresence>
                  {achievements.map((a, i) => (
                    <BadgePill key={a.id} achievement={a} delay={0.8 + i * 0.15} onClick={() => setSelected(a)} />
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-[10px] text-muted-foreground/60 mt-2">Chạm vào huy hiệu để xem chi tiết</p>
      </div>

      {/* Achievement details modal */}
      <Dialog open={!!selected} onOpenChange={(o) => { if (!o) setSelected(null) }}>
        <DialogContent className="max-w-sm">
          {selected && <AchievementDetail achievement={selected} />}
        </DialogContent>
      </Dialog>
    </>
  )
}

function BadgePill({ achievement, delay, onClick }: { achievement: Achievement; delay: number; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay, type: 'spring', stiffness: 300, damping: 18 }}
      whileHover={{ scale: 1.1, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border-2 cursor-pointer"
      style={{
        backgroundColor: achievement.color + '22',
        borderColor: achievement.color,
        color: achievement.color,
        boxShadow: RARITY_GLOW[achievement.rarity],
      }}
    >
      <span className="text-base">{achievement.icon}</span>
      <span>{achievement.name}</span>
    </motion.button>
  )
}

function AchievementDetail({ achievement }: { achievement: Achievement }) {
  return (
    <div className="text-center">
      <DialogHeader>
        <DialogTitle className="sr-only">{achievement.name}</DialogTitle>
      </DialogHeader>
      <motion.div
        initial={{ scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center text-4xl mb-3"
        style={{
          backgroundColor: achievement.color + '22',
          border: `3px solid ${achievement.color}`,
          boxShadow: RARITY_GLOW[achievement.rarity],
        }}
      >
        {achievement.icon}
      </motion.div>
      <h3 className="text-xl font-black mb-1" style={{ color: achievement.color }}>{achievement.name}</h3>
      <div
        className="inline-block px-3 py-0.5 rounded-full text-xs font-bold mb-3"
        style={{ backgroundColor: achievement.color + '22', color: achievement.color }}
      >
        {RARITY_LABEL[achievement.rarity]}
      </div>
      <p className="text-sm text-muted-foreground">{achievement.description}</p>
    </div>
  )
}
