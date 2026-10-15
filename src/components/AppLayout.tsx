import { Outlet } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Toast } from './Toast'

export function AppLayout() {
  const { toast, clearToast } = useApp()

  return (
    <div className="flex h-svh justify-center bg-page">
      <div className="relative flex h-full w-full max-w-app flex-col overflow-hidden border-x border-line bg-page">
        <Outlet />
        {toast ? <Toast message={toast} onDismiss={clearToast} /> : null}
      </div>
    </div>
  )
}
