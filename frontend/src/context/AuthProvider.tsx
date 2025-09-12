import { type ReactNode, useState, useEffect } from 'react'
import api from '@/api'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constants'
import { isTokenExpired } from '@/utils/auth'
import { AuthContext } from './AuthContextObject'
import type { AuthContextType } from './AuthTypes'
import type { ProfileData } from '@/shared/types'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const [loggedUser, setLoggedUser] = useState<ProfileData>({} as ProfileData)

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

  const getCurrentProfile = async (accessToken: string) => {
    try {
      const res = await api.get('/api/profile/me/', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      setLoggedUser(res.data)
    } catch (err) {
      console.log('Get current profile failed: ' + err)
      localStorage.clear()
    }
  }

  const login = async (access: string, refresh: string) => {
    localStorage.setItem(ACCESS_TOKEN, access)
    localStorage.setItem(REFRESH_TOKEN, refresh)
    try {
      getCurrentProfile(access)
      setIsAuthorized(true)
    } catch (err) {
      console.log('Login failed: ' + err)
      setIsAuthorized(false)
      localStorage.clear()
    }
  }

  const logout = () => {
    localStorage.clear()
    setIsAuthorized(false)
  }

  const getUserProfile = async (id: number) => {
    try {
      const res = await api.get(`profile/${id}`)
      return res.data
    } catch (err) {
      console.log(err)
      return null
    }
  }

  const contextValue: AuthContextType = {
    isAuthorized,
    logout,
    refreshToken,
    login,
    loggedUser,
    getUserProfile,
    getCurrentProfile,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
