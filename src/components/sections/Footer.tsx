export const Footer = () => {
  return (
    <footer className="relative z-10 w-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4 gradient-text">Умные весы для пасеки</h3>
            <p className="text-gray-400 leading-relaxed">
              Современная система автоматического мониторинга для эффективного пчеловодства.
              Контроль 24/7, точность 99.9%.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">Контакты</h4>
            <div className="space-y-3 text-gray-400">
              <p className="flex items-center gap-2">
                <span className="text-amber-500">📧</span> info@paceka.ru
              </p>
              <p className="flex items-center gap-2">
                <span className="text-amber-500">📱</span> +7 (XXX) XXX-XX-XX
              </p>
              <p className="flex items-center gap-2">
                <span className="text-amber-500">📍</span> Москва, Россия
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">Информация</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="#" className="hover:text-amber-500 transition-colors flex items-center gap-2">
                  → О компании
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500 transition-colors flex items-center gap-2">
                  → Доставка и оплата
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500 transition-colors flex items-center gap-2">
                  → Гарантии
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-amber-500 transition-colors flex items-center gap-2">
                  → Политика конфиденциальности
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2026 Умные весы для пасеки. Все права защищены.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full glass-dark flex items-center justify-center hover:scale-110 transition-transform">
              <span className="text-xl">📱</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass-dark flex items-center justify-center hover:scale-110 transition-transform">
              <span className="text-xl">✉️</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass-dark flex items-center justify-center hover:scale-110 transition-transform">
              <span className="text-xl">🌐</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
