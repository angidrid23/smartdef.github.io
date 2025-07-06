# 🚀 Быстрый старт SmartDef

## ✅ Что уже готово:

- ✅ HTTP сервер запущен на `http://localhost:8080`
- ✅ Backend API запущен на `http://localhost:3000`
- ✅ Telegram Bot настроен с токеном
- ✅ Все страницы созданы и работают

## 📱 Как протестировать в Telegram:

### Шаг 1: Найдите вашего бота
1. Откройте Telegram
2. Найдите бота по username (который вы указали при создании)
3. Или используйте прямую ссылку: `https://t.me/ваш_username_bot`

### Шаг 2: Настройте Web App
1. Отправьте боту команду: `/setmenubutton`
2. Введите URL: `http://localhost:8080` (для тестирования)
3. Введите текст кнопки: `🚀 SmartDef`

### Шаг 3: Протестируйте
1. Нажмите на кнопку меню в боте
2. Откроется SmartDef Web App
3. Протестируйте все функции

## 🌐 Локальное тестирование:

### Откройте в браузере:
- **Тестовая страница:** http://localhost:8080/test-telegram.html
- **Главная страница:** http://localhost:8080/index.html
- **Стратегии:** http://localhost:8080/strategies.html
- **Портфель:** http://localhost:8080/portfolio.html
- **Аналитика:** http://localhost:8080/analytics.html

## 🔧 Команды для управления:

```bash
# Проверить статус сервисов
curl http://localhost:3000/api/health
curl http://localhost:8080

# Остановить все сервисы
pkill -f "http-server"
pkill -f "node server.js"
pkill -f "node setup-telegram.js"

# Запустить заново
npx http-server -p 8080 &
node server.js &
node setup-telegram.js &
```

## 📋 Что можно протестировать:

### 1. Выбор стратегий
- Откройте `strategies.html`
- Выберите стратегию (Консервативная/Умеренная/Агрессивная)
- Введите сумму инвестиции
- Нажмите "Инвестировать"

### 2. Портфель
- Откройте `portfolio.html`
- Посмотрите на активные инвестиции
- Проверьте доходность
- Попробуйте вывести средства

### 3. Аналитика
- Откройте `analytics.html`
- Посмотрите графики доходности
- Проверьте статистику

## 🚀 Для продакшна:

### Вариант 1: Vercel (рекомендуется)
1. Загрузите код на GitHub
2. Подключите к Vercel
3. Получите HTTPS URL
4. Обновите `WEBAPP_URL` в `.env`

### Вариант 2: Netlify
1. Drag & drop файлы на Netlify
2. Получите HTTPS URL
3. Обновите настройки

### Вариант 3: GitHub Pages
1. Включите Pages в настройках репозитория
2. Получите URL вида: `https://username.github.io/repo-name`

## 🐛 Устранение проблем:

### Бот не отвечает
```bash
# Проверьте, что бот запущен
ps aux | grep setup-telegram

# Перезапустите бота
node setup-telegram.js
```

### Web App не открывается
- Убедитесь, что HTTP сервер запущен
- Проверьте URL в настройках бота
- Для продакшна нужен HTTPS URL

### API не работает
```bash
# Проверьте API
curl http://localhost:3000/api/health

# Перезапустите API
node server.js
```

## 📞 Поддержка:

Если что-то не работает:
1. Проверьте логи в терминале
2. Убедитесь, что все сервисы запущены
3. Проверьте настройки в BotFather

---

**🎉 Готово к тестированию! Откройте http://localhost:8080/test-telegram.html** 