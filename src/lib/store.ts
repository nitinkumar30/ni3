import { create } from "zustand"

export type Theme = "blue" | "cyber" | "ai" | "data" | "minimal"

interface AppState {
  activeSection: string
  setActiveSection: (section: string) => void
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  cyberMode: boolean
  toggleCyberMode: () => void
  cursorPos: { x: number; y: number }
  setCursorPos: (pos: { x: number; y: number }) => void
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useAppStore = create<AppState>((set) => ({
  activeSection: "hero",
  setActiveSection: (section) => set({ activeSection: section }),
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  cyberMode: false,
  toggleCyberMode: () => set((s) => ({ cyberMode: !s.cyberMode })),
  cursorPos: { x: 0, y: 0 },
  setCursorPos: (pos) => set({ cursorPos: pos }),
  theme: "blue",
  setTheme: (theme) => set({ theme }),
}))
