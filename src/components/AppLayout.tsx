import { Outlet, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { DesktopNav } from './DesktopNav'
import { Toast } from './Toast'

export function AppLayout() {
  const { toast, clearToast, conversations } = useApp()
  const { pathname } = useLocation()

  const hasUnread = conversations.some((conversation) => conversation.unread)
  const showDesktopNav = pathname !== '/login' && !pathname.startsWith('/project/')

  return (
    <div className="relative flex h-svh flex-col overflow-hidden bg-page">
      {showDesktopNav ? <DesktopNav unreadMessages={hasUnread} /> : null}
      <Outlet />
      {toast ? <Toast message={toast} onDismiss={clearToast} /> : null}
    </div>
  )
}
