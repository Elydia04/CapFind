import { BadgeCheck, CircleCheck, Clock, Send } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'

export type StatusPillVariant = 'open' | 'closing' | 'applied' | 'accepted'

export type StatusPillProps = {
  variant: StatusPillVariant
}

type StatusConfig = {
  label: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  classes: string
}

const STATUS: Record<StatusPillVariant, StatusConfig> = {
  open: { label: 'Open', Icon: CircleCheck, classes: 'bg-success-soft text-success' },
  closing: { label: 'Closing soon', Icon: Clock, classes: 'bg-warning-soft text-warning' },
  applied: { label: 'Applied', Icon: Send, classes: 'bg-primary-soft text-primary' },
  accepted: { label: 'Accepted', Icon: BadgeCheck, classes: 'bg-success-soft text-success' },
}

export function StatusPill({ variant }: StatusPillProps) {
  const { label, Icon, classes } = STATUS[variant]
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${classes}`}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </span>
  )
}
