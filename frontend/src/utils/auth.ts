// utils/auth.ts
import { jwtDecode } from 'jwt-decode'

export function isTokenExpired(token: string): boolean {
  try {
    const { exp } = jwtDecode<{ exp: number }>(token)
    return !exp || exp < Date.now() / 1000
  } catch {
    return true
  }
}
