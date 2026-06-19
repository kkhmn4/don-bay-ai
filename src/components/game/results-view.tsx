'use client'

import { useEffect, useRef, useState } from 'react'
import { useGame } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trophy, RotateCcw, Home, History, Share2, Download } from 'lucide-react'
import { motion } from 'framer-motion'
import { sounds } from '@/lib/sounds'
import Confetti from '@/components/game/confetti'
import CountUp from '@/components/game/count-up'
import AchievementsDisplay from '@/components/game/achievements-display'
import { toast } from 'sonner'

export default function ResultsView() {
  const players = useGame((s) => s.players)
  const setView = useGame((s) => s.setView)
  const resetGame = useGame((s) => s.resetGame)
  const questions = useGame((s) => s.questions)
  const categoryId = useGame((s) => s.categoryId)
  const difficulty = useGame((s) => s.difficulty)
  const gameStartTime = useGame((s) => s.gameStartTime)
  const setLastSessionId = useGame((s) => s.setLastSessionId)
  const playerStats = useGame((s) => s.playerStats)

  const [confettiFire, setConfettiFire] = useState(0)
  const savedRef = useRef(false)

  const ranked = [...players].sort((a, b) => b.score - a.score)
  const winner = ranked[0]

  // On mount: play victory sound, fire confetti, save match to history
  useEffect(() => {
    sounds.victory()
    const t1 = setTimeout(() => setConfettiFire((f) => f + 1), 200)
    const t2 = setTimeout(() => setConfettiFire((f) => f + 1), 900)
    const t3 = setTimeout(() => setConfettiFire((f) => f + 1), 1600)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  // Save session to match history (once)
  useEffect(() => {
    if (savedRef.current) return
    if (players.length === 0) return
    savedRef.current = true
    const duration = gameStartTime ? Math.round((Date.now() - gameStartTime) / 1000) : 0
    fetch('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        playerCount: players.length,
        results: players.map((p) => ({ name: p.name, color: p.color, avatar: p.avatar, score: p.score })),
        questionCount: questions.length,
        category: categoryId,
        difficulty,
        duration,
      }),
    })
      .then((r) => r.json())
      .then((d) => { if (d?.session?.id) setLastSessionId(d.session.id) })
      .catch(() => { /* non-critical */ })
  }, [players, questions.length, categoryId, difficulty, gameStartTime, setLastSessionId])

  const shareResult = async () => {
    sounds.click()
    const lines: string[] = []
    lines.push('🏆 HandQuiz AR — Kết quả trận đấu')
    lines.push(`📅 ${new Date().toLocaleString('vi-VN')}`)
    lines.push(`🎮 ${players.length} người chơi · ${questions.length} câu hỏi`)
    lines.push('')
    ranked.forEach((p, i) => {
      const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`
      lines.push(`${medal} ${p.avatar} ${p.name} — ${p.score} điểm`)
    })
    lines.push('')
    lines.push('🖐️ Chơi thử tại HandQuiz AR!')
    const text = lines.join('\n')

    try {
      if (navigator.share) {
        await navigator.share({ title: 'HandQuiz AR — Kết quả', text })
        toast.success('Đã chia sẻ kết quả!')
      } else {
        await navigator.clipboard.writeText(text)
        toast.success('Đã sao chép kết quả vào clipboard!')
      }
    } catch {
      // Fallback: download as txt
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `handquiz-result-${new Date().toISOString().slice(0, 10)}.txt`
      a.click()
      URL.revokeObjectURL(url)
      toast.success('Đã tải kết quả ra file!')
    }
  }

  const exportAchievementsCSV = () => {
    sounds.click()
    const escape = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`
    const rows: string[] = []
    rows.push(['Người chơi', 'Avatar', 'Điểm', 'Số câu đúng', 'Tổng câu', 'Chuỗi đúng max', 'Thắng', 'Huy hiệu'].map(escape).join(','))
    for (const p of ranked) {
      const stats = playerStats[p.id] || { correctCount: 0, fastestCorrectMs: null, questionStartTime: null, currentStreak: 0, maxStreak: 0 }
      // Compute achievements inline (same logic as achievements-display)
      const isWinner = p.id === ranked[0]?.id && p.score > 0
      const earned: string[] = []
      if (stats.correctCount === questions.length && questions.length > 0) earned.push('💯 Hoàn hảo')
      if (stats.fastestCorrectMs !== null && stats.fastestCorrectMs < 5000) earned.push('⚡ Tia chớp')
      if (stats.fastestCorrectMs !== null && stats.fastestCorrectMs < 3000) earned.push('⚡ Tốc độ ánh sáng')
      if (isWinner) earned.push('👑 Nhà vô địch')
      if (isWinner && players.length >= 3) earned.push('🚀 Vươn lên')
      if (stats.correctCount >= 1) earned.push('🎯 Khởi đầu tốt')
      if (stats.correctCount >= 3) earned.push('🎖️ Bắn tỉa')
      if (stats.maxStreak >= 4) earned.push('🔥 Chuỗi đúng')
      if (stats.correctCount === 0 && questions.length > 0) earned.push('🛡️ Kiên cường')
      if (p.score >= 30) earned.push('🏆 Điểm cao')
      if (questions.length >= 8) earned.push('🏃 Người sôi động')
      rows.push([
        p.name, p.avatar, p.score, stats.correctCount, questions.length,
        stats.maxStreak, isWinner ? 'Có' : 'Không', earned.join(' | '),
      ].map(escape).join(','))
    }
    const csv = '\uFEFF' + rows.join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `handquiz-achievements-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Đã xuất huy hiệu + thống kê ra CSV!')
  }

  return (
    <div className="relative flex-1 w-full max-w-2xl mx-auto px-4 py-8 flex flex-col items-center">
      <Confetti fire={confettiFire} count={90} duration={2800} />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center mb-8 relative z-10"
      >
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="text-7xl mb-2"
        >
          🏆
        </motion.div>
        <h1 className="text-4xl font-black mb-1 bg-gradient-to-r from-amber-500 via-emerald-500 to-cyan-500 bg-clip-text text-transparent">
          Kết thúc!
        </h1>
        {winner && (
          <p className="text-lg text-muted-foreground">
            Người chiến thắng: <span className="font-bold" style={{ color: winner.color }}>{winner.avatar} {winner.name}</span>
          </p>
        )}
      </motion.div>

      <div className="w-full space-y-3 mb-8 relative z-10">
        {ranked.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className={`flex items-center gap-4 p-4 rounded-2xl border-2 ${
              i === 0 ? 'bg-amber-500/10 border-amber-500/40 shadow-lg shadow-amber-500/10' : 'bg-card border-border'
            }`}
          >
            <div className="text-2xl font-black w-8 text-center">
              {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
            </div>
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
              style={{ backgroundColor: p.color + '33', border: `2px solid ${p.color}` }}
            >
              {p.avatar}
            </div>
            <div className="flex-1">
              <div className="font-bold">{p.name}</div>
              <div className="text-xs text-muted-foreground">Người chơi {p.id}</div>
            </div>
            <Badge className="text-lg px-4 py-1.5" style={{ backgroundColor: p.color, color: 'white' }}>
              <CountUp end={p.score} duration={1200} suffix=" điểm" />
            </Badge>
          </motion.div>
        ))}
      </div>

      <AchievementsDisplay players={players} playerStats={playerStats} totalQuestions={questions.length} />

      <div className="flex flex-wrap gap-3 justify-center relative z-10">
        <Button variant="outline" size="lg" onClick={() => { sounds.click(); setView('MENU') }}>
          <Home className="w-5 h-5 mr-2" /> Về trang chủ
        </Button>
        <Button variant="outline" size="lg" onClick={() => { sounds.click(); setView('TEACHER') }}>
          <History className="w-5 h-5 mr-2" /> Lịch sử
        </Button>
        <Button variant="outline" size="lg" onClick={shareResult}>
          <Share2 className="w-5 h-5 mr-2" /> Chia sẻ
        </Button>
        <Button variant="outline" size="lg" onClick={exportAchievementsCSV}>
          <Download className="w-5 h-5 mr-2" /> Xuất CSV
        </Button>
        <Button size="lg" onClick={() => { sounds.click(); resetGame(); setView('SETUP') }}>
          <RotateCcw className="w-5 h-5 mr-2" /> Chơi lại
        </Button>
      </div>
    </div>
  )
}
