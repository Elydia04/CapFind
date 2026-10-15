export type FilterChipProps = {
  label: string
  active: boolean
  onClick: () => void
}

export function FilterChip({ label, active, onClick }: FilterChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={[
        'min-h-11 rounded-full border px-4 text-sm font-medium transition-colors',
        active
          ? 'border-primary bg-primary text-white'
          : 'border-line bg-white text-muted hover:border-primary hover:text-primary',
      ].join(' ')}
    >
      {label}
    </button>
  )
}
