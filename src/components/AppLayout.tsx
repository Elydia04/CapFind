import { Outlet } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { PhoneFrame } from './PhoneFrame'
import { Toast } from './Toast'

export function AppLayout() {
  const { toast, clearToast } = useApp()

  return (
    <PhoneFrame>
      <Outlet />
      {toast ? <Toast message={toast} onDismiss={clearToast} /> : null}
    </PhoneFrame>
  )
}
