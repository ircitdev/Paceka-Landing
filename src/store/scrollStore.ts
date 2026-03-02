import { create } from 'zustand'

interface ScrollStore {
  scrollProgress: number // 0 to 1
  setScrollProgress: (progress: number) => void
}

export const useScrollStore = create<ScrollStore>((set) => ({
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
}))
