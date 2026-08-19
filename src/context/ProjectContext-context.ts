import { createContext } from 'react'
import type { Project, ProjectFormData } from '../interfaces'

export type ProjectContextValue = {
  projects: Project[]
  addProject: (data: ProjectFormData) => void
  updateProject: (id: string, data: ProjectFormData) => void
  deleteProject: (id: string) => void
  resetProjects: () => void
}

export const ProjectContext = createContext<ProjectContextValue | null>(null)
