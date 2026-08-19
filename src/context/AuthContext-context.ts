import { createContext } from 'react'

export type AuthContextValue = {
  authed: boolean
  tries: number
  lockedUntil: number
  login: (pw: string) => Promise<boolean>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
