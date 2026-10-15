import { MessagesSquare, Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { AppBar } from '../components/AppBar'
import { Avatar } from '../components/Avatar'
import { BottomNav } from '../components/BottomNav'
import { Button } from '../components/Button'
import { useApp } from '../context/AppContext'

export function MessagesScreen() {
  const navigate = useNavigate()
  const { conversations, showToast } = useApp()

  const hasUnread = conversations.some((conversation) => conversation.unread)

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <AppBar
        title="Messages"
        action={{
          icon: <Search className="h-5 w-5" aria-hidden="true" />,
          label: 'Search messages',
          onClick: () => showToast('Message search is not available in this prototype.'),
        }}
      />

      <main className="flex-1 overflow-y-auto bg-page">
        <div className="mx-auto w-full max-w-2xl px-4 py-4">
          {conversations.length === 0 ? (
            <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
              <MessagesSquare className="h-8 w-8 text-muted" aria-hidden="true" />
              <p className="text-base font-bold text-ink">No conversations yet</p>
              <p className="text-sm text-muted">
                Apply to a project, then message the client to start a conversation.
              </p>
              <Button variant="secondary" onClick={() => navigate('/browse')}>
                Browse projects
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-white shadow-sm">
              {conversations.map((conversation) => {
                const lastMessage = conversation.messages[conversation.messages.length - 1]
                return (
                  <li key={conversation.id}>
                    <Link
                      to={`/messages/${conversation.id}`}
                      className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-page"
                    >
                      <Avatar initials={conversation.initials} />
                      <div className="min-w-0 flex-1">
                        <p
                          className={
                            conversation.unread
                              ? 'truncate text-sm font-bold text-ink'
                              : 'truncate text-sm font-semibold text-ink'
                          }
                        >
                          {conversation.clientName}
                        </p>
                        <p className="truncate text-sm text-muted">
                          {lastMessage ? lastMessage.text : 'No messages yet — say hello!'}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1.5">
                        <span className="text-xs text-muted">{lastMessage?.time ?? ''}</span>
                        {conversation.unread ? (
                          <span
                            className="h-2.5 w-2.5 rounded-full bg-primary"
                            aria-hidden="true"
                          />
                        ) : (
                          <span className="h-2.5 w-2.5" aria-hidden="true" />
                        )}
                      </div>
                      {conversation.unread ? <span className="sr-only">Unread</span> : null}
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </main>

      <BottomNav unreadMessages={hasUnread} />
    </div>
  )
}
