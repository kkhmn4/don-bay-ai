import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Global all-time leaderboard aggregated from every GameSession.
// Ranks players by total score, games played, wins, and average score.
export async function GET() {
  try {
    const sessions = await db.gameSession.findMany()

    interface Agg {
      name: string
      color: string
      avatar: string
      totalScore: number
      games: number
      wins: number
    }
    const map: Record<string, Agg> = {}

    for (const s of sessions) {
      try {
        const results = JSON.parse(s.results) as Array<{ name: string; color: string; avatar: string; score: number }>
        const ranked = [...results].sort((a, b) => b.score - a.score)
        const winnerName = ranked[0]?.name
        for (const r of results) {
          const key = r.name
          if (!map[key]) {
            map[key] = { name: r.name, color: r.color, avatar: r.avatar, totalScore: 0, games: 0, wins: 0 }
          }
          map[key].totalScore += r.score
          map[key].games++
          if (r.name === winnerName && r.score > 0) map[key].wins++
        }
      } catch {}
    }

    const leaderboard = Object.values(map)
      .map((p) => ({
        ...p,
        avgScore: p.games > 0 ? Math.round((p.totalScore / p.games) * 10) / 10 : 0,
        winRate: p.games > 0 ? Math.round((p.wins / p.games) * 100) : 0,
      }))
      .sort((a, b) => b.totalScore - a.totalScore || b.wins - a.wins)
      .slice(0, 20)

    return NextResponse.json({ leaderboard, totalSessions: sessions.length })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to compute leaderboard' }, { status: 500 })
  }
}
