import { type ReactNode } from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'

interface ProtectedRouteProps {
  children: ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthorized } = useAuth()

  if (isAuthorized === null) {
    return <div>Loading...</div>
  }

  return isAuthorized ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute
