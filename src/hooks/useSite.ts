import { useContext } from 'react'
import { SiteContext, type SiteContextValue } from '../context/SiteContext-context'

export function useSite(): SiteContextValue {
  const context = useContext(SiteContext)
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider')
  }
  return context
}
