import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get('categoryId')
    const type = searchParams.get('type')
    const difficulty = searchParams.get('difficulty')

    const where: any = {}
    if (categoryId && categoryId !== 'all') where.categoryId = categoryId
    if (type && type !== 'all') where.type = type
    if (difficulty && difficulty !== 'all') where.difficulty = difficulty

    const questions = await db.question.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { category: true },
    })
    return NextResponse.json({ questions })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { categoryId, type, prompt, options, answer, difficulty } = body

    if (!categoryId || !prompt || !options || answer === undefined) {
      return NextResponse.json({ error: 'Thiếu thông tin câu hỏi' }, { status: 400 })
    }
    if (!['QUIZ', 'MATCH', 'SORT'].includes(type)) {
      return NextResponse.json({ error: 'Loại câu hỏi không hợp lệ' }, { status: 400 })
    }

    const q = await db.question.create({
      data: {
        categoryId,
        type,
        prompt: String(prompt),
        options: typeof options === 'string' ? options : JSON.stringify(options),
        answer: typeof answer === 'string' ? answer : JSON.stringify(answer),
        difficulty: difficulty || 'EASY',
      },
    })
    return NextResponse.json({ question: q }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create question' }, { status: 500 })
  }
}
