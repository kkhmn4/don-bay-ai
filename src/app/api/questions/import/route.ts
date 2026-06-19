import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

interface ImportItem {
  categoryName?: string
  categoryColor?: string
  categoryIcon?: string
  type?: string
  prompt?: string
  options?: any
  answer?: any
  difficulty?: string
}

// Import a bundle of questions (format handquiz-ar-v1).
// Creates categories if missing (by name). Returns counts.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const items: ImportItem[] = Array.isArray(body?.questions) ? body.questions : (Array.isArray(body) ? body : [])

    if (items.length === 0) {
      return NextResponse.json({ error: 'Không có câu hỏi nào để nhập' }, { status: 400 })
    }

    let created = 0
    let skipped = 0
    const errors: string[] = []
    const catCache: Record<string, string> = {}

    for (let i = 0; i < items.length; i++) {
      const it = items[i]
      try {
        const catName = (it.categoryName || 'Tổng hợp').trim()
        if (!catCache[catName]) {
          const existing = await db.category.findUnique({ where: { name: catName } })
          if (existing) {
            catCache[catName] = existing.id
          } else {
            const created_cat = await db.category.create({
              data: {
                name: catName,
                color: it.categoryColor || '#10b981',
                icon: it.categoryIcon || 'BookOpen',
              },
            })
            catCache[catName] = created_cat.id
          }
        }

        const type = ['QUIZ', 'MATCH', 'SORT'].includes(it.type || '') ? it.type! : 'QUIZ'
        const prompt = String(it.prompt || '').trim()
        if (!prompt) { skipped++; continue }
        const options = typeof it.options === 'string' ? it.options : JSON.stringify(it.options || [])
        const answer = typeof it.answer === 'string' ? it.answer : JSON.stringify(it.answer ?? '')
        const difficulty = ['EASY', 'MEDIUM', 'HARD'].includes(it.difficulty || '') ? it.difficulty! : 'EASY'

        await db.question.create({
          data: {
            categoryId: catCache[catName],
            type,
            prompt,
            options,
            answer,
            difficulty,
          },
        })
        created++
      } catch (e: any) {
        errors.push(`Dòng ${i + 1}: ${e?.message || 'lỗi'}`)
        skipped++
      }
    }

    return NextResponse.json({ created, skipped, errors: errors.slice(0, 10) })
  } catch (e: any) {
    return NextResponse.json({ error: 'Failed to import: ' + (e?.message || 'unknown') }, { status: 500 })
  }
}

// Clear all questions (dangerous — used before a full re-import)
export async function DELETE() {
  try {
    const r = await db.question.deleteMany({})
    return NextResponse.json({ deleted: r.count })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to clear' }, { status: 500 })
  }
}
