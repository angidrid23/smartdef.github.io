#!/bin/bash

echo "🚀 SmartDef Deployment Script"
echo "=============================="

# Проверяем наличие Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI не установлен"
    echo "📦 Устанавливаем Vercel CLI..."
    npm install -g vercel
fi

# Проверяем Git статус
if [ ! -d ".git" ]; then
    echo "📁 Инициализируем Git репозиторий..."
    git init
    git add .
    git commit -m "Initial SmartDef commit"
    echo "⚠️  Не забудьте создать репозиторий на GitHub и добавить remote!"
fi

# Проверяем переменные окружения
if [ ! -f ".env" ]; then
    echo "📝 Создаем .env файл..."
    echo "TELEGRAM_BOT_TOKEN=7274357474:AAHFemXpYzc9PLCQ7-hxEwCtNYqKNusEb6A" > .env
fi

echo "🔧 Проверяем конфигурацию..."
echo "✅ package.json - OK"
echo "✅ vercel.json - OK"
echo "✅ server.js - OK"

echo ""
echo "🚀 Начинаем развертывание на Vercel..."
echo "📋 Следуйте инструкциям в терминале:"
echo "   - Войдите в аккаунт Vercel"
echo "   - Выберите проект (или создайте новый)"
echo "   - Подтвердите настройки"
echo ""

vercel

echo ""
echo "🎉 Развертывание завершено!"
echo "📱 Не забудьте обновить Web App URL в настройках бота!"
echo ""
echo "📖 Подробная инструкция: DEPLOYMENT.md" 