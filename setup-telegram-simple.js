const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN || '7274357474:AAHFemXpYzc9PLCQ7-hxEwCtNYqKNusEb6A';

const bot = new TelegramBot(token, { polling: true });

console.log('🤖 SmartDef Telegram Bot запущен!');
console.log('💡 Отправьте /start вашему боту для начала работы');

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.first_name;
    
    bot.sendMessage(chatId, 
        `Привет, ${username}! 👋\n\nДобро пожаловать в SmartDef - упрощенное DeFi инвестирование!\n\nВыберите действие:`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: '📊 Стратегии инвестирования', callback_data: 'strategies' }],
                [{ text: '💰 Мой портфель', callback_data: 'portfolio' }],
                [{ text: '📈 Аналитика', callback_data: 'analytics' }],
                [{ text: '💳 Пополнить счет', callback_data: 'deposit' }],
                [{ text: '💸 Вывести средства', callback_data: 'withdraw' }]
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
                '• Стейблкоины + проверенные протоколы\n' +
                '• Минимум: $10, Максимум: $1,000,000\n\n' +
                '🟡 **Умеренная** (8-15% годовых)\n' +
                '• Средний риск\n' +
                '• Сбалансированный подход\n' +
                '• Минимум: $50, Максимум: $500,000\n\n' +
                '🔴 **Агрессивная** (15-30% годовых)\n' +
                '• Высокий риск\n' +
                '• Максимальная доходность\n' +
                '• Минимум: $100, Максимум: $100,000\n\n' +
                'Для инвестирования выберите стратегию:', {
                parse_mode: 'Markdown',
                reply_markup: {
                    inline_keyboard: [
                        [{ text: '🟢 Консервативная', callback_data: 'invest_conservative' }],
                        [{ text: '🟡 Умеренная', callback_data: 'invest_moderate' }],
                        [{ text: '🔴 Агрессивная', callback_data: 'invest_aggressive' }],
                        [{ text: '🔙 Назад', callback_data: 'back_to_main' }]
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
                '**Детали инвестиций:**\n' +
                '• Консервативная: $1,045.20 (+4.52%)\n' +
                '• Умеренная: $1,580.12 (+5.34%)\n' +
                '• Агрессивная: $222.00 (+4.40%)\n\n' +
                'Выберите действие:', {
                parse_mode: 'Markdown',
                reply_markup: {
                    inline_keyboard: [
                        [{ text: '📊 Детали инвестиций', callback_data: 'portfolio_details' }],
                        [{ text: '💸 Вывести средства', callback_data: 'withdraw' }],
                        [{ text: '🔙 Назад', callback_data: 'back_to_main' }]
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
                '**Статистика за 6 месяцев:**\n' +
                '• Январь: +$12\n' +
                '• Февраль: +$19\n' +
                '• Март: +$3\n' +
                '• Апрель: +$5\n' +
                '• Май: +$2\n' +
                '• Июнь: +$3\n\n' +
                '**Прогноз на следующий месяц:** +4.2%', {
                parse_mode: 'Markdown',
                reply_markup: {
                    inline_keyboard: [
                        [{ text: '📊 Подробная аналитика', callback_data: 'analytics_detailed' }],
                        [{ text: '🔙 Назад', callback_data: 'back_to_main' }]
                    ]
                }
            });
            break;
            
        case 'deposit':
            bot.sendMessage(chatId, 
                '💳 **Пополнение счета:**\n\n' +
                'Выберите способ пополнения:\n\n' +
                '💰 **Банковская карта**\n' +
                '• Комиссия: 2.5%\n' +
                '• Время: Мгновенно\n\n' +
                '🏦 **Банковский перевод**\n' +
                '• Комиссия: 0%\n' +
                '• Время: 1-3 дня\n\n' +
                '₿ **Криптовалюта**\n' +
                '• Комиссия: 0.1%\n' +
                '• Время: 10-30 минут', {
                parse_mode: 'Markdown',
                reply_markup: {
                    inline_keyboard: [
                        [{ text: '💳 Банковская карта', callback_data: 'deposit_card' }],
                        [{ text: '🏦 Банковский перевод', callback_data: 'deposit_bank' }],
                        [{ text: '₿ Криптовалюта', callback_data: 'deposit_crypto' }],
                        [{ text: '🔙 Назад', callback_data: 'back_to_main' }]
                    ]
                }
            });
            break;
            
        case 'withdraw':
            bot.sendMessage(chatId, 
                '💸 **Вывод средств:**\n\n' +
                '💰 Доступно для вывода: $2,847.32\n' +
                '📊 Минимальная сумма: $10\n\n' +
                'Выберите способ вывода:\n\n' +
                '💳 **Банковская карта**\n' +
                '• Комиссия: 1.5%\n' +
                '• Время: 1-3 дня\n\n' +
                '🏦 **Банковский счет**\n' +
                '• Комиссия: 0.5%\n' +
                '• Время: 2-5 дней\n\n' +
                '₿ **Криптовалюта**\n' +
                '• Комиссия: 0.1%\n' +
                '• Время: 10-30 минут', {
                parse_mode: 'Markdown',
                reply_markup: {
                    inline_keyboard: [
                        [{ text: '💳 На карту', callback_data: 'withdraw_card' }],
                        [{ text: '🏦 На счет', callback_data: 'withdraw_bank' }],
                        [{ text: '₿ Криптовалюта', callback_data: 'withdraw_crypto' }],
                        [{ text: '🔙 Назад', callback_data: 'back_to_main' }]
                    ]
                }
            });
            break;
            
        case 'invest_conservative':
            bot.sendMessage(chatId, 
                '🟢 **Консервативная стратегия**\n\n' +
                '📊 Ожидаемая доходность: 3-8% годовых\n' +
                '⚠️ Уровень риска: Низкий\n\n' +
                '**Распределение средств:**\n' +
                '• 60% - Стейблкоины (USDT, USDC, DAI)\n' +
                '• 30% - Лендинг протоколы (Aave, Compound)\n' +
                '• 10% - Ликвидность в крупных DEX\n\n' +
                '**Протоколы:** Aave, Compound, Uniswap V3, Curve Finance\n\n' +
                'Для инвестирования отправьте сумму в USDT:', {
                parse_mode: 'Markdown',
                reply_markup: {
                    inline_keyboard: [
                        [{ text: '💰 Инвестировать $100', callback_data: 'invest_100_conservative' }],
                        [{ text: '💰 Инвестировать $500', callback_data: 'invest_500_conservative' }],
                        [{ text: '💰 Инвестировать $1000', callback_data: 'invest_1000_conservative' }],
                        [{ text: '🔙 Назад к стратегиям', callback_data: 'strategies' }]
                    ]
                }
            });
            break;
            
        case 'invest_moderate':
            bot.sendMessage(chatId, 
                '🟡 **Умеренная стратегия**\n\n' +
                '📊 Ожидаемая доходность: 8-15% годовых\n' +
                '⚠️ Уровень риска: Средний\n\n' +
                '**Распределение средств:**\n' +
                '• 40% - Стейблкоины\n' +
                '• 35% - Лендинг и yield farming\n' +
                '• 25% - Ликвидность в DeFi протоколах\n\n' +
                '**Протоколы:** Aave, Compound, Yearn Finance, SushiSwap, Balancer\n\n' +
                'Для инвестирования отправьте сумму в USDT:', {
                parse_mode: 'Markdown',
                reply_markup: {
                    inline_keyboard: [
                        [{ text: '💰 Инвестировать $100', callback_data: 'invest_100_moderate' }],
                        [{ text: '💰 Инвестировать $500', callback_data: 'invest_500_moderate' }],
                        [{ text: '💰 Инвестировать $1000', callback_data: 'invest_1000_moderate' }],
                        [{ text: '🔙 Назад к стратегиям', callback_data: 'strategies' }]
                    ]
                }
            });
            break;
            
        case 'invest_aggressive':
            bot.sendMessage(chatId, 
                '🔴 **Агрессивная стратегия**\n\n' +
                '📊 Ожидаемая доходность: 15-30% годовых\n' +
                '⚠️ Уровень риска: Высокий\n\n' +
                '**Распределение средств:**\n' +
                '• 20% - Стейблкоины\n' +
                '• 50% - Yield farming и новые протоколы\n' +
                '• 30% - Ликвидность в рискованных пулах\n\n' +
                '**Протоколы:** Yearn Finance, SushiSwap, Balancer, Curve Finance, New DeFi Protocols\n\n' +
                'Для инвестирования отправьте сумму в USDT:', {
                parse_mode: 'Markdown',
                reply_markup: {
                    inline_keyboard: [
                        [{ text: '💰 Инвестировать $100', callback_data: 'invest_100_aggressive' }],
                        [{ text: '💰 Инвестировать $500', callback_data: 'invest_500_aggressive' }],
                        [{ text: '💰 Инвестировать $1000', callback_data: 'invest_1000_aggressive' }],
                        [{ text: '🔙 Назад к стратегиям', callback_data: 'strategies' }]
                    ]
                }
            });
            break;
            
        case 'back_to_main':
            bot.sendMessage(chatId, 
                `Выберите действие:`, {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: '📊 Стратегии инвестирования', callback_data: 'strategies' }],
                        [{ text: '💰 Мой портфель', callback_data: 'portfolio' }],
                        [{ text: '📈 Аналитика', callback_data: 'analytics' }],
                        [{ text: '💳 Пополнить счет', callback_data: 'deposit' }],
                        [{ text: '💸 Вывести средства', callback_data: 'withdraw' }]
                    ]
                }
            });
            break;
            
        default:
            if (data.startsWith('invest_')) {
                const [action, amount, strategy] = data.split('_');
                const strategyNames = {
                    'conservative': 'Консервативную',
                    'moderate': 'Умеренную',
                    'aggressive': 'Агрессивную'
                };
                
                bot.sendMessage(chatId, 
                    `🎉 **Инвестиция создана!**\n\n` +
                    `💰 Сумма: $${amount}\n` +
                    `📊 Стратегия: ${strategyNames[strategy]}\n` +
                    `⏱ Статус: В обработке\n\n` +
                    `Мы уведомим вас, когда инвестиция будет активирована.`, {
                    parse_mode: 'Markdown',
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: '📊 Посмотреть портфель', callback_data: 'portfolio' }],
                            [{ text: '🔙 Главное меню', callback_data: 'back_to_main' }]
                        ]
                    }
                });
            } else {
                bot.sendMessage(chatId, 'Выберите действие из меню ниже:', {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: '📊 Стратегии инвестирования', callback_data: 'strategies' }],
                            [{ text: '💰 Мой портфель', callback_data: 'portfolio' }],
                            [{ text: '📈 Аналитика', callback_data: 'analytics' }],
                            [{ text: '💳 Пополнить счет', callback_data: 'deposit' }],
                            [{ text: '💸 Вывести средства', callback_data: 'withdraw' }]
                        ]
                    }
                });
            }
    }
    
    // Отвечаем на callback query
    bot.answerCallbackQuery(query.id);
});

// Обработчик ошибок
bot.on('error', (error) => {
    console.error('Ошибка Telegram Bot:', error);
});

// Обработчик polling ошибок
bot.on('polling_error', (error) => {
    console.error('Ошибка polling:', error);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('🛑 Остановка бота...');
    bot.stopPolling();
    process.exit(0);
});

module.exports = bot; 