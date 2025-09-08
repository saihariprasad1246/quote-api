const request = require('supertest');
const app = require('./server'); // Import the app

describe('Quote API Rate Limiting', () => {
    it('should allow up to 5 requests', async () => {
        for (let i = 0; i < 5; i++) {
            const res = await request(app).get('/api/quote');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('quote');
        }
    });

    it('should block the 6th request', async () => {
        for (let i = 0; i < 5; i++) {
            await request(app).get('/api/quote');
        }
        const res = await request(app).get('/api/quote');
        expect(res.statusCode).toBe(429);
        expect(res.body).toHaveProperty('error');
    });
});
