const request = require('supertest');

jest.mock('../../../src/main/config/routes', () => jest.fn());

const server = require('../../../src/main/server');

describe('App Setup', () => {
  it('Should disable "X-Powered-By" response header', async () => {
    server.get('/api/test-x-powered-by', (_req, res) => {
      res.send('');
    });
    const response = await request(server).get('/api/test-x-powered-by');

    expect(response.headers['x-powered-by']).toBeUndefined();
  });
});
