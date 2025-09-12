import type { ProfileData } from '@/shared/types'

export interface AuthContextType {
  isAuthorized: boolean | null
  logout: () => void
  refreshToken: () => Promise<void>
  login: (access: string, refresh: string) => void
  getUserProfile: (id: number) => Promise<ProfileData | null>
  loggedUser: ProfileData | null
  getCurrentProfile: (accessToken: string) => void
}
