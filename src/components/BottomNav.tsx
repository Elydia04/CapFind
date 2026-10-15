import { Briefcase, LayoutGrid, MessageSquare, User } from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { NavLink } from 'react-router-dom'

export type BottomNavProps = {
  unreadMessages?: boolean
}

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

export function BottomNav({ unreadMessages = false }: BottomNavProps) {
  return (
    <nav
      aria-label="Primary"
      className="flex shrink-0 border-t border-line bg-white md:hidden"
    >
      {TABS.map(({ to, label, Icon }) => {
        const showsUnread = label === 'Messages' && unreadMessages
        return (
          <NavLink
            key={to}
            to={to}
            className="flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 py-1.5"
          >
            {({ isActive }) => (
              <>
                <span className="relative">
                  <Icon
                    className={`h-5 w-5 ${isActive ? 'text-primary' : 'text-muted'}`}
                    aria-hidden="true"
                  />
                  {showsUnread ? (
                    <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-white" />
                  ) : null}
                </span>
                <span
                  className={
                    isActive
                      ? 'text-xs font-bold text-primary'
                      : 'text-xs font-medium text-muted'
                  }
                >
                  {label}
                </span>
                {showsUnread ? <span className="sr-only">Unread messages</span> : null}
              </>
            )}
          </NavLink>
        )
      })}
    </nav>
  )
}
