import { useEffect, useState, type ReactNode } from 'react'
import type { Project, ProjectFormData } from '../interfaces'
import { ProjectContext } from './ProjectContext-context'
import { seedProjects } from '../data/seedProjects'
import { readItem, writeItem } from '../utils/storage'

const KEY = 'projects'



export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(() => readItem(KEY, seedProjects))

  useEffect(() => { writeItem(KEY, projects) }, [projects])

  const addProject = (data: ProjectFormData) => {
    setProjects((prev) => [{ ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() }, ...prev])
  }

  const updateProject = (id: string, data: ProjectFormData) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)))
  }

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  const resetProjects = () => setProjects(seedProjects)

  return (
    <ProjectContext.Provider value={{ projects, addProject, updateProject, deleteProject, resetProjects }}>
      {children}
    </ProjectContext.Provider>
  )
}
