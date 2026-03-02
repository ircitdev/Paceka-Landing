# 🚀 Шпаргалка команд

## Разработка

```bash
# Установить зависимости
npm install

# Запустить dev сервер (http://localhost:3000)
npm run dev

# Сборка TypeScript (проверка типов)
npm run build

# Предпросмотр production build
npm run preview

# Lint
npm run lint
```

## Vercel Deployment

```bash
# Логин (один раз)
vercel login

# Preview deploy
vercel

# Production deploy
vercel --prod

# Посмотреть логи
vercel logs

# Список deployments
vercel ls

# Удалить deployment
vercel rm [deployment-url]
```

## Git

```bash
# Первый коммит
git add .
git commit -m "Initial commit: 3D landing page for smart beehive scales"

# Push в GitHub
git remote add origin [your-repo-url]
git branch -M main
git push -u origin main
```

## Тестирование API локально

```bash
# Установить curl (если нет)
# Windows: choco install curl
# Mac: уже установлен
# Linux: apt-get install curl

# Тест API endpoint
curl -X POST http://localhost:3000/api/submit-order \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "+7 (999) 123-45-67",
    "email": "test@example.com",
    "comment": "Test comment"
  }'
```

## Production URLs

После деплоя на Vercel:

```
Frontend: https://paceka.vercel.app
API: https://paceka.vercel.app/api/submit-order
```

## Environment Variables (Vercel)

В Vercel Dashboard → Settings → Environment Variables:

```
TELEGRAM_BOT_TOKEN=8651732113:AAF6DQioU4mgf7XAukDqATGzNrwk1UuIgo0
TELEGRAM_CHAT_ID=-1003771041554
TELEGRAM_THREAD_ID=2
```

## Быстрые исправления

```bash
# Очистить node_modules и переустановить
rm -rf node_modules package-lock.json
npm install

# Очистить кеш Vite
rm -rf .vite
rm -rf dist

# Обновить все зависимости
npm update

# Проверить устаревшие пакеты
npm outdated
```

## Debug

```bash
# Проверить порты
netstat -ano | findstr :3000  # Windows
lsof -i :3000                  # Mac/Linux

# Проверить процессы Node
tasklist | findstr node        # Windows
ps aux | grep node             # Mac/Linux

# Убить процесс на порту 3000
npx kill-port 3000
```

## Полезные alias (для .bashrc или .zshrc)

```bash
alias dev="npm run dev"
alias build="npm run build"
alias deploy="vercel --prod"
```
