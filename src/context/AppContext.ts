import { createContext, useContext } from 'react'
import type { Conversation } from '../types'

export type AppContextValue = {
  userName: string | null
  appliedProjectIds: string[]
  conversations: Conversation[]
  toast: string | null
  login: (name: string) => void
  logout: () => void
  applyToProject: (id: string) => void
  sendMessage: (conversationId: string, text: string) => void
  markConversationRead: (id: string) => void
  showToast: (message: string) => void
  clearToast: () => void
}

export const AppContext = createContext<AppContextValue | null>(null)

export function useApp(): AppContextValue {
  const context = useContext(AppContext)
  if (context === null) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
