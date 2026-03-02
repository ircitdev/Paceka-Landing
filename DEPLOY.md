# 🚀 Инструкция по деплою на Vercel

## Шаг 1: Подготовка

1. Убедитесь, что все файлы коммитнуты в Git
2. Проверьте, что `.env` файл добавлен в `.gitignore` (уже добавлен)

## Шаг 2: Создание Telegram бота (если еще не создан)

Ваш бот уже настроен с токеном: `8651732113:AAF6DQioU4mgf7XAukDqATGzNrwk1UuIgo0`

Супергруппа: `-1003771041554`
Топик: `2`

## Шаг 3: Установка Vercel CLI

```bash
npm install -g vercel
```

## Шаг 4: Логин в Vercel

```bash
vercel login
```

Следуйте инструкциям для аутентификации.

## Шаг 5: Деплой проекта

### Первый деплой (preview)

```bash
vercel
```

Ответьте на вопросы:
- Set up and deploy "~/paceka"? **Y**
- Which scope? Выберите ваш аккаунт
- Link to existing project? **N**
- What's your project's name? **paceka** (или любое другое)
- In which directory is your code located? **./** (Enter)

### Production деплой

```bash
vercel --prod
```

## Шаг 6: Настройка Environment Variables в Vercel

После первого деплоя, добавьте переменные окружения:

1. Откройте https://vercel.com/dashboard
2. Выберите ваш проект **paceka**
3. Перейдите в **Settings** → **Environment Variables**
4. Добавьте следующие переменные:

| Название | Значение | Environment |
|----------|----------|-------------|
| `VITE_TELEGRAM_BOT_TOKEN` | `8651732113:AAF6DQioU4mgf7XAukDqATGzNrwk1UuIgo0` | Production, Preview, Development |
| `VITE_TELEGRAM_CHAT_ID` | `-1003771041554` | Production, Preview, Development |
| `VITE_TELEGRAM_THREAD_ID` | `2` | Production, Preview, Development |

**Важно!** Для API endpoint используйте переменные БЕЗ префикса `VITE_`:

| Название | Значение | Environment |
|----------|----------|-------------|
| `TELEGRAM_BOT_TOKEN` | `8651732113:AAF6DQioU4mgf7XAukDqATGzNrwk1UuIgo0` | Production, Preview, Development |
| `TELEGRAM_CHAT_ID` | `-1003771041554` | Production, Preview, Development |
| `TELEGRAM_THREAD_ID` | `2` | Production, Preview, Development |

## Шаг 7: Redeploy после добавления переменных

```bash
vercel --prod
```

## Шаг 8: Настройка домена (опционально)

1. В Vercel dashboard → **Settings** → **Domains**
2. Добавьте ваш домен
3. Настройте DNS записи у вашего регистратора:
   - Тип: **A** или **CNAME**
   - Host: **@** или **www**
   - Value: адрес Vercel (будет указан в dashboard)

## Шаг 9: Проверка работы

1. Откройте деплой URL (например: `https://paceka.vercel.app`)
2. Проверьте 3D сцену (улей, пчелы должны летать)
3. Прокрутите страницу - камера должна плавно менять ракурс
4. Заполните форму заказа внизу страницы
5. Проверьте, что заявка пришла в Telegram супергруппу в топик

## Возможные проблемы и решения

### 3D сцена не загружается
- Проверьте консоль браузера на ошибки
- Убедитесь, что WebGL поддерживается браузером

### Форма не отправляется
- Проверьте, что переменные окружения установлены в Vercel
- Проверьте логи в Vercel → Functions → Logs
- Убедитесь, что токен бота корректный

### Сборка падает с ошибкой
- Проверьте TypeScript ошибки: `npm run build`
- Проверьте, что все зависимости установлены: `npm install`

## Локальное тестирование production build

```bash
# Собрать production версию
npm run build

# Запустить локальный сервер
npm run preview
```

Откройте http://localhost:4173

## Continuous Deployment

Vercel автоматически деплоит при каждом push в Git:
- Push в **main** → Production deploy
- Push в другие ветки → Preview deploy

## Мониторинг

Vercel Analytics автоматически включен:
- Откройте https://vercel.com/dashboard
- Выберите проект → **Analytics**
- Смотрите посещаемость, производительность, географию

## Контакты для поддержки

- Telegram бот: https://t.me/+<ваш_бот>
- Супергруппа: https://t.me/c/3771041554/2

## ✅ Чеклист перед деплоем

- [ ] Все файлы коммитнуты в Git
- [ ] `.env` в `.gitignore`
- [ ] Build проходит без ошибок (`npm run build`)
- [ ] Локально все работает (`npm run dev`)
- [ ] Environment variables настроены в Vercel
- [ ] Telegram бот протестирован
- [ ] Домен настроен (если нужен)
