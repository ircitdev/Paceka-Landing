import { Scene } from './components/3d/Scene'
import { Hero } from './components/sections/Hero'
import { Features } from './components/sections/Features'
import { HowItWorks } from './components/sections/HowItWorks'
import { Pricing } from './components/sections/Pricing'
import { OrderForm } from './components/sections/OrderForm'
import { Footer } from './components/sections/Footer'
import { Preloader } from './components/ui/Preloader'
import { useScrollProgress } from './hooks/useScrollProgress'
import { useEffect, useState } from 'react'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  // Initialize scroll tracking
  useScrollProgress()

  const handleLoadComplete = () => {
    setIsLoading(false)
    setTimeout(() => {
      setShowContent(true)
    }, 100)
  }

  // Snap scrolling setup
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      html {
        scroll-snap-type: y proximity;
        scroll-behavior: smooth;
      }
      .snap-section {
        scroll-snap-align: start;
        scroll-snap-stop: normal;
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <>
      {/* Preloader */}
      {isLoading && <Preloader onComplete={handleLoadComplete} />}

      {/* Main Content */}
      {showContent && (
        <div className="relative bg-transparent">
          {/* Desktop Layout: 3D Scene on the right */}
          <div className="hidden lg:block fixed right-0 top-0 w-1/2 h-screen z-0">
            <Scene />
          </div>

          {/* Mobile Layout: 3D Scene as background */}
          <div className="lg:hidden fixed inset-0 z-0">
            <Scene />
          </div>

          {/* Content - left side on desktop, full width on mobile */}
          <div className="relative z-10 bg-transparent">
            <div className="lg:w-1/2 bg-transparent">
              <Hero />
              <Features />
              <HowItWorks />
            </div>
            {/* Pricing - full width */}
            <Pricing />
            <div className="lg:w-1/2 bg-transparent">
              <OrderForm />
            </div>
            {/* Footer - full width */}
            <Footer />
          </div>
        </div>
      )}
    </>
  )
}

export default App
