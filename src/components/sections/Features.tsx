import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { Scale, Thermometer, MessageCircle, Monitor, Download, Zap } from 'lucide-react'

const features = [
  {
    icon: Scale,
    title: 'Автоматическое взвешивание',
    description: 'Логирование каждую минуту с сохранением в CSV/Excel с датой и временем',
  },
  {
    icon: Thermometer,
    title: 'Мониторинг температуры',
    description: 'Контроль условий в улье и оповещения при отклонениях',
  },
  {
    icon: MessageCircle,
    title: 'Telegram интеграция',
    description: 'Получение данных на телефон и настраиваемые уведомления',
  },
  {
    icon: Monitor,
    title: 'Web-интерфейс',
    description: 'Доступ по IP адресу с графиками и аналитикой',
  },
  {
    icon: Download,
    title: 'Экспорт данных',
    description: 'Excel отчеты и статистика привеса нектара',
  },
  {
    icon: Zap,
    title: 'Простота установки',
    description: 'Быстрая настройка и работает автономно',
  },
]

export const Features = () => {
  const [ref, isInView] = useInView({ threshold: 0.2 })

  return (
    <section id="features" ref={ref} className="snap-section py-24 lg:py-32 relative z-10">
      <div className="container mx-auto px-6 lg:px-12 lg:max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text">Возможности</span> системы
          </h2>
          <p className="text-lg text-gray-600">
            Полный контроль над вашей пасекой в одной системе
          </p>
        </motion.div>

        <div className="grid gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -50, scale: 0.95 }}
              animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{
                delay: i * 0.15,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1]
              }}
              whileHover={{ scale: 1.02, x: 10 }}
              className="glass-card p-8 rounded-3xl hover:shadow-2xl transition-all group relative overflow-hidden"
            >
              {/* Background gradient on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-amber-100/50 to-orange-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                initial={false}
              />

              <div className="relative z-10 flex items-start gap-6">
                {/* Icon container */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="flex-shrink-0 p-4 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg glow"
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:gradient-text transition-all">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-200/20 to-transparent rounded-full blur-3xl -z-0" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-200/20 to-transparent rounded-full blur-2xl -z-0" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
