import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { Settings, Wifi, Bell, BarChart } from 'lucide-react'

const steps = [
  {
    icon: Settings,
    title: 'Установите весы под улей',
    description: 'Простая установка за 10 минут. Весы устанавливаются под улей без специальных инструментов.',
  },
  {
    icon: Wifi,
    title: 'Подключите к WiFi',
    description: 'Подключите устройство к вашей WiFi сети через простой веб-интерфейс.',
  },
  {
    icon: Bell,
    title: 'Настройте уведомления',
    description: 'Добавьте Telegram бот и настройте параметры оповещений о критических изменениях.',
  },
  {
    icon: BarChart,
    title: 'Получайте данные 24/7',
    description: 'Наблюдайте за ульем в реальном времени из любой точки мира через приложение.',
  },
]

export const HowItWorks = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 })

  return (
    <section ref={ref} className="snap-section py-24 lg:py-32 relative z-10">
      <div className="container mx-auto px-6 lg:px-12 lg:max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Как это <span className="gradient-text">работает?</span>
          </h2>
          <p className="text-lg text-gray-600">
            Начните работу за 4 простых шага
          </p>
        </motion.div>

        <div className="space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                delay: i * 0.2,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="glass-card p-6 lg:p-8 rounded-3xl hover:shadow-2xl transition-all group"
              >
                <div className="flex items-start gap-6">
                  {/* Step number with liquid morph effect */}
                  <motion.div
                    whileHover={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 0.5 }}
                    className="flex-shrink-0 relative"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white font-bold text-3xl flex items-center justify-center shadow-xl liquid-morph">
                      {i + 1}
                    </div>
                    {/* Floating icon */}
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.3
                      }}
                      className="absolute -top-3 -right-3 p-2 rounded-xl bg-white shadow-lg"
                    >
                      <step.icon className="w-5 h-5 text-amber-600" />
                    </motion.div>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:gradient-text transition-all">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Decorative gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-100/0 via-amber-100/30 to-amber-100/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
              </motion.div>

              {/* Connecting animated line */}
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{ delay: i * 0.2 + 0.5, duration: 0.5 }}
                  className="ml-8 w-1 h-8 bg-gradient-to-b from-amber-400 to-orange-500 origin-top rounded-full my-2"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
