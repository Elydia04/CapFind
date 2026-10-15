import type { Message } from '../types'

export type MessageBubbleProps = {
  message: Message
  senderName: string
}

export function MessageBubble({ message, senderName }: MessageBubbleProps) {
  const isMe = message.from === 'me'

  return (
    <div className={isMe ? 'flex flex-col items-end' : 'flex flex-col items-start'}>
      <p
        className={[
          'max-w-[80%] rounded-2xl px-3 py-2 text-sm',
          isMe
            ? 'rounded-br-sm bg-primary text-white'
            : 'rounded-bl-sm bg-line text-ink',
        ].join(' ')}
      >
        <span className="sr-only">{isMe ? 'You said: ' : `${senderName} said: `}</span>
        {message.text}
      </p>
      <span className="mt-1 px-1 text-xs text-muted">{message.time}</span>
    </div>
  )
}
