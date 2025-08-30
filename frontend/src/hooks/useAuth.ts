import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContextObject'
import type { AuthContextType } from '@/context/AuthTypes'

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
