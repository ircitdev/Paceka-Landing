# 🎨 Обновление дизайна — Март 2026

## Общие изменения

### Новый Layout
- **Desktop (>1024px)**: 3D сцена справа (50% ширины), контент слева (50% ширины)
- **Mobile/Tablet (<1024px)**: 3D сцена на фоне, контент поверх (как было)
- Контент на десктопе ограничен максимальной шириной `lg:max-w-2xl` для лучшей читаемости

### Эффект жидкого стекла (Glassmorphism)

Добавлены три варианта glass-эффекта:

1. **`.glass`** - базовый эффект для обычных элементов
   - `backdrop-filter: blur(20px)`
   - Прозрачность: 70%
   - Белая рамка с opacity 30%
   - Мягкая тень

2. **`.glass-dark`** - усиленный эффект для важных элементов
   - `backdrop-filter: blur(25px)`
   - Прозрачность: 90%
   - Более яркая рамка
   - Более сильная тень

3. **`.glass-card`** - для карточек с градиентом
   - Градиентный фон от белого к полупрозрачному
   - `blur(15px)`
   - Внутренняя подсветка сверху (inset shadow)

### Новые анимации

#### 1. **Float** - плавающий эффект
```css
@keyframes float {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-15px) scale(1.02); }
}
```
- Классы: `.float`, `.float-delay-1`, `.float-delay-2`
- Длительность: 6 секунд
- Использование: для декоративных элементов

#### 2. **Glow** - пульсирующее свечение
```css
@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(255, 195, 0, 0.3); }
  50% { box-shadow: 0 0 40px rgba(255, 195, 0, 0.6); }
}
```
- Класс: `.glow`
- Использование: для кнопок и важных элементов

#### 3. **Shimmer** - эффект блеска
```css
@keyframes shimmer {
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
}
```
- Класс: `.shimmer`
- Использование: для интерактивных элементов

#### 4. **Liquid Morph** - жидкая морфинг-анимация
```css
@keyframes morph {
  0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
  50% { border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%; }
  75% { border-radius: 60% 40% 60% 40% / 70% 30% 50% 60%; }
}
```
- Класс: `.liquid-morph`
- Длительность: 8 секунд
- Использование: для декоративных блоков

### Gradient Text
```css
.gradient-text {
  background: linear-gradient(135deg, #FFC300 0%, #FF9500 50%, #FF6B00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```
- Используется для выделения ключевых слов в заголовках

### Scroll Snap
- Добавлено примагничивание секций при прокрутке
- `scroll-snap-type: y proximity` - мягкое примагничивание
- Класс `.snap-section` на всех секциях
- `scroll-snap-align: start`

---

## Изменения по секциям

### 1. Hero (Главный экран)

#### Структура
- Контент выровнен по левому краю на десктопе (`lg:justify-start`)
- Добавлен badge с иконкой Sparkles
- Заголовок с gradient-text на "Умные весы"
- Подзаголовок в glass-контейнере
- Две CTA кнопки (вместо одной)
- Статистические карточки (24/7, 99.9%, ∞)

#### Новые элементы
```tsx
// Badge
<div className="glass px-6 py-3 rounded-full">
  <Sparkles /> Технология нового поколения
</div>

// Stats cards
<div className="grid grid-cols-3 gap-4">
  <div className="glass-card">24/7 Мониторинг</div>
  <div className="glass-card">99.9% Точность</div>
  <div className="glass-card">∞ Ульев</div>
</div>
```

#### Анимации
- Появление слева: `initial={{ x: -50 }}` → `animate={{ x: 0 }}`
- Кастомный easing: `[0.16, 1, 0.3, 1]` (ease-out-expo)
- Hover эффекты на кнопках: `scale: 1.05, y: -5`
- Shimmer эффект на главной кнопке

### 2. Features (Возможности)

#### Структура
- Вертикальный список (вместо сетки)
- Каждая карточка растягивается на всю ширину
- Горизонтальный layout: иконка слева, текст справа

#### Glass эффекты
- `.glass-card` для каждой карточки
- Градиентный фон при hover
- Декоративные блики (размытые круги)

#### Анимации
- Появление слева с масштабированием: `x: -50, scale: 0.95`
- Задержка между карточками: `i * 0.15`
- Hover: `scale: 1.02, x: 10`
- Иконка поворачивается и увеличивается при hover
- Текст получает gradient при hover

#### Иконки
```tsx
<div className="p-4 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 glow">
  <feature.icon className="w-8 h-8 text-white" />
</div>
```

### 3. HowItWorks (Как это работает)

#### Структура
- Вертикальный список шагов
- Номер шага с liquid-morph эффектом
- Иконка "плавает" над номером

#### Анимации
- Номер шага с liquid-morph: постоянная морфинг-анимация
- Иконка плавает: `y: [0, -8, 0]` с задержкой `i * 0.3`
- Соединяющая линия: `scaleY: 0 → 1` с задержкой
- Градиентная линия: `from-amber-400 to-orange-500`

