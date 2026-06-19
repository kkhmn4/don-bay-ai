import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Aggregate statistics from GameSession + Question for the teacher dashboard.
export async function GET() {
  try {
    const sessions = await db.gameSession.findMany({ orderBy: { createdAt: 'desc' } })
    const questions = await db.question.findMany({ include: { category: true } })
    const categories = await db.category.findMany({ include: { _count: { select: { questions: true } } } })

    const totalGames = sessions.length
    const totalPlayers = sessions.reduce((acc, s) => acc + s.playerCount, 0)
    const totalQuestions = questions.length

    // Average score per player across all sessions
    let totalScore = 0
    let totalScoreEntries = 0
    const playerScoreMap: Record<string, { name: string; color: string; avatar: string; games: number; totalScore: number }> = {}
    for (const s of sessions) {
      try {
        const results = JSON.parse(s.results) as Array<{ name: string; color: string; avatar: string; score: number }>
        for (const r of results) {
          totalScore += r.score
          totalScoreEntries++
          const key = r.name
          if (!playerScoreMap[key]) {
            playerScoreMap[key] = { name: r.name, color: r.color, avatar: r.avatar, games: 0, totalScore: 0 }
          }
          playerScoreMap[key].games++
          playerScoreMap[key].totalScore += r.score
        }
      } catch {}
    }
    const avgScore = totalScoreEntries > 0 ? Math.round((totalScore / totalScoreEntries) * 10) / 10 : 0

    const topPlayers = Object.values(playerScoreMap)
      .map((p) => ({ ...p, avgScore: p.games > 0 ? Math.round((p.totalScore / p.games) * 10) / 10 : 0 }))
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 5)

    // Games over the last 14 days (count per day)
    const days: { date: string; count: number }[] = []
    const now = new Date()
    for (let i = 13; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(now.getDate() - i)
      const key = d.toISOString().slice(0, 10)
      days.push({ date: key, count: 0 })
    }
    for (const s of sessions) {
      const key = new Date(s.createdAt).toISOString().slice(0, 10)
      const entry = days.find((d) => d.date === key)
      if (entry) entry.count++
    }

    // Question distribution by type
    const typeDist = { QUIZ: 0, MATCH: 0, SORT: 0 }
    for (const q of questions) {
      if (q.type in typeDist) (typeDist as any)[q.type]++
    }

    // Category distribution (question count per category)
    const categoryDist = categories.map((c) => ({
      name: c.name,
      color: c.color,
      count: c._count.questions,
    }))

    // Difficulty distribution
    const diffDist = { EASY: 0, MEDIUM: 0, HARD: 0 }
    for (const q of questions) {
      if (q.difficulty in diffDist) (diffDist as any)[q.difficulty]++
    }

    // Average game duration
    const avgDuration = totalGames > 0
      ? Math.round(sessions.reduce((a, s) => a + s.duration, 0) / totalGames)
      : 0

    return NextResponse.json({
      totalGames,
      totalPlayers,
      totalQuestions,
      totalCategories: categories.length,
      avgScore,
      avgDuration,
      topPlayers,
      gamesOverTime: days,
      typeDist,
      categoryDist,
      diffDist,
    })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to compute stats' }, { status: 500 })
  }
}
