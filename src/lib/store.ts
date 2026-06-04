import { create } from "zustand"

interface AppState {
  activeSection: string
  setActiveSection: (section: string) => void
  cyberMode: boolean
  toggleCyberMode: () => void
  cursorPos: { x: number; y: number }
  setCursorPos: (pos: { x: number; y: number }) => void
}

export const useAppStore = create<AppState>((set) => ({
  activeSection: "hero",
  setActiveSection: (section) => set({ activeSection: section }),
  cyberMode: false,
  toggleCyberMode: () => set((s) => ({ cyberMode: !s.cyberMode })),
  cursorPos: { x: 0, y: 0 },
  setCursorPos: (pos) => set({ cursorPos: pos }),
}))
