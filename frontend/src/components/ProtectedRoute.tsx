import { type ReactNode } from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'

interface ProtectedRouteProps {
  children: ReactNode
  inverse?: boolean
}

function ProtectedRoute({ children, inverse = false }: ProtectedRouteProps) {
  const { isAuthorized } = useAuth()

  if (isAuthorized === null) {
    return <div>Loading...</div>
  }

  if (inverse) {
    return !isAuthorized ? children : <Navigate to="/activities" replace />
  }

  return isAuthorized ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute
