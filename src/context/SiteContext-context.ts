import { createContext } from 'react'
import type { ProfileData, ContactMethod } from '../interfaces'

export type SiteContextValue = {
  profile: ProfileData
  contacts: ContactMethod[]
  updateProfile: (data: Partial<ProfileData>) => void
  addContact: (data: Omit<ContactMethod, 'id'>) => void
  updateContact: (id: string, data: Partial<ContactMethod>) => void
  deleteContact: (id: string) => void
  resetSite: () => void
}

export const SiteContext = createContext<SiteContextValue | null>(null)
