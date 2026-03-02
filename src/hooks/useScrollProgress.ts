import { useEffect } from 'react'
import { useScrollStore } from '@/store/scrollStore'

export const useScrollProgress = () => {
  const { scrollProgress, setScrollProgress } = useScrollStore()

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY

      // Calculate progress from 0 to 1
      const maxScroll = docHeight - windowHeight
      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0

      setScrollProgress(Math.min(Math.max(progress, 0), 1))
    }

    // Initial calculation
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setScrollProgress])

  return scrollProgress
}
