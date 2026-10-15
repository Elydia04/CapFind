import { Outlet } from 'react-router-dom'
import { PhoneFrame } from './PhoneFrame'

export function AppLayout() {
  return (
    <PhoneFrame>
      <Outlet />
    </PhoneFrame>
  )
}
