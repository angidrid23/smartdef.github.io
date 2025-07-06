const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Mock data for demonstration
const mockUsers = [
    {
        id: 1,
        telegramId: '123456789',
        username: 'test_user',
        balance: 2847.32,
        totalProfit: 147.32,
        profitPercentage: 5.45
    }
];

const mockInvestments = [
    {
        id: 1,
        userId: 1,
        strategy: 'Консервативная',
        amount: 1000,
        currentValue: 1045.20,
        profit: 45.20,
        profitPercentage: 4.52,
        status: 'active',
        startDate: '2024-01-15',
        protocols: ['Aave', 'Compound', 'Uniswap V3'],
        allocation: {
            'Стейблкоины': 60,
            'Лендинг': 30,
            'DEX': 10
        }
    },
    {
        id: 2,
        userId: 1,
        strategy: 'Умеренная',
        amount: 1500,
        currentValue: 1580.12,
        profit: 80.12,
        profitPercentage: 5.34,
        status: 'active',
        startDate: '2024-01-20',
        protocols: ['Yearn Finance', 'SushiSwap', 'Balancer'],
        allocation: {
            'Стейблкоины': 40,
            'Yield Farming': 35,
            'DeFi': 25
        }
    }
];

const strategies = {
    conservative: {
        name: 'Консервативная',
        minYield: 3,
        maxYield: 8,
        risk: 'Низкий',
        description: 'Стабильный доход с минимальными рисками',
        protocols: ['Aave', 'Compound', 'Uniswap V3', 'Curve Finance'],
        minAmount: 10,
        maxAmount: 1000000,
        allocation: {
            'Стейблкоины': 60,
            'Лендинг': 30,
            'DEX': 10
        }
    },
    moderate: {
        name: 'Умеренная',
        minYield: 8,
        maxYield: 15,
        risk: 'Средний',
        description: 'Сбалансированный подход с умеренными рисками',
        protocols: ['Aave', 'Compound', 'Yearn Finance', 'SushiSwap', 'Balancer'],
        minAmount: 50,
        maxAmount: 500000,
        allocation: {
            'Стейблкоины': 40,
            'Yield Farming': 35,
            'DeFi': 25
        }
    },
    aggressive: {
        name: 'Агрессивная',
        minYield: 15,
        maxYield: 30,
        risk: 'Высокий',
        description: 'Максимальная доходность с высокими рисками',
        protocols: ['Yearn Finance', 'SushiSwap', 'Balancer', 'Curve Finance'],
        minAmount: 100,
        maxAmount: 100000,
        allocation: {
            'Стейблкоины': 20,
            'Yield Farming': 50,
            'Рискованные пулы': 30
        }
    }
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Get user portfolio
app.get('/api/portfolio/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const user = mockUsers.find(u => u.id === userId);
    
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    const userInvestments = mockInvestments.filter(inv => inv.userId === userId);
    
    res.json({
        user: {
            id: user.id,
            balance: user.balance,
            totalProfit: user.totalProfit,
            profitPercentage: user.profitPercentage
        },
        investments: userInvestments
    });
});

// Get available strategies
app.get('/api/strategies', (req, res) => {
    res.json(strategies);
});

// Create new investment
app.post('/api/investments', (req, res) => {
    const { userId, strategy, amount } = req.body;
    
    if (!userId || !strategy || !amount) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const strategyData = strategies[strategy];
    if (!strategyData) {
        return res.status(400).json({ error: 'Invalid strategy' });
    }
    
    if (amount < strategyData.minAmount || amount > strategyData.maxAmount) {
        return res.status(400).json({ 
            error: `Amount must be between ${strategyData.minAmount} and ${strategyData.maxAmount}` 
        });
    }
    
    const newInvestment = {
        id: mockInvestments.length + 1,
        userId: parseInt(userId),
        strategy: strategyData.name,
        amount: parseFloat(amount),
        currentValue: parseFloat(amount),
        profit: 0,
        profitPercentage: 0,
        status: 'pending',
        startDate: new Date().toISOString().split('T')[0],
        protocols: strategyData.protocols,
        allocation: strategyData.allocation
    };
    
    mockInvestments.push(newInvestment);
    
    res.status(201).json({
        message: 'Investment created successfully',
        investment: newInvestment
    });
});

// Get investment details
app.get('/api/investments/:id', (req, res) => {
    const investmentId = parseInt(req.params.id);
    const investment = mockInvestments.find(inv => inv.id === investmentId);
    
    if (!investment) {
        return res.status(404).json({ error: 'Investment not found' });
    }
    
    res.json(investment);
});

// Withdraw investment
app.post('/api/investments/:id/withdraw', (req, res) => {
    const investmentId = parseInt(req.params.id);
    const investment = mockInvestments.find(inv => inv.id === investmentId);
    
    if (!investment) {
        return res.status(404).json({ error: 'Investment not found' });
    }
    
    if (investment.status !== 'active') {
        return res.status(400).json({ error: 'Investment is not active' });
    }
    
    // Simulate withdrawal process
    investment.status = 'withdrawing';
    
    res.json({
        message: 'Withdrawal request submitted',
        investment: investment
    });
});

// Get analytics data
app.get('/api/analytics/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const userInvestments = mockInvestments.filter(inv => inv.userId === userId);
    
    const totalInvested = userInvestments.reduce((sum, inv) => sum + inv.amount, 0);
    const totalValue = userInvestments.reduce((sum, inv) => sum + inv.currentValue, 0);
    const totalProfit = userInvestments.reduce((sum, inv) => sum + inv.profit, 0);
    
    const analytics = {
        totalInvested,
        totalValue,
        totalProfit,
        profitPercentage: totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0,
        activeInvestments: userInvestments.filter(inv => inv.status === 'active').length,
        monthlyData: [
            { month: 'Янв', profit: 12 },
            { month: 'Фев', profit: 19 },
            { month: 'Мар', profit: 3 },
            { month: 'Апр', profit: 5 },
            { month: 'Май', profit: 2 },
            { month: 'Июн', profit: 3 }
        ]
    };
    
    res.json(analytics);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`SmartDef API server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app; 