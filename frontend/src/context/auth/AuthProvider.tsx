import { type ReactNode, useState, useEffect } from 'react'
import { AuthContext } from './AuthContextObject'
import type { AuthContextType } from './AuthTypes'
import type { ProfileData } from '@/shared/types'
import { supabase } from '@/supabase-client'
import { useToast } from '@/hooks/useToast'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)
  const [loggedUser, setLoggedUser] = useState<ProfileData | null>(null)
  const { showMessage } = useToast()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const token = (await supabase.auth.getSession()).data.session?.access_token
    if (!token) return setIsAuthorized(false)
    setIsAuthorized(true)
  }

  const updateAccount = async (updatedProfile: ProfileData) => {
    const { error } = await supabase
      .from('users')
      .update(updatedProfile)
      .eq('id', updatedProfile.id)
    if (error) {
      console.log('Error updating account:', error.message)
      return false
    } else {
      setLoggedUser(updatedProfile)
      setLocalStorageUserProfileFromSession(updatedProfile)
      console.log('Account updated successfully')
      return true
    }
  }

  const setLocalStorageUserProfileFromSession = (profile: ProfileData) => {
    if (!profile) return
    localStorage.setItem('userProfile', JSON.stringify(profile))
  }

  // Can only call this if a session is active (i.e., user is logged in) meaning:
  // we dont need to call another auth check here - we can assume user is logged in
  const getCurrentProfile = async () => {
    const session = (await supabase.auth.getSession()).data.session
    if (session) {
      const userId = session.user.id
      try {
        const res = await supabase.from('users').select('*').eq('id', userId).single()
        if (!res.data) {
          setIsAuthorized(false)
          return false
        }
        setLocalStorageUserProfileFromSession(res.data)
        setLoggedUser(res.data as ProfileData)
        return true
      } catch (err) {
        console.log('Get current profile failed: ' + err)
      }
    }
    return false
  }

  const deleteAccount = async (id: number) => {
    const { error } = await supabase.from('users').delete().eq('id', id)
    if (error) {
      console.log('Error deleting account:', error.message)
      return false
    } else {
      logout()
      console.log('Account deleted successfully')
      return true
    }
  }

  const register = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({ email, password })
      const session = data.session || (await supabase.auth.getSession()).data.session

      if (signUpError || !data.user || !session) {
        showMessage({ type: 'error', text: signUpError?.message || 'Signup/data/session failed.' })
        setIsAuthorized(false)
        return false
      }

      const { error: dbError } = await supabase.from('users').insert([{ id: data.user.id, email }])

      if (dbError) {
        showMessage({ type: 'error', text: dbError.message })
        setIsAuthorized(false)
        return false
      }

      setIsAuthorized(true)
      return true
    } catch (err) {
      showMessage({ type: 'error', text: `Registration failed. ${err}` })
      setIsAuthorized(false)
      return false
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    const { error: signUpError, data } = await supabase.auth.signInWithPassword({ email, password })
    if (signUpError) {
      console.log('Login error: ' + signUpError.message)
      setIsAuthorized(false)
      return false
    }

    const userResponse = await supabase.from('users').select('*').eq('id', data.user.id).single()
    console.log('Login data: ', data)
    if (userResponse.error || !userResponse.data) {
      setIsAuthorized(false)
      return false
    }
    setLoggedUser(userResponse.data as ProfileData)
    setIsAuthorized(true)
    return true
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
    updateAccount,
    deleteAccount,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
