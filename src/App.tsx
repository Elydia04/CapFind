import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { ApplicationsScreen } from './screens/ApplicationsScreen'
import { BrowseScreen } from './screens/BrowseScreen'
import { LoginScreen } from './screens/LoginScreen'
import { MessagesScreen } from './screens/MessagesScreen'
import { MessageThreadScreen } from './screens/MessageThreadScreen'
import { NotFoundScreen } from './screens/NotFoundScreen'
import { ProfileScreen } from './screens/ProfileScreen'
import { ProjectDetailScreen } from './screens/ProjectDetailScreen'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/browse" element={<BrowseScreen />} />
        <Route path="/project/:id" element={<ProjectDetailScreen />} />
        <Route path="/messages" element={<MessagesScreen />} />
        <Route path="/messages/:id" element={<MessageThreadScreen />} />
        <Route path="/applications" element={<ApplicationsScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