#### Glass эффекты
- `.glass-card` для каждого шага
- Hover gradient overlay сверху

### 4. Pricing (Тарифы)

#### Структура
- Вертикальный список (вместо сетки 3 колонки)
- Горизонтальный layout: инфо слева, кнопка справа (на lg)
- Popular badge с пульсирующей анимацией

#### Анимации
- Popular badge: `scale: [1, 1.05, 1]` бесконечно
- Карточки появляются с масштабированием
- Hover: `scale: 1.02, x: 10`
- Кнопка: `scale: 1.05, y: -5` при hover

#### Декоративные элементы
- Размытые круги для популярного тарифа
- Glow эффект на кнопке популярного тарифа

### 5. OrderForm (Форма заказа)

#### Структура
- Вся форма в едином `.glass-card` контейнере
- Закругленные input'ы: `rounded-2xl`
- Улучшенные фокус-состояния

#### Glass эффекты
- Форма: `.glass-card p-8 lg:p-10 rounded-3xl`
- Input'ы: `.glass` с border и focus states
- Checkbox: в `.glass-dark` контейнере

#### Анимации
- Форма появляется с масштабированием
- Каждое поле появляется слева с задержкой
- Ошибки появляются с `y: -10 → 0`
- Кнопка: shimmer эффект при hover
- Submit button: glow эффект

#### Улучшения UX
- Более крупные input'ы: `py-4` вместо `py-3`
- Цветовая индикация focus: `ring-4 ring-amber-100`
- Иконка AlertCircle для ошибок
- Градиентная кнопка с анимацией

---

## Цветовая палитра

### Градиенты
```css
/* Основной градиент (янтарь → оранжевый) */
from-amber-400 to-orange-500
from-amber-500 to-orange-500

/* Текстовый градиент */
#FFC300 → #FF9500 → #FF6B00

/* Фоновый градиент body */
from-amber-50 via-white to-orange-50
```

### Glass эффекты
```css
/* Базовый glass */
background: rgba(255, 255, 255, 0.7)
border: rgba(255, 255, 255, 0.3)

/* Glass dark */
background: rgba(255, 255, 255, 0.9)
border: rgba(255, 255, 255, 0.4)

/* Glass card */
gradient: rgba(255, 255, 255, 0.8) → rgba(255, 255, 255, 0.6)
```

---

## Адаптивность

### Breakpoints
- `lg`: 1024px - переключение layout (3D справа vs фон)
- Все секции оптимизированы для мобильных
- Отступы: `px-6 lg:px-12`
- Размеры шрифтов: `text-4xl lg:text-5xl`

### Mobile оптимизации
- 3D сцена на всю ширину фона
- Контент поверх с glass эффектом
- Кнопки вертикально (flex-col)
- Уменьшенные отступы

---

## Производительность

### Оптимизации
- `scroll-behavior: smooth` для плавной прокрутки
- `will-change` автоматически применяется браузером для анимируемых свойств
- `backdrop-filter` аппаратно ускорен на современных устройствах
- Passive scroll listeners в useScrollProgress

### Анимации
- Используется `transform` и `opacity` (GPU-accelerated)
- Cubic-bezier easing: `[0.16, 1, 0.3, 1]` для плавности
- Задержки между элементами для последовательного появления

---

## Технические детали

### Обновленные файлы
1. `src/App.tsx` - новый layout с 3D справа
2. `src/styles/globals.css` - glass эффекты, анимации, градиенты
3. `src/components/sections/Hero.tsx` - полный редизайн
4. `src/components/sections/Features.tsx` - вертикальный layout
5. `src/components/sections/HowItWorks.tsx` - liquid morph эффект
6. `src/components/sections/Pricing.tsx` - вертикальный layout
7. `src/components/sections/OrderForm.tsx` - glass форма

### Новые классы CSS
- `.glass`, `.glass-dark`, `.glass-card` - glassmorphism
- `.float`, `.float-delay-1`, `.float-delay-2` - плавание
- `.glow` - свечение
- `.shimmer` - блеск
- `.liquid-morph` - жидкий морфинг
- `.gradient-text` - градиентный текст
- `.snap-section` - примагничивание
- `.parallax` - параллакс эффект (готов к использованию)

---

## Как запустить

```bash
# Запустить оба сервера (frontend + API)
npm run dev:all

# Только frontend (на порту 3003)
npm run dev

# Только API (на порту 3002)
npm run api
```

Frontend: http://localhost:3003
API: http://localhost:3002

---

## Будущие улучшения

- [ ] Добавить parallax эффект при скролле на десктопе
- [ ] Анимация частиц вокруг 3D сцены
- [ ] Темная тема (опционально)
- [ ] Еще больше micro-interactions
- [ ] Lazy loading для секций
- [ ] Preload critical CSS

---

✨ **Результат**: Современный, плавный и красивый дизайн с эффектом жидкого стекла, впечатляющими анимациями и идеальным разделением 3D/контента на десктопе!
