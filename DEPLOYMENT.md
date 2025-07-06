# 🚀 Развертывание SmartDef на Vercel

## 📋 Подготовка

### 1. Убедитесь, что у вас есть:
- [ ] GitHub аккаунт
- [ ] Vercel аккаунт (https://vercel.com)
- [ ] Все файлы проекта

### 2. Загрузите код на GitHub:

```bash
# Инициализируйте Git репозиторий
git init
git add .
git commit -m "Initial SmartDef commit"

# Создайте репозиторий на GitHub и загрузите код
git remote add origin https://github.com/YOUR_USERNAME/SmartDef.git
git branch -M main
git push -u origin main
```

## 🚀 Развертывание на Vercel

### Вариант 1: Через веб-интерфейс (рекомендуется)

1. **Перейдите на Vercel**: https://vercel.com
2. **Войдите** через GitHub
3. **Нажмите "New Project"**
4. **Выберите ваш SmartDef репозиторий**
5. **Настройте проект**:
   - **Framework Preset**: Node.js
   - **Root Directory**: `./` (оставьте пустым)
   - **Build Command**: оставьте пустым
   - **Output Directory**: оставьте пустым
6. **Нажмите "Deploy"**

### Вариант 2: Через Vercel CLI

```bash
# Установите Vercel CLI
npm i -g vercel

# Войдите в аккаунт
vercel login

# Разверните проект
vercel

# Следуйте инструкциям в терминале
```

## ⚙️ Настройка переменных окружения

После развертывания:

1. **Перейдите в настройки проекта** на Vercel
2. **Выберите "Environment Variables"**
3. **Добавьте переменные**:
   ```
   TELEGRAM_BOT_TOKEN=7274357474:AAHFemXpYzc9PLCQ7-hxEwCtNYqKNusEb6A
   ```

## 🔗 Получение HTTPS URL

После успешного развертывания вы получите URL вида:
```
https://smartdef-xxxxx.vercel.app
```

## 🤖 Обновление Telegram Bot

### 1. Обновите Web App URL в боте:

```bash
# Замените YOUR_VERCEL_URL на ваш URL
curl -X POST "https://api.telegram.org/bot7274357474:AAHFemXpYzc9PLCQ7-hxEwCtNYqKNusEb6A/setChatMenuButton" \
  -H "Content-Type: application/json" \
  -d '{
    "menu_button": {
      "type": "web_app",
      "text": "SmartDef App",
      "web_app": {
        "url": "https://YOUR_VERCEL_URL.vercel.app"
      }
    }
  }'
```

### 2. Или через BotFather:

1. **Найдите @BotFather** в Telegram
2. **Отправьте**: `/mybots`
3. **Выберите SmartDef_bot**
4. **Выберите "Bot Settings"**
5. **Выберите "Menu Button"**
6. **Введите URL**: `https://YOUR_VERCEL_URL.vercel.app`
7. **Введите текст**: `SmartDef App`

## 🧪 Тестирование

### 1. Проверьте API:
```bash
curl https://YOUR_VERCEL_URL.vercel.app/api/health
```

### 2. Проверьте главную страницу:
```
https://YOUR_VERCEL_URL.vercel.app
```

### 3. Проверьте в Telegram:
1. **Откройте бота**: @SmartDef_bot
2. **Отправьте**: `/start`
3. **Нажмите кнопку "SmartDef App"**

## 🔄 Обновления

Для обновления приложения:

```bash
# Внесите изменения в код
git add .
git commit -m "Update SmartDef"
git push

# Vercel автоматически переразвернет проект
```

## 🐛 Устранение проблем

### Ошибка 404 на API
- Проверьте `vercel.json` конфигурацию
- Убедитесь, что `server.js` существует

### Ошибка CORS
- Проверьте настройки CORS в `server.js`
- Убедитесь, что домен добавлен в разрешенные

### Web App не открывается
- Проверьте HTTPS URL в настройках бота
- Убедитесь, что URL доступен из браузера

## 📞 Поддержка

Если возникли проблемы:
1. Проверьте логи в Vercel Dashboard
2. Убедитесь, что все файлы загружены
3. Проверьте переменные окружения

---

## 🎉 Готово!

После развертывания у вас будет:
- ✅ HTTPS URL для Web App
- ✅ Работающий API
- ✅ Полная функциональность в Telegram
- ✅ Автоматические обновления

**Следующий шаг**: Обновите настройки бота с новым URL! 