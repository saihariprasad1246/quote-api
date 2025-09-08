// server.js
const express = require('express');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const PORT = process.env.PORT || 3000;

// Quotes
const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
    "Act as if what you do makes a difference. It does. - William James",
    "Dream big and dare to fail. - Norman Vaughan"
];

// Middleware
app.use(morgan(':remote-addr :status :method :url :response-time ms'));
app.use(cors());

// Rate limiter
const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: (req, res) => {
        const retrySecs = Math.ceil((req.rateLimit.resetTime - new Date()) / 1000);
        return { error: `Rate limit exceeded. Try again in ${retrySecs} seconds.` };
    },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use('/api/quote', limiter);

// Swagger setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Quote API',
            version: '1.0.0',
            description: 'Random inspirational quotes API with rate limiting',
        },
        servers: [
            { url: `http://localhost:${PORT}` }
        ],
    },
    apis: ['./server.js'],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

/**
 * @swagger
 * /api/quote:
 *   get:
 *     summary: Get a random inspirational quote
 *     tags:
 *       - Quotes
 *     responses:
 *       200:
 *         description: A random quote
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 quote:
 *                   type: string
 *                   example: "The only way to do great work is to love what you do. - Steve Jobs"
 *       429:
 *         description: Rate limit exceeded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Rate limit exceeded. Try again in 45 seconds."
 */

// GET /api/quote
app.get('/api/quote', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    res.json({ quote: quotes[randomIndex] });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});

module.exports = app; // Export app for testing
