import { type ReactNode, useState, useEffect } from 'react'
import api from '@/api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants'
import { isTokenExpired } from '@/utils/auth'
import { AuthContext } from './AuthContextObject'
import type { AuthContextType } from './AuthTypes'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    if (!token) return setIsAuthorized(false)

    if (isTokenExpired(token)) {
      await refreshToken()
    } else {
      setIsAuthorized(true)
    }
  }

  const refreshToken = async () => {
    const refresh = localStorage.getItem(REFRESH_TOKEN)
    if (!refresh) return setIsAuthorized(false)

    try {
      const res = await api.post('/api/token/refresh/', { refresh })
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access)
        setIsAuthorized(true)
      } else {
        setIsAuthorized(false)
      }
    } catch {
      setIsAuthorized(false)
    }
  }

  const logout = () => {
    localStorage.clear()
    setIsAuthorized(false)
  }

  const contextValue: AuthContextType = { isAuthorized, logout, refreshToken }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
