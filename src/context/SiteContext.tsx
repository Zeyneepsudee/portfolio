import { useEffect, useState, type ReactNode } from 'react'
import type { SiteData, ProfileData, ContactMethod } from '../interfaces'
import { SiteContext } from './SiteContext-context'
import { seedSite } from '../data/seedSite'
import { readItem, writeItem } from '../utils/storage'

const KEY = 'site'



export function SiteProvider({ children }: { children: ReactNode }) {
  const [site, setSite] = useState<SiteData>(() => readItem(KEY, seedSite))

  useEffect(() => { writeItem(KEY, site) }, [site])

  const updateProfile = (data: Partial<ProfileData>) => {
    setSite((prev) => ({ ...prev, profile: { ...prev.profile, ...data } }))
  }

  const addContact = (data: Omit<ContactMethod, 'id'>) => {
    setSite((prev) => ({
      ...prev,
      contacts: [...prev.contacts, { ...data, id: crypto.randomUUID() }]
    }))
  }

  const updateContact = (id: string, data: Partial<ContactMethod>) => {
    setSite((prev) => ({
      ...prev,
      contacts: prev.contacts.map((c) => (c.id === id ? { ...c, ...data } : c))
    }))
  }

  const deleteContact = (id: string) => {
    setSite((prev) => ({
      ...prev,
      contacts: prev.contacts.filter((c) => c.id !== id)
    }))
  }

  const resetSite = () => setSite(seedSite)

  return (
    <SiteContext.Provider value={{
      profile: site.profile,
      contacts: site.contacts,
      updateProfile,
      addContact,
      updateContact,
      deleteContact,
      resetSite
    }}>
      {children}
    </SiteContext.Provider>
  )
}
