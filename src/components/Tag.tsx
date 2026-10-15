import type { ReactNode } from 'react'

export type TagProps = {
  children: ReactNode
}

export function Tag({ children }: TagProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-line px-2.5 py-1 text-xs font-medium text-muted">
      {children}
    </span>
  )
}
