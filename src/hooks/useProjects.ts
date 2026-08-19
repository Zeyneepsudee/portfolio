import { useContext } from 'react'
import { ProjectContext } from '../context/ProjectContext-context'

export function useProjects() {
  const ctx = useContext(ProjectContext)
  if (!ctx) throw new Error('useProjects, ProjectProvider içinde kullanılmalı')
  return ctx
}
