# Настройка SmartDef

## Быстрый старт

### 1. Клонирование и установка зависимостей

```bash
git clone <repository-url>
cd SmartDef
npm install
```

### 2. Настройка переменных окружения

```bash
cp env.example .env
# Отредактируйте .env файл с вашими настройками
```

### 3. Запуск в режиме разработки

```bash
# Запуск backend API
npm run dev

# Откройте index.html в браузере
# Или используйте простой HTTP сервер:
npx http-server -p 8080
```

## Настройка Telegram Bot

### 1. Создание бота через BotFather

1. Откройте Telegram и найдите @BotFather
2. Отправьте команду `/newbot`
3. Следуйте инструкциям для создания бота
4. Сохраните полученный токен

### 2. Настройка Web App

1. Отправьте команду `/setmenubutton` вашему боту
2. Укажите URL вашего Web App (например, `https://your-domain.com`)

### 3. Обновление конфигурации

Добавьте токен бота в `.env` файл:

```
TELEGRAM_BOT_TOKEN=your-bot-token-here
```

## Настройка базы данных (опционально)

### PostgreSQL

```bash
# Установка PostgreSQL (Ubuntu/Debian)
sudo apt-get install postgresql postgresql-contrib

# Создание базы данных
sudo -u postgres createdb smartdef
sudo -u postgres createuser smartdef_user

# Обновление .env файла
DATABASE_URL=postgresql://smartdef_user:password@localhost:5432/smartdef
```

### Redis (для кэширования)

```bash
# Установка Redis (Ubuntu/Debian)
sudo apt-get install redis-server

# Обновление .env файла
REDIS_URL=redis://localhost:6379
```

## Настройка DeFi интеграций

### 1. Получение API ключей

#### Infura (для Ethereum)
1. Зарегистрируйтесь на [infura.io](https://infura.io)
2. Создайте новый проект
3. Скопируйте Project ID

#### The Graph (для Uniswap)
1. Зарегистрируйтесь на [thegraph.com](https://thegraph.com)
2. Создайте API ключ

### 2. Обновление конфигурации

```bash
# Добавьте в .env файл:
ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/your-project-id
UNISWAP_API_URL=https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3
```

## Тестирование

### Запуск тестов

```bash
npm test
```

### Тестирование API

```bash
# Проверка здоровья сервера
curl http://localhost:3000/api/health

# Получение стратегий
curl http://localhost:3000/api/strategies

# Получение портфеля пользователя
curl http://localhost:3000/api/portfolio/1
```

## Продакшн деплой

### 1. Подготовка сервера

```bash
# Установка Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Установка PM2 для управления процессами
npm install -g pm2
```

### 2. Настройка Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /path/to/SmartDef;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 3. Запуск в продакшне

```bash
# Сборка и запуск
npm run build
pm2 start server.js --name smartdef

# Настройка автозапуска
pm2 startup
pm2 save
```

### 4. SSL сертификат (Let's Encrypt)

```bash
# Установка Certbot
sudo apt-get install certbot python3-certbot-nginx

# Получение сертификата
sudo certbot --nginx -d your-domain.com
```

## Мониторинг и логи

### PM2 мониторинг

```bash
# Просмотр статуса
pm2 status

# Просмотр логов
pm2 logs smartdef

# Мониторинг в реальном времени
pm2 monit
```

### Логи приложения

```bash
# Просмотр логов Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Просмотр логов приложения
pm2 logs smartdef --lines 100
```

## Безопасность

### 1. Настройка файрвола

```bash
# Установка UFW
sudo apt-get install ufw

# Настройка правил
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### 2. Обновление зависимостей

```bash
# Проверка уязвимостей
npm audit

# Обновление зависимостей
npm update
```

### 3. Резервное копирование

```bash
# Создание скрипта для бэкапа
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump smartdef > backup_$DATE.sql
```

## Устранение неполадок

### Частые проблемы

1. **Ошибка подключения к базе данных**
   - Проверьте настройки DATABASE_URL в .env
   - Убедитесь, что PostgreSQL запущен

2. **Telegram Web App не работает**
   - Проверьте токен бота
   - Убедитесь, что URL Web App корректный

3. **Ошибки CORS**
   - Проверьте настройки CORS_ORIGIN в .env
   - Убедитесь, что домен добавлен в настройки

### Логи и отладка

```bash
# Включение подробных логов
NODE_ENV=development DEBUG=* npm run dev

# Просмотр логов в реальном времени
tail -f logs/app.log
```

## Поддержка

Если у вас возникли проблемы:

1. Проверьте раздел "Устранение неполадок"
2. Создайте issue в GitHub
3. Обратитесь в Telegram: @smartdef_support

---

*Удачной разработки! 🚀* 