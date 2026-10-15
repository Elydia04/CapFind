import { GraduationCap, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AppBar } from '../components/AppBar'
import { Avatar } from '../components/Avatar'
import { BottomNav } from '../components/BottomNav'
import { Button } from '../components/Button'
import { Tag } from '../components/Tag'
import { useApp } from '../context/AppContext'

const MOCK_EMAIL = 'jordan.diaz@university.edu'
const ROLE = 'Student'
const SKILLS: readonly string[] = [
  'React',
  'TypeScript',
  'UI/UX',
  'Databases',
  'Testing',
]

function initialsFor(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) {
    return '?'
  }
  if (parts.length === 1) {
    const local = parts[0].includes('@') ? parts[0].split('@')[0] : parts[0]
    return local.slice(0, 2).toUpperCase()
  }
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
}

export function ProfileScreen() {
  const navigate = useNavigate()
  const { userName, conversations, logout, showToast } = useApp()

  const displayName = userName ?? 'Guest'
  const hasUnread = conversations.some((conversation) => conversation.unread)

  const handleLogout = () => {
    logout()
    showToast('You have been logged out')
    navigate('/login')
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <AppBar title="Profile" />

      <main className="flex-1 overflow-y-auto bg-page">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 py-4">
          <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-white p-6 text-center shadow-sm">
            <Avatar initials={initialsFor(displayName)} size="lg" />
            <div>
              <p className="text-lg font-bold text-ink">{displayName}</p>
              <p className="text-sm text-muted">{MOCK_EMAIL}</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-3 py-1 text-xs font-semibold text-primary">
              <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
              {ROLE}
            </span>
          </div>

          <div className="flex flex-col gap-3 rounded-xl border border-line bg-white p-4 shadow-sm">
            <h2 className="text-sm font-bold text-ink">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </div>
          </div>

          <Button
            variant="secondary"
            fullWidth
            icon={<LogOut className="h-4 w-4" aria-hidden="true" />}
            onClick={handleLogout}
          >
            Log out
          </Button>
        </div>
      </main>

      <BottomNav unreadMessages={hasUnread} />
    </div>
  )
}
