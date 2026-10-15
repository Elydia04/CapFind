import { Bell, Inbox, Mail, MapPin, Search } from 'lucide-react'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { AppBar } from '../components/AppBar'
import { Avatar } from '../components/Avatar'
import { BottomNav } from '../components/BottomNav'
import { Button } from '../components/Button'
import { FormField } from '../components/FormField'
import { SegmentedControl } from '../components/SegmentedControl'
import { StatusPill } from '../components/StatusPill'
import { Tag } from '../components/Tag'
import { Toast } from '../components/Toast'

type Role = 'student' | 'client'

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3 rounded-xl border border-line bg-white p-4 shadow-sm">
      <h2 className="text-sm font-bold uppercase tracking-wide text-muted">{title}</h2>
      {children}
    </section>
  )
}

export function ComponentsPreviewScreen() {
  const [role, setRole] = useState<Role>('student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState<string | undefined>()
  const [toast, setToast] = useState<string | undefined>()

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden">
      <AppBar
        title="Component Preview"
        action={{ icon: <Bell className="h-5 w-5" aria-hidden="true" />, label: 'Notifications', onClick: () => setToast('Action tapped') }}
      />

      <main className="flex-1 space-y-4 overflow-y-auto bg-page p-4">
        <Section title="Buttons">
          <Button fullWidth>Primary button</Button>
          <Button variant="secondary" fullWidth>
            Secondary button
          </Button>
          <Button fullWidth loading>
            Loading…
          </Button>
          <Button fullWidth disabled>
            Disabled
          </Button>
          <Button fullWidth icon={<Mail className="h-4 w-4" aria-hidden="true" />}>
            Button with icon
          </Button>
          <Button variant="secondary" disabled fullWidth>
            Disabled secondary
          </Button>
        </Section>

        <Section title="Form fields">
          <FormField
            label="Email address"
            placeholder="name@school.edu"
            icon={<Mail className="h-4 w-4" />}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <FormField
            label="Password"
            type="password"
            placeholder="Enter your password"
            icon={<Search className="h-4 w-4" />}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <FormField
            label="Email address (error)"
            placeholder="name@school.edu"
            icon={<Mail className="h-4 w-4" />}
            defaultValue="not-an-email"
            error="Enter a valid email address."
          />
          <FormField
            label="Plain field"
            placeholder="No icon, no error"
            error={emailError}
          />
        </Section>

        <Section title="Segmented control">
          <SegmentedControl
            ariaLabel="Select role"
            value={role}
            onChange={setRole}
            options={[
              { value: 'student', label: 'Student' },
              { value: 'client', label: 'Client' },
            ]}
          />
        </Section>

        <Section title="Tags">
          <div className="flex flex-wrap gap-2">
            <Tag>Web App</Tag>
            <Tag>Inventory</Tag>
            <Tag>Non-profit</Tag>
          </div>
        </Section>

        <Section title="Status pills">
          <div className="flex flex-wrap gap-2">
            <StatusPill variant="open" />
            <StatusPill variant="closing" />
            <StatusPill variant="applied" />
            <StatusPill variant="accepted" />
          </div>
        </Section>

        <Section title="Avatars">
          <div className="flex items-center gap-3">
            <Avatar initials="GC" size="sm" />
            <Avatar initials="BF" size="md" />
            <Avatar initials="AD" size="lg" />
            <Avatar initials="JD" label="Jordan Diaz" />
          </div>
        </Section>

        <Section title="Toast">
          <Button
            variant="secondary"
            fullWidth
            icon={<Inbox className="h-4 w-4" aria-hidden="true" />}
            onClick={() => setToast('Application sent to Green Cart Co.')}
          >
            Show toast
          </Button>
        </Section>

        <Section title="Empty-state pattern">
          <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-line bg-page p-6 text-center">
            <MapPin className="h-6 w-6 text-muted" aria-hidden="true" />
            <p className="text-sm font-medium text-ink">Nothing here yet</p>
            <p className="text-xs text-muted">Caption text in muted 12px.</p>
          </div>
        </Section>

        <div className="flex justify-center gap-2 pb-2">
          <Button variant="secondary" onClick={() => setEmailError('Enter your email address.')}>
            Trigger error
          </Button>
          <Button variant="secondary" onClick={() => setEmailError(undefined)}>
            Clear error
          </Button>
        </div>
      </main>

      <BottomNav unreadMessages />

      {toast ? <Toast message={toast} onDismiss={() => setToast(undefined)} /> : null}
    </div>
  )
}
