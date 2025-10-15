import type { ProfileData, RegisterResult, LoginResult } from '@/shared/types'

export interface AuthContextType {
  isAuthorized: boolean | null
  logout: () => void
  login: (access: string, refresh: string) => Promise<LoginResult>
  register: (email: string, password: string) => Promise<RegisterResult>
  getUserProfile: (id: number) => Promise<ProfileData | null>
  loggedUser: ProfileData | null
  getCurrentProfile: () => boolean
  updateAccount: (data: Partial<ProfileData>) => Promise<boolean>
  deleteAccount: (id: number) => void
}
