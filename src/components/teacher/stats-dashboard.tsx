'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { motion, type Variants } from 'framer-motion'
import {
  AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar,
  XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid,
} from 'recharts'
import {
  Trophy, Users, HelpCircle, Target, Gamepad2, TrendingUp,
  BarChart3, Clock, Crown,
} from 'lucide-react'

interface TopPlayer {
  name: string
  color: string
  avatar: string
  games: number
  totalScore: number
  avgScore: number
}

interface StatsData {
  totalGames: number
  totalPlayers: number
  totalQuestions: number
  totalCategories: number
  avgScore: number
  avgDuration: number
  topPlayers: TopPlayer[]
  gamesOverTime: Array<{ date: string; count: number }>
  typeDist: { QUIZ: number; MATCH: number; SORT: number }
  categoryDist: Array<{ name: string; color: string; count: number }>
  diffDist: { EASY: number; MEDIUM: number; HARD: number }
}

const COLORS = {
  emerald: '#10b981',
  amber: '#f59e0b',
  cyan: '#06b6d4',
  rose: '#ec4899',
  violet: '#8b5cf6',
  red: '#ef4444',
} as const

type QuestionTypeKey = 'QUIZ' | 'MATCH' | 'SORT'
const TYPE_LABELS: Record<QuestionTypeKey, string> = {
  QUIZ: 'Trắc nghiệm',
  MATCH: 'Ghép cặp',
  SORT: 'Sắp xếp',
}
const TYPE_COLORS: Record<QuestionTypeKey, string> = {
  QUIZ: COLORS.emerald,
  MATCH: COLORS.amber,
  SORT: COLORS.cyan,
}

