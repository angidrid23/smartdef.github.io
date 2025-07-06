const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// Замените на ваш токен от BotFather
const token = process.env.TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE';
const webAppUrl = process.env.WEBAPP_URL || 'https://your-ngrok-url.ngrok.io';

const bot = new TelegramBot(token, { polling: true });

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.first_name;
    
    bot.sendMessage(chatId, 
        `Привет, ${username}! 👋\n\nДобро пожаловать в SmartDef - упрощенное DeFi инвестирование!\n\nВыберите действие:`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: '🚀 Открыть SmartDef', web_app: { url: webAppUrl } }],
                [{ text: '📊 Стратегии', callback_data: 'strategies' }],
                [{ text: '💰 Мой портфель', callback_data: 'portfolio' }],
                [{ text: '📈 Аналитика', callback_data: 'analytics' }]
            ]
        }
    });
});

// Обработчик callback запросов
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;
    
    switch(data) {
        case 'strategies':
            bot.sendMessage(chatId, 
                '📊 **Инвестиционные стратегии SmartDef:**\n\n' +
                '🟢 **Консервативная** (3-8% годовых)\n' +
                '• Низкий риск\n' +
                '• Стейблкоины + проверенные протоколы\n\n' +
                '🟡 **Умеренная** (8-15% годовых)\n' +
                '• Средний риск\n' +
                '• Сбалансированный подход\n\n' +
                '🔴 **Агрессивная** (15-30% годовых)\n' +
                '• Высокий риск\n' +
                '• Максимальная доходность\n\n' +
                'Откройте приложение для инвестирования:', {
                parse_mode: 'Markdown',
                reply_markup: {
                    inline_keyboard: [
                        [{ text: '🚀 Открыть SmartDef', web_app: { url: webAppUrl } }]
                    ]
                }
            });
            break;
            
        case 'portfolio':
            bot.sendMessage(chatId, 
                '💰 **Ваш портфель:**\n\n' +
                '📊 Общая стоимость: $2,847.32\n' +
                '📈 Прибыль: +$147.32 (+5.45%)\n' +
                '🎯 Активные инвестиции: 3 стратегии\n\n' +
                'Откройте приложение для детального просмотра:', {
                parse_mode: 'Markdown',
                reply_markup: {
                    inline_keyboard: [
                        [{ text: '📊 Открыть портфель', web_app: { url: webAppUrl + '/portfolio.html' } }]
                    ]
                }
            });
            break;
            
        case 'analytics':
            bot.sendMessage(chatId, 
                '📈 **Аналитика SmartDef:**\n\n' +
                '📊 Доходность за месяц: +5.45%\n' +
                '📈 Лучшая стратегия: Умеренная (+5.34%)\n' +
                '🎯 Общий объем под управлением: $2,847\n\n' +
                'Откройте приложение для подробной аналитики:', {
                parse_mode: 'Markdown',
                reply_markup: {
                    inline_keyboard: [
                        [{ text: '📈 Открыть аналитику', web_app: { url: webAppUrl + '/analytics.html' } }]
                    ]
                }
            });
            break;
    }
    
    // Отвечаем на callback query
    bot.answerCallbackQuery(query.id);
});

// Обработчик web app данных
bot.on('web_app_data', (msg) => {
    const chatId = msg.chat.id;
    const data = msg.web_app_data.data;
    
    try {
        const parsedData = JSON.parse(data);
        console.log('Получены данные от Web App:', parsedData);
        
        // Обработка данных от Web App
        if (parsedData.action === 'investment_created') {
            bot.sendMessage(chatId, 
                `🎉 **Инвестиция создана!**\n\n` +
                `Стратегия: ${parsedData.strategy}\n` +
                `Сумма: $${parsedData.amount}\n` +
                `Статус: В обработке\n\n` +
                `Мы уведомим вас, когда инвестиция будет активирована.`, {
                parse_mode: 'Markdown'
            });
        }
    } catch (error) {
        console.error('Ошибка парсинга данных Web App:', error);
    }
});

// Обработчик ошибок
bot.on('error', (error) => {
    console.error('Ошибка Telegram Bot:', error);
});

// Обработчик polling ошибок
bot.on('polling_error', (error) => {
    console.error('Ошибка polling:', error);
});

console.log('🤖 SmartDef Telegram Bot запущен!');
console.log('📱 Web App URL:', webAppUrl);
console.log('💡 Отправьте /start вашему боту для начала работы');

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('🛑 Остановка бота...');
    bot.stopPolling();
    process.exit(0);
});

module.exports = bot; 