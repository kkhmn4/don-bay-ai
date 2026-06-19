'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  BookOpen,
  Calculator,
  CheckCircle2,
  Download,
  FlaskConical,
  Globe,
  Languages,
  Loader2,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { toast } from 'sonner'

/** Shape of a single sample question (forwarded verbatim to the import API). */
type SampleQuestion = Record<string, unknown>

/** One pre-built bundle returned by GET /api/samples. */
interface SampleBundle {
  id: string
  name: string
  description: string
  icon: string
  color: string
  questionCount: number
  bundle: { format: string; questions: SampleQuestion[] }
}

/** Per-card import status, keyed by bundle id. */
type CardState = 'idle' | 'loading' | 'done'

/** Map the API's icon-name string to a real lucide-react component. */
const ICON_MAP: Record<string, LucideIcon> = {
  Calculator,
  FlaskConical,
  Globe,
  Languages,
}

function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? BookOpen
}

/** Helper: tint a hex color to a soft background (≈10% alpha). */
function softBg(hex: string): string {
  return `${hex}1a`
}

export default function SampleBundles({
  onImported,
}: {
  onImported?: () => void
}) {
  const [bundles, setBundles] = useState<SampleBundle[]>([])
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [cardStates, setCardStates] = useState<Record<string, CardState>>({})

  // Ref-guard: a monotonically increasing request id. Only the latest fetch
  // is allowed to write state, so stale responses (Strict Mode / unmount)
  // are ignored. Fetch is inlined in the effect (no load() helper) to keep
  // the React 19 `react-hooks/set-state-in-effect` lint rule happy.
  const reqIdRef = useRef(0)

  useEffect(() => {
    const id = ++reqIdRef.current
    fetch('/api/samples')
      .then((r) => {
        if (!r.ok) throw new Error('Không tải được bộ câu hỏi mẫu')
        return r.json()
      })
      .then((d: { bundles?: SampleBundle[] }) => {
        if (id !== reqIdRef.current) return
        setBundles(d.bundles ?? [])
        setLoading(false)
      })
      .catch((e: unknown) => {
        if (id !== reqIdRef.current) return
        setErrorMsg(e instanceof Error ? e.message : 'Lỗi không xác định')
        setLoading(false)
      })
  }, [])

  const importBundle = async (b: SampleBundle) => {
    setCardStates((s) => ({ ...s, [b.id]: 'loading' }))
    try {
      const r = await fetch('/api/questions/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(b.bundle),
      })
      const d: { created?: number; skipped?: number; error?: string } =
        await r.json()
      if (!r.ok) {
        throw new Error(d?.error || 'Nhập thất bại')
      }
      toast.success(`Đã nhập ${d.created ?? 0} câu hỏi từ "${b.name}"`)
      setCardStates((s) => ({ ...s, [b.id]: 'done' }))
      onImported?.()
      // Revert to idle after a few seconds so teachers can re-import if needed.
      window.setTimeout(() => {
        setCardStates((s) =>
          s[b.id] === 'done' ? { ...s, [b.id]: 'idle' } : s,
        )
      }, 3000)
    } catch (e: unknown) {
      setCardStates((s) => ({ ...s, [b.id]: 'idle' }))
      toast.error(e instanceof Error ? e.message : 'Nhập thất bại')
    }
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-amber-500/10 p-2 ring-1 ring-amber-500/20">
          <Sparkles className="h-5 w-5 text-amber-500" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Bộ câu hỏi mẫu</h3>
          <p className="text-sm text-muted-foreground">
            Nhập nhanh bộ câu hỏi sẵn có theo chủ đề — chỉ 1 click.
          </p>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Đang tải bộ câu hỏi mẫu…
        </div>
      )}

      {/* Error */}
      {!loading && errorMsg && (
        <div className="py-8 text-center text-sm text-destructive">
          {errorMsg}
        </div>
      )}

      {/* Empty */}
      {!loading && !errorMsg && bundles.length === 0 && (
        <div className="py-8 text-center text-sm text-muted-foreground">
          Hiện không có bộ câu hỏi mẫu nào.
        </div>
      )}

      {/* Grid of bundle cards */}
      {!loading && !errorMsg && bundles.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {bundles.map((b, i) => {
            const Icon = getIcon(b.icon)
            const state: CardState = cardStates[b.id] ?? 'idle'
            return (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.4,
                  ease: 'easeOut',
                }}
              >
                <Card
                  className="h-full overflow-hidden border-t-4 transition-shadow hover:shadow-md"
                  style={{ borderTopColor: b.color }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white shadow-sm"
                        style={{ backgroundColor: b.color }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <CardTitle className="truncate text-base">
                          {b.name}
                        </CardTitle>
                        <div className="mt-1">
                          <Badge
                            variant="secondary"
                            className="border-transparent text-xs"
                            style={{
                              backgroundColor: softBg(b.color),
                              color: b.color,
                            }}
                          >
                            {b.questionCount} câu hỏi
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="min-h-[3.5rem] text-sm text-muted-foreground">
                      {b.description}
                    </p>

                    <Button
                      className="w-full"
                      style={
                        state === 'done'
                          ? { backgroundColor: '#16a34a', borderColor: '#16a34a' }
                          : { backgroundColor: b.color, borderColor: b.color }
                      }
                      disabled={state !== 'idle'}
                      onClick={() => importBundle(b)}
                    >
                      {state === 'idle' && (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Nhập vào bộ câu hỏi
                        </>
                      )}
                      {state === 'loading' && (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Đang nhập…
                        </>
                      )}
                      {state === 'done' && (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Đã nhập
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
