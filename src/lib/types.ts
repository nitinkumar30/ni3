export interface Meta {
  title: string
  description: string
  author: string
  siteUrl: string
  language: string
  keywords: string[]
  favicon: string
}

export interface PersonalInfo {
  name: string
  title: string
  headline: string
  current_role: string
  current_company: string
  current_location: string
  profile_image: string
  resume_url: string
  email: string
  phone: string
  linkedin: string
  github: string
  twitter: string
  instagram: string
  blog: string
  hackerrank: string
  stackoverflow: string
  whatsapp: string
  holopin: string
  devto: string
  pypi: string
}

export interface About {
  summary: string
  roles: string[]
  interests: string[]
  available_for: string[]
}

export interface Statistics {
  experience: string
  projects: string
  certifications: string
  tools: string
  ai_tools: string
  languages: string
  publications: string
  github_repos: string
  github_stars: string
}

export interface Skill {
  name: string
  proficiency: number
  category: string
}

export interface Education {
  degree: string
  institution: string
  duration?: string
  year?: string
  description: string
  highlights: string[]
}

export interface WorkExperience {
  position: string
  company: string
  duration: string
  type: string
  location: string
  highlights: string[]
}

export interface Certification {
  name: string
  issuer: string
  year: string
  credential_id?: string
}

export interface Recommendation {
  name: string
  role: string
  date: string
  relationship: string
  text: string
}

export interface Recommendations {
  received_count: number
  given_count: number
  pending_count: number
  list: Recommendation[]
}

export interface Honor {
  title: string
  description: string
  issuer: string
  year: string
}

export interface Publication {
  title: string
  description: string
  type: string
  url: string
}

export interface FeaturedProject {
  name: string
  description: string
  stars: number
  language: string
  url: string
  category: string
  topics: string[]
}

export interface Project {
  name: string
  description: string
  category: string
  technologies: string[]
}

export interface Testimonial {
  name: string
  designation: string
  testimonial: string
  rating: number
}

export interface AiTool {
  name: string
  category: string
  description: string
}

export interface AutomationTool {
  name: string
  category: string
  icon: string
}

export interface NavigationItem {
  id: string
  label: string
  icon: string
}

export interface PortfolioData {
  meta: Meta
  personal_info: PersonalInfo
  about: About
  statistics: Statistics
  skills: Skill[]
  tech_stack_nodes: string[]
  education: Education[]
  work_experience: WorkExperience[]
  certifications: Certification[]
  honors: Honor[]
  publications: Publication[]
  featured_projects: FeaturedProject[]
  projects: Project[]
  testimonials: Testimonial[]
  recommendations: Recommendations
  ai_tools: AiTool[]
  automation_tools: AutomationTool[]
  navigation: NavigationItem[]
}
