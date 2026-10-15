import { TriangleAlert } from 'lucide-react'
import { useId } from 'react'
import type { InputHTMLAttributes, ReactNode, Ref } from 'react'

export type FormFieldProps = {
  label: string
  icon?: ReactNode
  error?: string
  inputRef?: Ref<HTMLInputElement>
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>

export function FormField({ label, icon, error, id, inputRef, ...rest }: FormFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`

  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-ink">
        {label}
      </label>
      <div className="relative">
        {icon ? (
          <span
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
            aria-hidden="true"
          >
            {icon}
          </span>
        ) : null}
        <input
          id={inputId}
          ref={inputRef}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={[
            'min-h-11 w-full rounded-lg border bg-white text-sm text-ink placeholder:text-muted',
            icon ? 'pl-10 pr-3' : 'px-3',
            error ? 'border-error bg-error-soft' : 'border-line',
          ].join(' ')}
          {...rest}
        />
      </div>
      {error ? (
        <p id={errorId} className="flex items-center gap-1.5 text-xs font-medium text-error">
          <TriangleAlert className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  )
}
