export interface AuthContextType {
  isAuthorized: boolean | null
  logout: () => void
  refreshToken: () => Promise<void>
}
