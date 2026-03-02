# 🐝 Умные весы для пасеки - 3D Landing Page

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-Latest-000000?logo=three.js&logoColor=white)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

> Современный 3D лендинг для системы автоматического мониторинга пасеки с впечатляющими анимациями и scroll-driven эффектами камеры.

## ✨ Особенности

### 🎨 3D Анимация
- **Программная модель улья** из Three.js примитивов
- **20 инстансированных пчел** летающих вокруг улья
- **Падающие листики** с физикой
- **Плывущие облака** из сфер
- **Scroll-driven камера** - плавное изменение ракурса при прокрутке

### 📱 Секции лендинга
- Hero с градиентом и CTA
- Features - 6 карточек возможностей системы
- How It Works - 4 шага установки
- Pricing - 3 тарифных плана
- Order Form - форма заказа с отправкой в Telegram
- Footer с контактами

### ⚙️ Оптимизация
- Адаптивное качество для mobile/tablet/desktop
- Instancing для пчел (один draw call)
- Lazy loading секций
- Code splitting

## 🚀 Технологии

- **React 19** + TypeScript
- **Vite 6** - сборка
- **Three.js** + **@react-three/fiber** + **@react-three/drei**
- **TailwindCSS** - стили
- **Framer Motion** - UI анимации
- **Zustand** - state management
- **React Hook Form + Zod** - формы
- **Vercel** - хостинг и serverless functions

## 📦 Установка

```bash
# Установить зависимости
npm install

# Запустить dev сервер
npm run dev

# Собрать для production
npm run build

# Предпросмотр production build
npm run preview
```

## 🔧 Конфигурация

Создайте файл `.env` в корне проекта:

```env
VITE_TELEGRAM_BOT_TOKEN=your_bot_token
VITE_TELEGRAM_CHAT_ID=your_chat_id
VITE_TELEGRAM_THREAD_ID=your_thread_id
```

## 📝 API Endpoint

Форма заказа отправляет данные на `/api/submit-order`:

**POST** `/api/submit-order`

Request body:
```json
{
  "name": "Иван Иванов",
  "phone": "+7 (999) 123-45-67",
  "email": "example@mail.com",
  "comment": "Комментарий (optional)"
}
```

Response:
```json
{
  "success": true,
  "message": "Заявка успешно отправлена!"
}
```

## 🎯 Структура проекта

```
paceka/
├── src/
│   ├── components/
│   │   ├── 3d/              # 3D компоненты
│   │   │   ├── Scene.tsx
│   │   │   ├── HiveModel.tsx
│   │   │   ├── Bees.tsx
│   │   │   ├── FloatingLeaves.tsx
│   │   │   ├── Clouds.tsx
│   │   │   ├── Environment.tsx
│   │   │   └── CameraRig.tsx
│   │   └── sections/        # Секции лендинга
│   │       ├── Hero.tsx
│   │       ├── Features.tsx
│   │       ├── HowItWorks.tsx
│   │       ├── Pricing.tsx
│   │       ├── OrderForm.tsx
│   │       └── Footer.tsx
│   ├── hooks/
│   │   ├── useScrollProgress.ts
│   │   ├── use3DOptimization.ts
│   │   ├── useMediaQuery.ts
│   │   └── useInView.ts
│   ├── store/
│   │   └── scrollStore.ts
│   ├── config/
│   │   └── camera-keyframes.ts
│   └── App.tsx
├── api/
│   └── submit-order.ts      # Serverless function
├── package.json
└── vercel.json
```

## 🌐 Деплой на Vercel

```bash
# Установить Vercel CLI
npm i -g vercel

# Деплой
vercel

# Production деплой
vercel --prod
```

Не забудьте добавить environment variables в Vercel dashboard:
- `VITE_TELEGRAM_BOT_TOKEN`
- `VITE_TELEGRAM_CHAT_ID`
- `VITE_TELEGRAM_THREAD_ID`

## 📊 Performance

- **Lighthouse Score**: 90+ (mobile и desktop)
- **FPS**: 60fps на desktop, 30fps на mobile
- **First Load**: < 3 секунды
- **Bundle Size**: < 500KB gzipped

## 🎨 Кастомизация цветов

Цвета настраиваются в `tailwind.config.js`:

- `honey` - основной желтый цвет меда
- `hive` - коричневый цвет улья
- `bee` - золотой цвет пчел

## 📄 Лицензия

Распространяется под лицензией MIT.

## 👤 Автор

**ircitdev**

- GitHub: [@ircitdev](https://github.com/ircitdev)
- Website: https://dev.uspeshnyy.ru

## 🙏 Благодарности

- [Three.js](https://threejs.org/) - за потрясающий 3D движок
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - за React интеграцию
- [Tailwind CSS](https://tailwindcss.com/) - за утилитарные стили
- [Framer Motion](https://www.framer.com/motion/) - за плавные анимации

---

<div align="center">

**Создано с ❤️ для пчеловодов**

[Live Demo](https://dev.uspeshnyy.ru/www/paceka/) · [Сообщить об ошибке](https://github.com/ircitdev/Paceka-Landing/issues) · [Предложить функцию](https://github.com/ircitdev/Paceka-Landing/issues)

</div>
