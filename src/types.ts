// Shared types for Capstone Client Finder (high-fidelity wireframe only)

export type ProjectStatus = 'open' | 'closing'

export type ProjectCategory =
  | 'Web App'
  | 'Mobile App'
  | 'Non-profit'
  | 'Retail'
  | 'Education'

export type Project = {
  id: string
  clientName: string
  clientInitials: string
  title: string
  summary: string
  description: string
  tags: string[]
  category: ProjectCategory
  status: ProjectStatus
  timeline: string
  deadline: string
}

export type MessageAuthor = 'me' | 'them'

export type Message = {
  id: string
  from: MessageAuthor
  text: string
  time: string
}

export type Conversation = {
  id: string
  clientName: string
  initials: string
  messages: Message[]
  unread: boolean
}
