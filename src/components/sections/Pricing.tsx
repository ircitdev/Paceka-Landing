import { motion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Базовый',
    price: '15 000',
    description: 'Идеально для начинающих пасечников',
    features: [
      '1 комплект умных весов',
      'Базовые функции мониторинга',
      'Telegram уведомления',
      'Web-интерфейс с графиками',
      'Техническая поддержка',
      'Гарантия 1 год',
    ],
    popular: false,
  },
  {
    name: 'Продвинутый',
    price: '25 000',
    description: 'Для опытных пасечников',
    features: [
      '3 комплекта умных весов',
      'Все функции мониторинга',
      'Расширенные уведомления',
      'API доступ для интеграций',
      'Экспорт данных в Excel',
      'Приоритетная поддержка',
      'Гарантия 2 года',
    ],
    popular: true,
  },
  {
    name: 'Профессиональный',
    price: 'По запросу',
    description: 'Для больших пасек',
    features: [
      'Неограниченное количество весов',
      'Индивидуальная настройка',
      'Интеграция с вашей системой',
      'Персональное обучение',
      'Выделенный менеджер',
      'Расширенная аналитика',
      'Гарантия 3 года',
    ],
    popular: false,
  },
]

export const Pricing = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 })

  return (
    <section id="pricing" ref={ref} className="snap-section py-16 lg:py-24 relative z-10 overflow-visible w-screen">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-3">
            <span className="gradient-text">Тарифные</span> планы
          </h2>
          <p className="text-base text-gray-600">
            Выберите подходящий для вас вариант
          </p>
        </motion.div>

        {/* Cards container */}
        <div className="relative">
          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{
                  delay: i * 0.15,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1]
                }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative w-full lg:w-auto"
              >
                <div
                  className={`relative rounded-3xl p-4 lg:p-6 transition-all group h-full flex flex-col ${
                    plan.popular
                      ? 'glass-dark shadow-2xl border-2 border-amber-300'
                      : 'glass-card'
                  }`}
                >
                  {plan.popular && (
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-3 left-1/2 -translate-x-1/2 z-10"
                    >
                      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl glow whitespace-nowrap">
                        ⭐ Популярный
                      </div>
                    </motion.div>
                  )}

                  {/* Card content */}
                  <div className="flex-1 flex flex-col">
                    <div className="text-center mb-4">
                      <h3 className="text-xl lg:text-2xl font-bold mb-1 text-gray-800 group-hover:gradient-text transition-all">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 text-xs">{plan.description}</p>
                    </div>

                    {/* Price */}
                    <div className="mb-4 text-center">
                      <div className="text-3xl lg:text-4xl font-bold gradient-text">
                        {plan.price === 'По запросу' ? plan.price : `${plan.price} ₽`}
                      </div>
                      {plan.price !== 'По запросу' && (
                        <div className="text-gray-500 text-xs mt-1">/ комплект</div>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-2 flex-1 mb-4">
                      {plan.features.map((feature, j) => (
                        <motion.li
                          key={j}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: i * 0.15 + j * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <div className="flex-shrink-0 mt-0.5">
                            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                              <Check className="w-2.5 h-2.5 text-white" />
                            </div>
                          </div>
                          <span className="text-gray-700 text-xs leading-relaxed">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' })}
                      className={`w-full py-3 px-4 rounded-2xl font-semibold text-sm transition-all shadow-lg hover:shadow-2xl ${
                        plan.popular
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white glow'
                          : 'glass-dark gradient-text'
                      }`}
                    >
                      Заказать
                    </motion.button>
                  </div>

                  {/* Decorative elements */}
                  {plan.popular && (
                    <>
                      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-300/20 to-transparent rounded-full blur-3xl -z-0" />
                      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-orange-300/20 to-transparent rounded-full blur-2xl -z-0" />
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
