import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'
import { useInView } from '@/hooks/useInView'

const orderSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  phone: z.string().regex(/^\+?[0-9\s\-()]{10,}$/, 'Некорректный формат телефона'),
  email: z.string().email('Некорректный email адрес'),
  comment: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Необходимо согласие на обработку данных',
  }),
})

type OrderFormData = z.infer<typeof orderSchema>

export const OrderForm = () => {
  const [ref, isInView] = useInView({ threshold: 0.2 })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
  })

  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const apiUrl = import.meta.env.DEV
        ? 'http://localhost:3002/api/submit-order'
        : '/api/submit-order'

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          comment: data.comment,
        }),
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setSubmitStatus('success')
        reset()
        // Hide success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="order-form"
      ref={ref}
      className="snap-section py-24 lg:py-32 relative z-10"
    >
      <div className="container mx-auto px-6 lg:px-12 lg:max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Оставить <span className="gradient-text">заявку</span>
            </h2>
            <p className="text-lg text-gray-600">
              Заполните форму и мы свяжемся с вами в ближайшее время
            </p>
          </div>

          {submitStatus === 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-3"
            >
              <CheckCircle className="w-6 h-6 flex-shrink-0" />
              <span>Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.</span>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-3"
            >
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
              <span>Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз.</span>
            </motion.div>
          )}

          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="glass-card p-6 lg:p-8 rounded-3xl space-y-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {/* Name */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Имя *
              </label>
              <input
                {...register('name')}
                type="text"
                id="name"
                className={`w-full px-4 py-3 rounded-2xl border-2 glass transition-all ${
                  errors.name
                    ? 'border-red-400 focus:border-red-500'
                    : 'border-amber-200 focus:border-amber-400'
                } focus:ring-2 focus:ring-amber-100`}
                placeholder="Иван Иванов"
              />
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-xs text-red-500 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.name.message}
                </motion.p>
              )}
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Телефон *
              </label>
              <input
                {...register('phone')}
                type="tel"
                id="phone"
                className={`w-full px-4 py-3 rounded-2xl border-2 glass transition-all ${
                  errors.phone
                    ? 'border-red-400 focus:border-red-500'
                    : 'border-amber-200 focus:border-amber-400'
                } focus:ring-2 focus:ring-amber-100`}
                placeholder="+7 (999) 123-45-67"
              />
              {errors.phone && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-xs text-red-500 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.phone.message}
                </motion.p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email *
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className={`w-full px-4 py-3 rounded-2xl border-2 glass transition-all ${
                  errors.email
                    ? 'border-red-400 focus:border-red-500'
                    : 'border-amber-200 focus:border-amber-400'
                } focus:ring-2 focus:ring-amber-100`}
                placeholder="example@mail.com"
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-xs text-red-500 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3" />
                  {errors.email.message}
                </motion.p>
              )}
            </motion.div>

            {/* Comment - one line */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.7 }}
            >
              <label htmlFor="comment" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Комментарий
              </label>
              <input
                {...register('comment')}
                type="text"
                id="comment"
                className="w-full px-4 py-3 rounded-2xl border-2 border-amber-200 glass focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                placeholder="Дополнительная информация..."
              />
            </motion.div>

            {/* Consent */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="flex items-start gap-3 p-3 rounded-2xl glass-dark"
            >
              <input
                {...register('consent')}
                type="checkbox"
                id="consent"
                className="mt-0.5 w-4 h-4 text-amber-500 border-amber-300 rounded focus:ring-amber-500 cursor-pointer"
              />
              <label htmlFor="consent" className="text-xs text-gray-700 cursor-pointer leading-tight">
                Я согласен на обработку персональных данных *
              </label>
            </motion.div>
            {errors.consent && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-red-500 flex items-center gap-1"
              >
                <AlertCircle className="w-3 h-3" />
                {errors.consent.message}
              </motion.p>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -3 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
              className={`relative w-full py-4 px-6 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 overflow-hidden ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xl hover:shadow-2xl glow'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  <span>Отправка...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Отправить заявку</span>
                </>
              )}
              {!isSubmitting && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
              )}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}
