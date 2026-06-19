'use client'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { AVATAR_PALETTE } from '@/lib/types'
import { motion } from 'framer-motion'
import { Pencil } from 'lucide-react'

interface AvatarPickerProps {
  value: string
  color: string
  onChange: (avatar: string) => void
}

export default function AvatarPicker({ value, color, onChange }: AvatarPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="relative w-11 h-11 rounded-full flex items-center justify-center text-xl shrink-0 shadow-md transition-transform hover:scale-110 group"
          style={{ backgroundColor: color + '33', border: `2px solid ${color}` }}
          aria-label="Đổi avatar"
        >
          <span>{value}</span>
          <span
            className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-background flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ border: `1px solid ${color}` }}
          >
            <Pencil className="w-2.5 h-2.5" style={{ color }} />
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3" align="start">
        <p className="text-xs font-medium text-muted-foreground mb-2">Chọn avatar</p>
        <div className="grid grid-cols-6 gap-1.5">
          {AVATAR_PALETTE.map((emoji) => {
            const selected = emoji === value
            return (
              <motion.button
                key={emoji}
                type="button"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onChange(emoji)}
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg transition-colors ${
                  selected ? 'ring-2' : 'hover:bg-muted'
                }`}
                style={selected ? { backgroundColor: color + '33', boxShadow: `0 0 0 2px ${color}` } : undefined}
                aria-label={`Avatar ${emoji}`}
                aria-pressed={selected}
              >
                {emoji}
              </motion.button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
