import { useState, type ReactNode } from 'react'
import { verifyPassword } from '../utils/auth'
import { AuthContext } from './AuthContext-context'

const SESSION_KEY = 'zsb-auth'
const LOCK_KEY = 'zsb-lock'
const MAX_TRIES = 5
const LOCK_MS = 5 * 60 * 1000



export function AuthProvider({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1')
  const [tries, setTries] = useState(0)
  const [lockedUntil, setLockedUntil] = useState(() => {
    const l = Number(localStorage.getItem(LOCK_KEY) ?? 0)
    return l > Date.now() ? l : 0
  })

  const login = async (pw: string) => {
    if (lockedUntil > Date.now()) return false

    const ok = await verifyPassword(pw)
    if (ok) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setAuthed(true)
      setTries(0)
      localStorage.removeItem(LOCK_KEY)
      return true
    }

    const n = tries + 1
    setTries(n)
    if (n >= MAX_TRIES) {
      const until = Date.now() + LOCK_MS
      localStorage.setItem(LOCK_KEY, String(until))
      setLockedUntil(until)
      setTries(0)
    }
    return false
  }

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setAuthed(false)
  }

  return (
    <AuthContext.Provider value={{ authed, tries, lockedUntil, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
