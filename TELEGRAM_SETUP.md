# 🚀 Быстрая настройка Telegram Bot для SmartDef

## Шаг 1: Создание бота в Telegram

1. **Откройте Telegram** и найдите @BotFather
2. **Отправьте команду** `/newbot`
3. **Введите имя бота**: `SmartDef Investment Bot`
4. **Введите username**: `your_smartdef_bot` (должен заканчиваться на `_bot`)
5. **Скопируйте токен** - он выглядит как `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`

## Шаг 2: Получение публичного URL

### Вариант A: Ngrok (для тестирования)
```bash
# Установите ngrok
npm install -g ngrok

# Запустите HTTP сервер
npx http-server -p 8080

# В новом терминале запустите ngrok
ngrok http 8080
```

### Вариант B: Vercel/Netlify (для продакшна)
1. Загрузите файлы на GitHub
2. Подключите к Vercel/Netlify
3. Получите URL вида: `https://your-app.vercel.app`

## Шаг 3: Настройка переменных окружения

Создайте файл `.env`:
```bash
# Скопируйте пример
cp env.example .env

# Отредактируйте .env файл
TELEGRAM_BOT_TOKEN=ваш_токен_от_botfather
WEBAPP_URL=https://ваш_ngrok_url.ngrok.io
```

## Шаг 4: Запуск бота

```bash
# Установите зависимости
npm install

# Запустите бота
node setup-telegram.js
```

## Шаг 5: Тестирование

1. **Найдите вашего бота** в Telegram по username
2. **Отправьте команду** `/start`
3. **Нажмите кнопку** "🚀 Открыть SmartDef"

## 🔧 Ручная настройка Web App

Если автоматическая настройка не работает:

1. **Отправьте команду** `/setmenubutton` вашему боту
2. **Введите URL**: `https://ваш_ngrok_url.ngrok.io`
3. **Введите текст кнопки**: `🚀 SmartDef`

## 📱 Структура Web App

```
Главная страница: https://your-url.ngrok.io/
Стратегии: https://your-url.ngrok.io/strategies.html
Портфель: https://your-url.ngrok.io/portfolio.html
Аналитика: https://your-url.ngrok.io/analytics.html
```

## 🐛 Устранение проблем

### Бот не отвечает
- Проверьте токен в `.env` файле
- Убедитесь, что бот запущен: `node setup-telegram.js`

### Web App не открывается
- Проверьте URL в ngrok
- Убедитесь, что HTTP сервер запущен на порту 8080
- Проверьте настройки в BotFather

### Ошибки CORS
- Добавьте домен в настройки бота
- Проверьте настройки CORS в server.js

## 🎯 Готовые команды для копирования

```bash
# 1. Установка зависимостей
npm install

# 2. Запуск HTTP сервера
npx http-server -p 8080

# 3. Запуск ngrok (в новом терминале)
ngrok http 8080

# 4. Настройка .env файла
echo "TELEGRAM_BOT_TOKEN=ваш_токен" > .env
echo "WEBAPP_URL=https://ваш_ngrok_url.ngrok.io" >> .env

# 5. Запуск бота
node setup-telegram.js
```

## 📞 Поддержка

Если что-то не работает:
1. Проверьте логи в терминале
2. Убедитесь, что все сервисы запущены
3. Проверьте настройки в BotFather

---

**Удачного тестирования! 🚀** 