type DiffKey = 'EASY' | 'MEDIUM' | 'HARD'
const DIFF_META: Array<{ key: DiffKey; label: string; color: string }> = [
  { key: 'EASY', label: 'Dễ', color: COLORS.emerald },
  { key: 'MEDIUM', label: 'Trung bình', color: COLORS.amber },
  { key: 'HARD', label: 'Khó', color: COLORS.red },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const fmtDate = (iso: string): string => {
  const parts = iso.split('-')
  if (parts.length !== 3) return iso
  return `${parts[2]}/${parts[1]}`
}

const fmtDuration = (s: number): string => {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return m > 0 ? `${m}m ${sec}s` : `${sec}s`
}

const truncate = (s: string, n: number): string =>
  s.length > n ? s.slice(0, n - 1) + '…' : s

function KpiCard({
  icon, value, label, color, footer,
}: {
  icon: ReactNode
  value: number | string
  label: string
  color: string
  footer?: ReactNode
}) {
  return (
    <motion.div variants={itemVariants}>
      <Card
        className="relative overflow-hidden border-0 shadow-sm py-0"
        style={{ background: `linear-gradient(135deg, ${color}1f, ${color}0a)` }}
      >
        <CardContent className="p-5 flex items-start gap-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 text-white shadow-sm"
            style={{ backgroundColor: color }}
            aria-hidden
          >
            {icon}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-3xl font-bold tracking-tight leading-none">{value}</div>
            <div className="text-sm font-medium mt-1.5 text-foreground/80">{label}</div>
            {footer && <div className="text-xs text-muted-foreground mt-1">{footer}</div>}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function StatsDashboard() {
  const [data, setData] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const reqIdRef = useRef(0)

  // Initial fetch — fetch directly inside the effect and set state only in the
  // .then() callback, guarded by the ref id, to avoid the
  // `react-hooks/set-state-in-effect` lint error.
  useEffect(() => {
    const id = ++reqIdRef.current
    fetch('/api/stats')
      .then((r) => r.json())
      .then((d: StatsData) => {
        if (id !== reqIdRef.current) return
        setData(d)
        setLoading(false)
      })
      .catch(() => {
        if (id !== reqIdRef.current) return
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Skeleton className="h-80 rounded-xl" />
          <Skeleton className="h-80 rounded-xl" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-80 rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  if (!data || data.totalGames === 0) {
    return (
      <Card className="py-0">
        <CardContent className="py-16 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
            <BarChart3 className="w-8 h-8 text-emerald-500" />
          </div>
          <h3 className="text-lg font-semibold mb-1">Chưa có dữ liệu</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            Chưa có dữ liệu. Hãy chơi một ván để xem thống kê!
          </p>
        </CardContent>
      </Card>
    )
  }

  const typeData: Array<{ key: QuestionTypeKey; name: string; value: number; color: string }> =
    (['QUIZ', 'MATCH', 'SORT'] as QuestionTypeKey[]).map((k) => ({
      key: k,
      name: TYPE_LABELS[k],
      value: data.typeDist[k] ?? 0,
      color: TYPE_COLORS[k],
    }))

  const diffTotal = data.diffDist.EASY + data.diffDist.MEDIUM + data.diffDist.HARD
  const diffData = DIFF_META.map((m) => {
    const count = data.diffDist[m.key] ?? 0
    return {
      ...m,
      count,
      pct: diffTotal > 0 ? Math.round((count / diffTotal) * 100) : 0,
    }
  })

  const maxCatCount = data.categoryDist.length > 0
    ? Math.max(...data.categoryDist.map((c) => c.count))
    : 0

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <KpiCard
          icon={<Gamepad2 className="w-6 h-6" />}
          value={data.totalGames}
          label="Tổng số trận"
          color={COLORS.emerald}
          footer={
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3" /> TB {fmtDuration(data.avgDuration)}/trận
            </span>
          }
        />
        <KpiCard
          icon={<Users className="w-6 h-6" />}
          value={data.totalPlayers}
          label="Tổng người chơi"
          color={COLORS.cyan}
          footer={<span>lượt tham gia</span>}
        />
        <KpiCard
          icon={<HelpCircle className="w-6 h-6" />}
          value={data.totalQuestions}
          label="Tổng câu hỏi"
          color={COLORS.violet}
          footer={<span>{data.totalCategories} chủ đề</span>}
        />
        <KpiCard
          icon={<Target className="w-6 h-6" />}
          value={data.avgScore}
          label="Điểm trung bình"
          color={COLORS.rose}
          footer={<span>mỗi người / trận</span>}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 14-day games area chart */}
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                Trận đấu 14 ngày qua
              </CardTitle>
              <CardDescription>
                Số trận được chơi mỗi ngày trong 2 tuần gần nhất
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={data.gamesOverTime}
                    margin={{ top: 10, right: 12, left: -16, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="gamesGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={COLORS.emerald} stopOpacity={0.45} />
                        <stop offset="100%" stopColor={COLORS.emerald} stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                      opacity={0.4}
                      vertical={false}
                    />
                    <XAxis
                      dataKey="date"
                      tickFormatter={fmtDate}
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                      tickLine={false}
                      axisLine={false}
                      minTickGap={16}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                      tickLine={false}
                      axisLine={false}
                      width={32}
                    />
                    <Tooltip
                      labelFormatter={(l) => fmtDate(String(l))}
                      formatter={(v) => [`${v} trận`, 'Số trận']}
                      contentStyle={{
                        borderRadius: 8,
                        border: '1px solid hsl(var(--border))',
                        fontSize: 12,
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="count"
                      stroke={COLORS.emerald}
                      strokeWidth={2.5}
                      fill="url(#gamesGrad)"
                      dot={{ r: 2.5, fill: COLORS.emerald }}
                      activeDot={{ r: 5 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top players */}
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Crown className="w-4 h-4 text-amber-500" />
                Top người chơi
              </CardTitle>
              <CardDescription>5 người có tổng điểm cao nhất</CardDescription>
            </CardHeader>
            <CardContent>
              {data.topPlayers.length === 0 ? (
                <p className="text-sm text-muted-foreground py-10 text-center">
                  Chưa có người chơi nào được ghi nhận.
                </p>
              ) : (
                <motion.ul
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-1.5 max-h-72 overflow-y-auto pr-1"
                >
                  {data.topPlayers.map((p, i) => (
                    <motion.li
                      key={`${p.name}-${i}`}
                      variants={itemVariants}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="text-xs font-bold w-5 text-center text-muted-foreground">
                        {i + 1}
                      </div>
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 border-2"
                        style={{ backgroundColor: p.color + '22', borderColor: p.color }}
                      >
                        <span aria-hidden>{p.avatar || '🎮'}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold truncate" style={{ color: p.color }}>
                          {p.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {p.games} trận · {p.totalScore} đ
                        </div>
                      </div>
                      <Badge variant="secondary" className="shrink-0">
                        <Target className="w-3 h-3 mr-1" />
                        TB {p.avgScore}
                      </Badge>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Distribution Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Type distribution PieChart */}
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="w-4 h-4 text-cyan-500" />
                Phân bố loại câu hỏi
              </CardTitle>
              <CardDescription>Tỷ lệ giữa 3 loại câu hỏi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={typeData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={48}
                      outerRadius={72}
                      paddingAngle={2}
                      stroke="hsl(var(--background))"
                      strokeWidth={2}
                    >
                      {typeData.map((entry) => (
                        <Cell key={entry.key} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v, n) => [`${v} câu`, String(n)]}
                      contentStyle={{
                        borderRadius: 8,
                        border: '1px solid hsl(var(--border))',
                        fontSize: 12,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mt-3">
                {typeData.map((t) => (
                  <div key={t.key} className="flex items-center gap-1.5 text-xs">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: t.color }}
                    />
                    <span className="text-muted-foreground">{t.name}</span>
                    <span className="font-medium">{t.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Category BarChart */}
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="w-4 h-4 text-violet-500" />
                Câu hỏi theo chủ đề
              </CardTitle>
              <CardDescription>Số câu hỏi trong từng chủ đề</CardDescription>
            </CardHeader>
            <CardContent>
              {data.categoryDist.length === 0 ? (
                <p className="text-sm text-muted-foreground py-16 text-center">
                  Chưa có chủ đề nào.
                </p>
              ) : (
                <>
                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={data.categoryDist}
                        layout="vertical"
                        margin={{ top: 4, right: 16, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="hsl(var(--border))"
                          opacity={0.4}
                          horizontal={false}
                        />
                        <XAxis
                          type="number"
                          allowDecimals={false}
                          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                          tickLine={false}
                          axisLine={false}
                        />
                        <YAxis
                          type="category"
                          dataKey="name"
                          tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                          tickLine={false}
                          axisLine={false}
                          width={84}
                          tickFormatter={(s: string) => truncate(String(s), 11)}
                        />
                        <Tooltip
                          formatter={(v) => [`${v} câu`, 'Số câu']}
                          cursor={{ fill: 'hsl(var(--muted))', opacity: 0.3 }}
                          contentStyle={{
                            borderRadius: 8,
                            border: '1px solid hsl(var(--border))',
                            fontSize: 12,
                          }}
                        />
                        <Bar dataKey="count" radius={[0, 4, 4, 0]} maxBarSize={22}>
                          {data.categoryDist.map((c, i) => (
                            <Cell key={i} fill={c.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Nhiều nhất: {maxCatCount} câu / chủ đề
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Difficulty stacked bar */}
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Trophy className="w-4 h-4 text-rose-500" />
                Phân bố độ khó
              </CardTitle>
              <CardDescription>Tỷ lệ câu dễ / trung bình / khó</CardDescription>
            </CardHeader>
            <CardContent>
              {diffTotal === 0 ? (
                <p className="text-sm text-muted-foreground py-16 text-center">
                  Chưa có câu hỏi nào để thống kê.
                </p>
              ) : (
                <>
                  <div
                    className="flex h-9 w-full overflow-hidden rounded-lg border border-border"
                    role="img"
                    aria-label="Phân bố độ khó câu hỏi"
                  >
                    {diffData.map((d) => (
                      <div
                        key={d.key}
                        className="flex items-center justify-center text-xs font-semibold text-white transition-all"
                        style={{
                          backgroundColor: d.color,
                          width: `${d.pct}%`,
                          minWidth: d.count > 0 ? '1.5rem' : 0,
                        }}
                        title={`${d.label}: ${d.count} câu (${d.pct}%)`}
                      >
                        {d.pct >= 10 ? d.count : ''}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-5">
                    {diffData.map((d) => (
                      <div key={d.key} className="text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: d.color }}
                          />
                          <span className="text-xs font-medium">{d.label}</span>
                        </div>
                        <div className="text-xl font-bold mt-1">{d.count}</div>
                        <div className="text-xs text-muted-foreground">{d.pct}%</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
