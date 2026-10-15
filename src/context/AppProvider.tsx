import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { initialConversations } from '../data/conversations'
import type { Conversation } from '../types'
import { AppContext } from './AppContext'
import type { AppContextValue } from './AppContext'

export type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [userName, setUserName] = useState<string | null>(null)
  const [appliedProjectIds, setAppliedProjectIds] = useState<string[]>([])
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations)
  const [toast, setToast] = useState<string | null>(null)

  const login = useCallback((name: string) => {
    setUserName(name)
  }, [])

  const logout = useCallback(() => {
    setUserName(null)
  }, [])

  const applyToProject = useCallback((id: string) => {
    setAppliedProjectIds((previous) =>
      previous.includes(id) ? previous : [...previous, id],
    )
  }, [])

  const sendMessage = useCallback((conversationId: string, text: string) => {
    setConversations((previous) =>
      previous.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              unread: false,
              messages: [
                ...conversation.messages,
                {
                  id: crypto.randomUUID(),
                  from: 'me',
                  text,
                  time: new Date().toLocaleTimeString([], {
                    hour: 'numeric',
                    minute: '2-digit',
                  }),
                },
              ],
            }
          : conversation,
      ),
    )
  }, [])

  const markConversationRead = useCallback((id: string) => {
    setConversations((previous) =>
      previous.map((conversation) =>
        conversation.id === id ? { ...conversation, unread: false } : conversation,
      ),
    )
  }, [])

  const showToast = useCallback((message: string) => {
    setToast(message)
  }, [])

  const clearToast = useCallback(() => {
    setToast(null)
  }, [])

  const value = useMemo<AppContextValue>(
    () => ({
      userName,
      appliedProjectIds,
      conversations,
      toast,
      login,
      logout,
      applyToProject,
      sendMessage,
      markConversationRead,
      showToast,
      clearToast,
    }),
    [
      userName,
      appliedProjectIds,
      conversations,
      toast,
      login,
      logout,
      applyToProject,
      sendMessage,
      markConversationRead,
      showToast,
      clearToast,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
