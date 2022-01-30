const request = require('supertest');

jest.mock('../../../src/main/config/routes', () => jest.fn());

const server = require('../../../src/main/server');

describe('CORS Middleware', () => {
  it('Should enable CORS', async () => {
    server.get('/api/test-enable-cors', (_req, res) => {
      res.send('');
    });
    const response = await request(server).get('/api/test-enable-cors');

    expect(response.headers['access-control-allow-origin']).toBe('*');
    expect(response.headers['access-control-allow-methods']).toBe('*');
    expect(response.headers['access-control-allow-headers']).toBe('*');
  });
});
