import { CircleCheck } from 'lucide-react'
import { useEffect } from 'react'

export type ToastProps = {
  message: string
  onDismiss: () => void
}

export function Toast({ message, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = window.setTimeout(onDismiss, 3000)
    return () => window.clearTimeout(timer)
  }, [message, onDismiss])

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-24 z-50 flex justify-center px-4">
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-white shadow-lg"
      >
        <CircleCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
        {message}
      </div>
    </div>
  )
}
