import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsComplete(true)
            setTimeout(onComplete, 800) // Delay for exit animation
          }, 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50"
        >
          <div className="relative flex flex-col items-center gap-8">
            {/* Animated Bee */}
            <motion.div
              animate={{
                x: [0, 30, -30, 0],
                y: [0, -20, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative"
            >
              {/* Bee Body */}
              <div className="relative w-20 h-20">
                {/* Wings */}
                <motion.div
                  animate={{ rotateZ: [0, -20, 0] }}
                  transition={{ duration: 0.1, repeat: Infinity }}
                  className="absolute -top-2 left-2 w-12 h-8 bg-white/40 rounded-full blur-sm"
                  style={{ transformOrigin: 'bottom center' }}
                />
                <motion.div
                  animate={{ rotateZ: [0, 20, 0] }}
                  transition={{ duration: 0.1, repeat: Infinity }}
                  className="absolute -top-2 right-2 w-12 h-8 bg-white/40 rounded-full blur-sm"
                  style={{ transformOrigin: 'bottom center' }}
                />

                {/* Body */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Head */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-black rounded-full">
                    {/* Eyes */}
                    <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full" />
                    <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full" />
                    {/* Antennae */}
                    <div className="absolute -top-2 left-1 w-0.5 h-3 bg-black rounded-full -rotate-45" />
                    <div className="absolute -top-2 right-1 w-0.5 h-3 bg-black rounded-full rotate-45" />
                  </div>

                  {/* Thorax */}
                  <div className="w-8 h-10 bg-gradient-to-b from-yellow-400 to-amber-500 rounded-full" />

                  {/* Abdomen - Striped */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 space-y-1">
                    <div className="w-10 h-3 bg-black rounded-full" />
                    <div className="w-10 h-3 bg-yellow-400 rounded-full" />
                    <div className="w-9 h-3 bg-black rounded-full" />
                    <div className="w-8 h-3 bg-yellow-400 rounded-full" />
                  </div>

                  {/* Legs */}
                  <div className="absolute bottom-2 -left-2 w-6 h-0.5 bg-black rounded-full rotate-45" />
                  <div className="absolute bottom-2 -right-2 w-6 h-0.5 bg-black rounded-full -rotate-45" />
                  <div className="absolute bottom-0 -left-3 w-6 h-0.5 bg-black rounded-full rotate-60" />
                  <div className="absolute bottom-0 -right-3 w-6 h-0.5 bg-black rounded-full -rotate-60" />
                </div>
              </div>

              {/* Buzz effect */}
              <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.2, repeat: Infinity }}
                className="absolute inset-0 bg-amber-300/30 rounded-full blur-xl"
              />
            </motion.div>

            {/* Loading Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold mb-2">
                <span className="gradient-text">Загрузка</span>
              </h2>
              <p className="text-gray-600 text-sm">Подготовка пасеки...</p>
            </motion.div>

            {/* Progress Bar */}
            <div className="w-80 max-w-[90vw]">
              <div className="glass-card rounded-full h-4 overflow-hidden relative">
                {/* Background glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/50 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                />

                {/* Progress fill */}
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="relative h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-full"
                  style={{ backgroundSize: '200% 100%' }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />

                  {/* Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/50 to-orange-400/50 blur-sm" />
                </motion.div>
              </div>

              {/* Percentage */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center mt-3 text-sm font-semibold gradient-text"
              >
                {Math.round(progress)}%
              </motion.div>
            </div>

            {/* Decorative elements */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-20 -left-20 w-40 h-40 bg-amber-300/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-20 -right-20 w-60 h-60 bg-orange-300/20 rounded-full blur-3xl"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
