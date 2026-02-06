import { createBrowserRouter, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuthContext } from './hooks/AuthContext'
import CrudPage from './pages/CrudPage'

function LoginWrapper() {
  const { isAuthenticated } = useAuthContext()
  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }
  return <Login />
}

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginWrapper />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/crud',
    element: (
      <ProtectedRoute>
        <CrudPage />
      </ProtectedRoute>
    ),
  },
])
