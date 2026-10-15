import { Outlet } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Toast } from './Toast'

export function AppLayout() {
  const { toast, clearToast } = useApp()

  return (
    <div className="relative flex h-svh flex-col overflow-hidden bg-page">
      <Outlet />
      {toast ? <Toast message={toast} onDismiss={clearToast} /> : null}
    </div>
  )
}
