import { useContext } from 'react'
import { AuthContext } from '@/context/auth/AuthContextObject'
import type { AuthContextType } from '@/context/auth/AuthTypes'

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
