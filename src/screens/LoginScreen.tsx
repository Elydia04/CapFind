import { GraduationCap, Lock, Mail } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { FormEvent, KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppBar } from '../components/AppBar'
import { Button } from '../components/Button'
import { FormField } from '../components/FormField'
import { SegmentedControl } from '../components/SegmentedControl'
import { useApp } from '../context/AppContext'

type TabValue = 'login' | 'signup'
type Role = 'student' | 'client'

type FieldErrors = {
  fullName?: string
  email?: string
  password?: string
}

const TABS: readonly { value: TabValue; label: string }[] = [
  { value: 'login', label: 'Log In' },
  { value: 'signup', label: 'Sign Up' },
]

export function LoginScreen() {
  const navigate = useNavigate()
  const { login } = useApp()

  const [tab, setTab] = useState<TabValue>('login')
  const [role, setRole] = useState<Role>('student')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [loading, setLoading] = useState(false)

  const fullNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const tabRefs = useRef<Record<TabValue, HTMLButtonElement | null>>({
    login: null,
    signup: null,
  })
  const timerRef = useRef<number | null>(null)

  useEffect(
    () => () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current)
      }
    },
    [],
  )

  const switchTab = (value: TabValue) => {
    setTab(value)
    setErrors({})
  }

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault()
      const next: TabValue = tab === 'login' ? 'signup' : 'login'
      switchTab(next)
      tabRefs.current[next]?.focus()
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors: FieldErrors = {}
    if (tab === 'signup' && fullName.trim() === '') {
      nextErrors.fullName = 'Enter your full name.'
    }
    if (email.trim() === '') {
      nextErrors.email = 'Enter your email address.'
    }
    if (password.trim() === '') {
      nextErrors.password = 'Enter your password.'
    }

    setErrors(nextErrors)

    const firstEmpty = nextErrors.fullName
      ? fullNameRef
      : nextErrors.email
        ? emailRef
        : nextErrors.password
          ? passwordRef
          : null

    if (firstEmpty) {
      firstEmpty.current?.focus()
      return
    }

    const displayName = fullName.trim() || email.trim()
    setLoading(true)
    timerRef.current = window.setTimeout(() => {
      login(displayName)
      navigate('/browse')
    }, 600)
  }

  const handleGuest = () => {
    login('Guest')
    navigate('/browse')
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <AppBar title="Capstone Client Finder" />

      <main className="mx-auto w-full max-w-md flex-1 overflow-y-auto bg-page px-5 py-6">
        <div className="flex flex-col items-center gap-2 pb-6 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-md">
            <GraduationCap className="h-8 w-8" aria-hidden="true" />
          </span>
          <p className="text-sm text-muted">
            Connect with real client projects for your capstone.
          </p>
        </div>

        <div role="tablist" aria-label="Log in or sign up" className="flex border-b border-line">
          {TABS.map(({ value, label }) => {
            const isActive = value === tab
            return (
              <button
                key={value}
                id={`tab-${value}`}
                ref={(element) => {
                  tabRefs.current[value] = element
                }}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="auth-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => switchTab(value)}
                onKeyDown={handleTabKeyDown}
                className={[
                  'min-h-11 flex-1 border-b-2 pb-2 text-sm font-semibold transition-colors',
                  isActive
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted hover:text-ink',
                ].join(' ')}
              >
                {label}
              </button>
            )
          })}
        </div>

        <form
          id="auth-panel"
          role="tabpanel"
          aria-labelledby={`tab-${tab}`}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 pt-4"
        >
          <SegmentedControl
            ariaLabel="Select your role"
            value={role}
            onChange={setRole}
            options={[
              { value: 'student', label: 'Student' },
              { value: 'client', label: 'Client' },
            ]}
          />

          {tab === 'signup' ? (
            <FormField
              label="Full name"
              placeholder="Jordan Diaz"
              value={fullName}
              inputRef={fullNameRef}
              error={errors.fullName}
              autoComplete="name"
              onChange={(event) => {
                setFullName(event.target.value)
                if (errors.fullName) {
                  setErrors((previous) => ({ ...previous, fullName: undefined }))
                }
              }}
            />
          ) : null}

          <FormField
            label="Email address"
            type="email"
            placeholder="name@school.edu"
            icon={<Mail className="h-4 w-4" />}
            value={email}
            inputRef={emailRef}
            error={errors.email}
            autoComplete="email"
            onChange={(event) => {
              setEmail(event.target.value)
              if (errors.email) {
                setErrors((previous) => ({ ...previous, email: undefined }))
              }
            }}
          />

          <div className="flex flex-col gap-1.5">
            <FormField
              label="Password"
              type="password"
              placeholder="Enter your password"
              icon={<Lock className="h-4 w-4" />}
              value={password}
              inputRef={passwordRef}
              error={errors.password}
              autoComplete="current-password"
              onChange={(event) => {
                setPassword(event.target.value)
                if (errors.password) {
                  setErrors((previous) => ({ ...previous, password: undefined }))
                }
              }}
            />
            <div className="flex justify-end">
              <button
                type="button"
                className="min-h-11 text-sm font-medium text-primary underline underline-offset-2"
              >
                Forgot password?
              </button>
            </div>
          </div>

          <Button type="submit" fullWidth loading={loading}>
            {loading ? 'Logging in…' : 'Log In'}
          </Button>

          <Button type="button" variant="secondary" fullWidth onClick={handleGuest}>
            Continue as Guest
          </Button>
        </form>
      </main>
    </div>
  )
}
