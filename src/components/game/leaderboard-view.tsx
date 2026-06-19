'use client'

import { useEffect, useRef, useState } from 'react'
import { useGame } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft, Trophy, Crown, Medal, Award, TrendingUp, Users, Target, Flame } from 'lucide-react'
import { motion } from 'framer-motion'
import { sounds } from '@/lib/sounds'
import CountUp from '@/components/game/count-up'

interface LeaderPlayer {
  name: string
  color: string
  avatar: string
  totalScore: number
  games: number
  wins: number
  avgScore: number
  winRate: number
}

export default function LeaderboardView() {
  const setView = useGame((s) => s.setView)
  const [players, setPlayers] = useState<LeaderPlayer[]>([])
  const [totalSessions, setTotalSessions] = useState(0)
  const [loading, setLoading] = useState(true)
  const reqIdRef = useRef(0)

  useEffect(() => {
    const id = ++reqIdRef.current
    fetch('/api/leaderboard')
      .then((r) => r.json())
      .then((d) => {
        if (id !== reqIdRef.current) return
        setPlayers(d.leaderboard || [])
        setTotalSessions(d.totalSessions || 0)
        setLoading(false)
      })
      .catch(() => {
        if (id !== reqIdRef.current) return
        setLoading(false)
      })
  }, [])

  const top3 = players.slice(0, 3)
  const rest = players.slice(3)
  const podiumOrder = [1, 0, 2] // 2nd, 1st, 3rd for visual layout
  const podiumMeta = [
    { place: 2, icon: <Medal className="w-5 h-5" />, color: '#94a3b8', label: 'Bạc', height: 'h-24' },
    { place: 1, icon: <Crown className="w-6 h-6" />, color: '#fbbf24', label: 'Vàng', height: 'h-32' },
    { place: 3, icon: <Award className="w-5 h-5" />, color: '#f97316', label: 'Đồng', height: 'h-20' },
  ]

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={() => { sounds.click(); setView('MENU') }}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Trophy className="w-7 h-7 text-amber-500" /> Bảng xếp hạng
        </h1>
        {!loading && totalSessions > 0 && (
          <Badge variant="secondary" className="ml-auto">
            <Users className="w-3.5 h-3.5 mr-1" /> {totalSessions} trận
          </Badge>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-2xl" />
          ))}
        </div>
      ) : players.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="p-12 text-center">
            <Trophy className="w-14 h-14 mx-auto mb-3 text-muted-foreground/40" />
            <p className="text-muted-foreground font-medium">Chưa có dữ liệu xếp hạng</p>
            <p className="text-sm text-muted-foreground/70 mt-1">Chơi vài ván để thấy người chơi xuất sắc nhất!</p>
            <Button className="mt-4" onClick={() => { sounds.click(); setView('SETUP') }}>
              <Trophy className="w-4 h-4 mr-2" /> Bắt đầu chơi
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Podium — top 3 */}
          {top3.length > 0 && (
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8 items-end">
              {podiumOrder.map((idx) => {
                const p = top3[idx]
                if (!p) return <div key={idx} />
                const meta = podiumMeta[idx]
                return (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.15, type: 'spring', stiffness: 200 }}
                    className="flex flex-col items-center"
                  >
                    <div
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-2xl sm:text-3xl mb-2 shadow-lg"
                      style={{ backgroundColor: p.color + '33', border: `3px solid ${meta.color}` }}
                    >
                      {p.avatar}
                    </div>
                    <div className="text-center mb-1">
                      <div className="font-bold text-xs sm:text-sm truncate max-w-20 sm:max-w-24" style={{ color: p.color }}>
                        {p.name}
                      </div>
                      <div className="text-lg sm:text-xl font-black" style={{ color: meta.color }}><CountUp end={p.totalScore} duration={1400} suffix="đ" /></div>
                    </div>
                    <div
                      className={`w-full ${meta.height} rounded-t-xl flex flex-col items-center justify-start pt-2 relative overflow-hidden`}
                      style={{ background: `linear-gradient(180deg, ${meta.color}33 0%, ${meta.color}11 100%)`, border: `1px solid ${meta.color}44` }}
                    >
                      <div style={{ color: meta.color }}>{meta.icon}</div>
                      <span className="text-[10px] sm:text-xs font-bold mt-1" style={{ color: meta.color }}>
                        #{meta.place}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}

          {/* Rest of the leaderboard */}
          <ScrollArea className="h-[40vh] pr-4 custom-scroll">
            <div className="space-y-2">
              {rest.length === 0 && top3.length > 0 && (
                <p className="text-center text-sm text-muted-foreground py-4">Chỉ có {top3.length} người chơi — hãy mời thêm bạn!</p>
              )}
              {rest.map((p, i) => {
                const rank = i + 4
                return (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-3 flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold shrink-0">
                          {rank}
                        </div>
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0"
                          style={{ backgroundColor: p.color + '33', border: `2px solid ${p.color}` }}
                        >
                          {p.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold truncate" style={{ color: p.color }}>{p.name}</div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Target className="w-3 h-3" />{p.avgScore}đ/trận</span>
                            <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" />{p.winRate}% thắng</span>
                            <span className="flex items-center gap-1"><Flame className="w-3 h-3" />{p.wins} thắng</span>
                          </div>
                        </div>
                        <Badge style={{ backgroundColor: p.color, color: 'white' }}><CountUp end={p.totalScore} duration={1400} suffix="đ" /></Badge>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </ScrollArea>

          <div className="flex justify-center mt-6">
            <Button variant="outline" onClick={() => { sounds.click(); setView('SETUP') }}>
              <Trophy className="w-4 h-4 mr-2" /> Chơi ván mới
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
