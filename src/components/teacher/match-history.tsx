'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Trash2, Trophy, Users, Clock, History as HistoryIcon, Calendar, Download } from 'lucide-react'
import { toast } from 'sonner'

interface SessionPlayer {
  name: string
  color: string
  avatar: string
  score: number
}
interface GameSession {
  id: string
  playerCount: number
  results: string
  questionCount: number
  category: string
  difficulty: string
  duration: number
  createdAt: string
}

export default function MatchHistory({ onChanged }: { onChanged?: () => void }) {
  const [sessions, setSessions] = useState<GameSession[]>([])
  const [loading, setLoading] = useState(true)
  const reqIdRef = useRef(0)

  const load = () => {
    const id = ++reqIdRef.current
    setLoading(true)
    fetch('/api/sessions?limit=30')
      .then((r) => r.json())
      .then((d) => {
        if (id !== reqIdRef.current) return
        setSessions(d.sessions || [])
        setLoading(false)
      })
      .catch(() => {
        if (id !== reqIdRef.current) return
        toast.error('Không tải được lịch sử')
        setLoading(false)
      })
  }

  // Initial load — fetch directly to avoid setState-in-effect warning
  useEffect(() => {
    const id = ++reqIdRef.current
    fetch('/api/sessions?limit=30')
      .then((r) => r.json())
      .then((d) => {
        if (id !== reqIdRef.current) return
        setSessions(d.sessions || [])
        setLoading(false)
      })
      .catch(() => {
        if (id !== reqIdRef.current) return
        setLoading(false)
      })
  }, [])

  const del = async (id: string) => {
    if (!confirm('Xóa trận đấu này?')) return
    const r = await fetch(`/api/sessions/${id}`, { method: 'DELETE' })
    if (r.ok) { toast.success('Đã xóa'); load(); onChanged?.() }
    else toast.error('Lỗi')
  }

  const clearAll = async () => {
    if (!confirm('Xóa TOÀN BỘ lịch sử trận đấu? Không thể hoàn tác.')) return
    // Delete one by one (no bulk endpoint)
    for (const s of sessions) {
      await fetch(`/api/sessions/${s.id}`, { method: 'DELETE' })
    }
    toast.success('Đã xóa toàn bộ lịch sử')
    load()
    onChanged?.()
  }

  const fmtDate = (iso: string) => {
    const d = new Date(iso)
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' }) + ' ' +
      d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  }
  const fmtDuration = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return m > 0 ? `${m}m ${sec}s` : `${sec}s`
  }

  const exportCSV = () => {
    if (sessions.length === 0) {
      toast.info('Chưa có trận đấu để xuất')
      return
    }
    const escape = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`
    const rows: string[] = []
    rows.push(['Ngày', 'Giờ', 'Số người', 'Số câu', 'Thời lượng (s)', 'Người thắng', 'Điểm thắng', 'Tất cả người chơi'].map(escape).join(','))
    for (const s of sessions) {
      try {
        const players: SessionPlayer[] = JSON.parse(s.results)
        const ranked = [...players].sort((a, b) => b.score - a.score)
        const winner = ranked[0]
        const d = new Date(s.createdAt)
        const dateStr = d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
        const timeStr = d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
        const allPlayers = players.map((p) => `${p.avatar} ${p.name}: ${p.score}đ`).join(' | ')
        rows.push([
          dateStr, timeStr, s.playerCount, s.questionCount, s.duration,
          winner ? `${winner.avatar} ${winner.name}` : '',
          winner ? winner.score : 0,
          allPlayers,
        ].map(escape).join(','))
      } catch {}
    }
    const csv = '\uFEFF' + rows.join('\n') // BOM for Excel UTF-8
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `handquiz-history-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success(`Đã xuất ${sessions.length} trận ra CSV`)
  }

  if (loading) {
    return <div className="text-center py-16 text-muted-foreground">Đang tải lịch sử...</div>
  }

  if (sessions.length === 0) {
    return (
      <div className="text-center py-16">
        <HistoryIcon className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
        <p className="text-muted-foreground">Chưa có trận đấu nào được ghi lại.</p>
        <p className="text-sm text-muted-foreground/70 mt-1">Chơi một ván để lưu lịch sử!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{sessions.length} trận đã ghi</p>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={exportCSV}>
            <Download className="w-4 h-4 mr-1" /> Xuất CSV
          </Button>
          <Button size="sm" variant="ghost" className="text-destructive" onClick={clearAll}>
            <Trash2 className="w-4 h-4 mr-1" /> Xóa tất cả
          </Button>
        </div>
      </div>
      <ScrollArea className="h-[60vh] pr-4">
        <div className="space-y-2">
          {sessions.map((s) => {
            const players: SessionPlayer[] = JSON.parse(s.results)
            const ranked = [...players].sort((a, b) => b.score - a.score)
            const winner = ranked[0]
            return (
              <Card key={s.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{fmtDate(s.createdAt)}</span>
                      <Badge variant="secondary" className="text-xs">
                        <Users className="w-3 h-3 mr-1" />{s.playerCount}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />{fmtDuration(s.duration)}
                      </Badge>
                      <Badge variant="outline" className="text-xs">{s.questionCount} câu</Badge>
                    </div>
                    <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => del(s.id)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {winner && (
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30">
                        <Trophy className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-xs">{winner.avatar}</span>
                        <span className="text-xs font-semibold" style={{ color: winner.color }}>{winner.name}</span>
                        <span className="text-xs text-muted-foreground">{winner.score}đ</span>
                      </div>
                    )}
                    {ranked.slice(1).map((p, i) => (
                      <div key={i} className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-muted/50">
                        <span className="text-xs">{p.avatar}</span>
                        <span className="text-xs text-muted-foreground">{p.name}</span>
                        <span className="text-xs font-medium" style={{ color: p.color }}>{p.score}đ</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
