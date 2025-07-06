#!/bin/bash

echo "🚀 Запуск SmartDef..."

# Проверяем, установлен ли Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не установлен. Установите Node.js 18+"
    exit 1
fi

# Устанавливаем зависимости
echo "📦 Установка зависимостей..."
npm install

# Запускаем HTTP сервер
echo "🌐 Запуск HTTP сервера на порту 8080..."
npx http-server -p 8080 &
HTTP_PID=$!

# Ждем немного
sleep 2

# Запускаем ngrok
echo "🔗 Запуск ngrok..."
npx ngrok http 8080 > ngrok.log 2>&1 &
NGROK_PID=$!

# Ждем запуска ngrok
echo "⏳ Ожидание запуска ngrok..."
sleep 5

# Получаем URL ngrok
NGROK_URL=$(curl -s http://localhost:4040/api/tunnels | grep -o '"public_url":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$NGROK_URL" ]; then
    echo "❌ Не удалось получить URL ngrok"
    echo "📋 Проверьте логи ngrok:"
    tail -10 ngrok.log
    exit 1
fi

echo "✅ Ngrok URL: $NGROK_URL"

# Создаем .env файл если его нет
if [ ! -f .env ]; then
    echo "📝 Создание .env файла..."
    cp env.example .env
    echo "TELEGRAM_BOT_TOKEN=YOUR_BOT_TOKEN_HERE" >> .env
    echo "WEBAPP_URL=$NGROK_URL" >> .env
    echo "⚠️  Не забудьте добавить ваш токен Telegram Bot в .env файл!"
fi

# Запускаем backend API
echo "🔧 Запуск backend API на порту 3000..."
node server.js &
API_PID=$!

# Ждем запуска API
sleep 2

# Проверяем API
echo "🔍 Проверка API..."
if curl -s http://localhost:3000/api/health > /dev/null; then
    echo "✅ API работает!"
else
    echo "❌ API не отвечает"
fi

echo ""
echo "🎉 SmartDef запущен!"
echo ""
echo "📱 Для настройки Telegram Bot:"
echo "1. Создайте бота через @BotFather"
echo "2. Добавьте токен в .env файл"
echo "3. Запустите: node setup-telegram.js"
echo ""
echo "🌐 Локальные URL:"
echo "   Frontend: http://localhost:8080"
echo "   API: http://localhost:3000"
echo "   Ngrok: $NGROK_URL"
echo ""
echo "📋 Полезные команды:"
echo "   Просмотр логов ngrok: tail -f ngrok.log"
echo "   Остановка всех сервисов: pkill -f 'http-server\|ngrok\|node server.js'"
echo ""

# Функция для graceful shutdown
cleanup() {
    echo ""
    echo "🛑 Остановка сервисов..."
    kill $HTTP_PID 2>/dev/null
    kill $NGROK_PID 2>/dev/null
    kill $API_PID 2>/dev/null
    echo "✅ Все сервисы остановлены"
    exit 0
}

# Обработка сигналов для graceful shutdown
trap cleanup SIGINT SIGTERM

# Ждем завершения
wait 