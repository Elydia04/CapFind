import { MessagesSquare, Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppBar } from '../components/AppBar'
import { Button } from '../components/Button'
import { MessageBubble } from '../components/MessageBubble'
import { useApp } from '../context/AppContext'

export function MessageThreadScreen() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { conversations, sendMessage, markConversationRead } = useApp()

  const [draft, setDraft] = useState('')
  const scrollRef = useRef<HTMLElement>(null)

  const conversation = conversations.find((item) => item.id === id)
  const messageCount = conversation?.messages.length ?? 0

  useEffect(() => {
    if (id) {
      markConversationRead(id)
    }
  }, [id, markConversationRead])

  useEffect(() => {
    const element = scrollRef.current
    if (element) {
      element.scrollTop = element.scrollHeight
    }
  }, [messageCount])

  const handleSend = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = draft.trim()
    if (text === '' || !id) {
      return
    }
    sendMessage(id, text)
    setDraft('')
  }

  if (!conversation) {
    return (
      <div className="flex flex-1 flex-col overflow-hidden">
        <AppBar title="Messages" showBack onBack={() => navigate('/messages')} />
        <main className="flex flex-1 flex-col items-center justify-center gap-3 bg-page px-6 text-center">
          <MessagesSquare className="h-8 w-8 text-muted" aria-hidden="true" />
          <p className="text-base font-bold text-ink">Conversation not found</p>
          <p className="text-sm text-muted">This conversation is not available.</p>
          <Button variant="secondary" onClick={() => navigate('/messages')}>
            Back to Messages
          </Button>
        </main>
      </div>
    )
  }

  const isSendDisabled = draft.trim() === ''

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <AppBar title={conversation.clientName} showBack onBack={() => navigate('/messages')} />

      <main ref={scrollRef} className="flex-1 overflow-y-auto bg-page">
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-3 px-4 py-4">
          {conversation.messages.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted">
              No messages yet. Say hello to {conversation.clientName}.
            </p>
          ) : (
            conversation.messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                senderName={conversation.clientName}
              />
            ))
          )}
        </div>
      </main>

      <form onSubmit={handleSend} className="shrink-0 border-t border-line bg-white px-4 py-3">
        <div className="mx-auto flex w-full max-w-2xl items-center gap-2">
          <label htmlFor="message-input" className="sr-only">
            Message {conversation.clientName}
          </label>
          <input
            id="message-input"
            type="text"
            autoComplete="off"
            placeholder="Write a message"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            className="min-h-11 w-full flex-1 rounded-lg border border-line bg-white px-3 text-sm text-ink placeholder:text-muted"
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={isSendDisabled}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-line disabled:text-muted"
          >
            <Send className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </form>
    </div>
  )
}
