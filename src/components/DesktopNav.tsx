import { Briefcase, GraduationCap, LayoutGrid, MessageSquare, User } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { NavLink } from 'react-router-dom'
import type { BottomNavProps } from './BottomNav'

type Tab = {
  to: string
  label: string
  Icon: ComponentType<SVGProps<SVGSVGElement>>
}

const TABS: readonly Tab[] = [
  { to: '/browse', label: 'Browse', Icon: LayoutGrid },
  { to: '/applications', label: 'Applications', Icon: Briefcase },
  { to: '/messages', label: 'Messages', Icon: MessageSquare },
  { to: '/profile', label: 'Profile', Icon: User },
]

export function DesktopNav({ unreadMessages = false }: BottomNavProps) {
  return (
    <header className="hidden shrink-0 items-center justify-between gap-4 border-b border-white/15 bg-primary px-6 py-2 text-white md:flex">
      <span className="flex items-center gap-2 text-sm font-bold">
        <GraduationCap className="h-5 w-5" aria-hidden="true" />
        Capstone Client Finder
      </span>
      <nav aria-label="Primary" className="flex items-center gap-1">
        {TABS.map(({ to, label, Icon }) => {
          const showsUnread = label === 'Messages' && unreadMessages
          return (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [
                  'relative inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-sm transition-colors',
                  isActive
                    ? 'font-bold text-white underline decoration-2 underline-offset-8'
                    : 'font-medium text-white/85 hover:bg-white/10 hover:text-white',
                ].join(' ')
              }
            >
              {() => (
                <>
                  <span className="relative">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {showsUnread ? (
                      <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-white ring-2 ring-primary" />
                    ) : null}
                  </span>
                  {label}
                  {showsUnread ? <span className="sr-only">Unread messages</span> : null}
                </>
              )}
            </NavLink>
          )
        })}
      </nav>
    </header>
  )
}
