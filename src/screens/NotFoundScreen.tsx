import { Compass } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AppBar } from '../components/AppBar'
import { BottomNav } from '../components/BottomNav'
import { Button } from '../components/Button'
import { useApp } from '../context/AppContext'

export function NotFoundScreen() {
  const navigate = useNavigate()
  const { conversations } = useApp()

  const hasUnread = conversations.some((conversation) => conversation.unread)

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <AppBar title="Not Found" />

      <main className="flex flex-1 flex-col items-center justify-center gap-3 bg-page px-6 text-center">
        <Compass className="h-8 w-8 text-muted" aria-hidden="true" />
        <p className="text-base font-bold text-ink">This page does not exist</p>
        <p className="text-sm text-muted">
          The page you are looking for may have moved or no longer exists.
        </p>
        <Button variant="secondary" onClick={() => navigate('/browse')}>
          Back to Browse
        </Button>
      </main>

      <BottomNav unreadMessages={hasUnread} />
    </div>
  )
}
