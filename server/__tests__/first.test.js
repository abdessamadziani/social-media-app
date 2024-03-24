const app = require('../server'); // Importing the router
const request = require('supertest');


describe('GET /api/data', () => {
  it('responds with JSON containing message and data', async () => {
    const response = await request(app).get('/api/posts/api/data'); // Correct the URL path
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Data retrieved successfully',
      data: { name: 'John', age: 30 }
    });
  });
});


