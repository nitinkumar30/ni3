import portfolioData from "../../data/portfolio.json"
import type {
  PortfolioData,
  PersonalInfo,
  About,
  Skill,
  WorkExperience,
  Education,
  Certification,
  Honor,
  Publication,
  Project,
  Testimonial,
  AiTool,
  AutomationTool,
  NavigationItem,
  Statistics,
  Meta,
} from "./types"

export type {
  PortfolioData,
  PersonalInfo,
  About,
  Skill,
  WorkExperience,
  Education,
  Certification,
  Honor,
  Publication,
  Project,
  Testimonial,
  AiTool,
  AutomationTool,
  NavigationItem,
  Statistics,
  Meta,
}

export const data = portfolioData as unknown as PortfolioData
