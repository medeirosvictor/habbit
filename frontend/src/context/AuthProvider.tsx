import { type ReactNode, useState, useEffect } from 'react'
import { AuthContext } from './AuthContextObject'
import type { AuthContextType } from './AuthTypes'
import type { ProfileData, RegisterResult, LoginResult } from '@/shared/types'
import { supabase } from '@/supabase-client'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const [loggedUser, setLoggedUser] = useState<ProfileData>({} as ProfileData)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = (await supabase.auth.getSession()).data.session?.access_token
    if (!token) return setIsAuthorized(false)
    setIsAuthorized(true)
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

  const register = async (email: string, password: string): Promise<RegisterResult> => {
    try {
      const { error: signUpError, data } = await supabase.auth.signUp({ email, password })
      if (signUpError) {
        setIsAuthorized(false)
        return { error: signUpError, data: null }
      }
      setIsAuthorized(true)
      return { error: null, data }
    } catch (err) {
      setIsAuthorized(false)
      if (err instanceof Error) {
        return { error: err, data: null }
      }
      return { error: new Error(String(err)), data: null }
    }
  }

  const login = async (email: string, password: string): Promise<LoginResult> => {
    const { error: signUpError, data } = await supabase.auth.signInWithPassword({ email, password })
    if (signUpError) {
      console.log('Login error: ' + signUpError.message)
      setIsAuthorized(false)
      return { error: signUpError, data: null }
    }
    setIsAuthorized(true)
    return { error: null, data }
  }

  const logout = () => {
    supabase.auth.signOut().catch((err) => console.log('Logout error: ' + err.message))
    localStorage.clear()
    setLoggedUser({} as ProfileData)
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
    login,
    register,
    loggedUser,
    getUserProfile,
    getCurrentProfile,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
