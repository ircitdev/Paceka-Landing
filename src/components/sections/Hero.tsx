import { motion } from 'framer-motion'
import { ChevronDown, Sparkles } from 'lucide-react'

export const Hero = () => {
  return (
    <section className="snap-section relative min-h-screen flex items-center justify-center overflow-hidden lg:justify-start py-8">
      <div className="container mx-auto px-6 lg:px-8 relative z-20 lg:max-w-xl">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-semibold text-gray-800">
              Технология нового поколения
            </span>
          </motion.div>

          {/* Main heading */}
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            <span className="gradient-text">Умные весы</span>
            <br />
            <span className="text-gray-800">для пасеки</span>
          </h1>

          <p className="text-base lg:text-lg text-gray-700 leading-relaxed glass inline-block px-4 py-3 rounded-2xl">
            Автоматический контроль и мониторинг вашей пасеки 24/7.
            Получайте данные в реальном времени прямо на телефон.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-2xl text-base font-bold shadow-xl hover:shadow-2xl transition-all relative overflow-hidden glow"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10">Узнать больше</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="glass-dark px-6 py-3 rounded-2xl text-base font-semibold text-gray-800 hover:shadow-xl transition-all"
              onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Оставить заявку
            </motion.button>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-3 gap-3 pt-4"
          >
            <div className="glass-card p-3 rounded-xl text-center">
              <div className="text-2xl font-bold gradient-text">24/7</div>
              <div className="text-xs text-gray-600 mt-1">Мониторинг</div>
            </div>
            <div className="glass-card p-3 rounded-xl text-center">
              <div className="text-2xl font-bold gradient-text">99.9%</div>
              <div className="text-xs text-gray-600 mt-1">Точность</div>
            </div>
            <div className="glass-card p-3 rounded-xl text-center">
              <div className="text-2xl font-bold gradient-text">∞</div>
              <div className="text-xs text-gray-600 mt-1">Ульев</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 lg:left-1/4 transform -translate-x-1/2 z-20"
      >
        <motion.button
          onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="glass p-3 rounded-full cursor-pointer hover:shadow-xl transition-shadow"
          aria-label="Прокрутить к следующей секции"
        >
          <ChevronDown className="w-6 h-6 text-amber-600" />
        </motion.button>
      </motion.div>
    </section>
  )
}
