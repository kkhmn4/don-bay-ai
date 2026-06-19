import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const limit = Math.min(Number(searchParams.get('limit')) || 20, 100)
    const sessions = await db.gameSession.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    })
    return NextResponse.json({ sessions })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { playerCount, results, questionCount, category, difficulty, duration } = body
    if (!Array.isArray(results)) {
      return NextResponse.json({ error: 'results must be an array' }, { status: 400 })
    }
    const session = await db.gameSession.create({
      data: {
        playerCount: Number(playerCount) || 1,
        results: JSON.stringify(results),
        questionCount: Number(questionCount) || 0,
        category: category || 'all',
        difficulty: difficulty || 'all',
        duration: Number(duration) || 0,
      },
    })
    return NextResponse.json({ session }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to save session' }, { status: 500 })
  }
}
