import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    const { categoryId, type, prompt, options, answer, difficulty } = body

    const data: any = {}
    if (categoryId) data.categoryId = categoryId
    if (type) data.type = type
    if (prompt !== undefined) data.prompt = String(prompt)
    if (options !== undefined) data.options = typeof options === 'string' ? options : JSON.stringify(options)
    if (answer !== undefined) data.answer = typeof answer === 'string' ? answer : JSON.stringify(answer)
    if (difficulty) data.difficulty = difficulty

    const q = await db.question.update({ where: { id }, data })
    return NextResponse.json({ question: q })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update question' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await db.question.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to delete question' }, { status: 500 })
  }
}
