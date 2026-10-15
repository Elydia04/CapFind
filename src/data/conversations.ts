import type { Conversation } from '../types'

export const initialConversations: Conversation[] = [
  {
    id: 'green-cart-co',
    clientName: 'Green Cart Co.',
    initials: 'GC',
    unread: true,
    messages: [
      {
        id: 'gc-1',
        from: 'them',
        text: 'Hi! Thanks for checking out our inventory project.',
        time: 'Mon 9:12 AM',
      },
      {
        id: 'gc-2',
        from: 'me',
        text: "Hi! I'd love to help. Is the project still open?",
        time: 'Mon 10:04 AM',
      },
      {
        id: 'gc-3',
        from: 'them',
        text: 'Yes, still open. Are you free for a short call this week?',
        time: 'Mon 10:15 AM',
      },
    ],
  },
  {
    id: 'bright-futures-org',
    clientName: 'Bright Futures Org',
    initials: 'BF',
    unread: false,
    messages: [
      {
        id: 'bf-1',
        from: 'me',
        text: "Hello! I'm interested in the volunteer scheduling app.",
        time: 'Tue 2:20 PM',
      },
      {
        id: 'bf-2',
        from: 'them',
        text: "Great, thanks for reaching out! We'd love to hear your ideas.",
        time: 'Tue 3:05 PM',
      },
    ],
  },
]
