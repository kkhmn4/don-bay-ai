import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Export all questions + categories as a JSON bundle for sharing/importing elsewhere
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const categoryId = searchParams.get('categoryId')

    const where: any = {}
    if (categoryId && categoryId !== 'all') where.categoryId = categoryId

    const questions = await db.question.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: 'asc' },
    })

    const bundle = {
      format: 'handquiz-ar-v1',
      exportedAt: new Date().toISOString(),
      questions: questions.map((q) => ({
        categoryName: q.category.name,
        categoryColor: q.category.color,
        categoryIcon: q.category.icon,
        type: q.type,
        prompt: q.prompt,
        options: q.options,
        answer: q.answer,
        difficulty: q.difficulty,
      })),
    }

    return NextResponse.json(bundle)
  } catch (e) {
    return NextResponse.json({ error: 'Failed to export' }, { status: 500 })
  }
}
