export type AvatarSize = 'sm' | 'md' | 'lg'

export type AvatarProps = {
  initials: string
  size?: AvatarSize
  label?: string
}

const SIZES: Record<AvatarSize, string> = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
}

export function Avatar({ initials, size = 'md', label }: AvatarProps) {
  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-primary-soft font-semibold text-primary ${SIZES[size]}`}
    >
      {initials}
    </span>
  )
}
