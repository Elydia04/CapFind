import { LoaderCircle } from 'lucide-react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary'

export type ButtonProps = {
  variant?: ButtonVariant
  loading?: boolean
  fullWidth?: boolean
  icon?: ReactNode
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>

export function Button({
  variant = 'primary',
  loading = false,
  fullWidth = false,
  icon,
  disabled = false,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading

  const base =
    'inline-flex min-h-11 select-none items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition-colors disabled:cursor-not-allowed'

  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-white hover:bg-primary/90 active:bg-primary/80',
    secondary: 'border border-line bg-white text-ink hover:bg-page active:bg-line/40',
  }

  // Disabled state is background-independent: muted text on a page-grey fill
  // always contrasts at ~5:1 and reads as inactive.
  const classes = [
    base,
    isDisabled ? 'border border-line bg-page text-muted' : variants[variant],
    fullWidth ? 'w-full' : '',
  ]
    .join(' ')
    .trim()

  return (
    <button
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-busy={loading ? true : undefined}
      {...rest}
    >
      {loading ? (
        <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        icon
      )}
      <span>{children}</span>
    </button>
  )
}
