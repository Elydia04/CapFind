import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

export type AppBarAction = {
  icon: ReactNode
  label: string
  onClick: () => void
}

export type AppBarProps = {
  title: string
  showBack?: boolean
  onBack?: () => void
  action?: AppBarAction
}

export function AppBar({ title, showBack = false, onBack, action }: AppBarProps) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBack) {
      onBack()
      return
    }
    navigate(-1)
  }

  return (
    <header className="flex min-h-14 shrink-0 items-center gap-1 bg-primary px-2 text-white">
      {showBack ? (
        <button
          type="button"
          aria-label="Go back"
          onClick={handleBack}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg hover:bg-white/10"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        </button>
      ) : null}
      <h1 className="min-w-0 flex-1 truncate px-1 text-lg font-bold">{title}</h1>
      {action ? (
        <button
          type="button"
          aria-label={action.label}
          onClick={action.onClick}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg hover:bg-white/10"
        >
          {action.icon}
        </button>
      ) : null}
    </header>
  )
}
