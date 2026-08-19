export type ProjectCategory = 'web' | 'mobile' | 'ml' | 'other'

export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  category: ProjectCategory
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  createdAt: string
}

export type ProjectFormData = Omit<Project, 'id' | 'createdAt'>

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  web: 'Web',
  mobile: 'Mobil',
  ml: 'Makine Öğrenmesi',
  other: 'Diğer',
}
