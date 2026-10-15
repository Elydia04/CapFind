import { Battery, Signal } from 'lucide-react'
import type { ReactNode } from 'react'

export type PhoneFrameProps = {
  children: ReactNode
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="min-h-svh bg-page">
      <div className="mx-auto flex min-h-svh justify-center md:items-center md:p-4">
        <div className="relative flex h-svh w-full flex-col overflow-hidden bg-white md:h-[800px] md:w-[390px] md:rounded-[48px] md:border-[12px] md:border-frame md:shadow-lg">
          <div className="hidden items-center justify-between px-4 py-2 text-xs font-medium text-white md:flex">
            <span className="pl-2">9:41</span>
            <div className="flex items-center gap-2 pr-2">
              <Signal className="h-3.5 w-3.5" aria-hidden="true" />
              <Battery className="h-3.5 w-3.5" aria-hidden="true" />
            </div>
          </div>
          <div className="flex flex-1 flex-col overflow-hidden">{children}</div>
        </div>
      </div>
    </div>
  )
}
