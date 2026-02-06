import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/AuthContext'
import type { JSX } from 'react/jsx-dev-runtime'

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element
}) {
  const { isAuthenticated } = useAuthContext()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}
