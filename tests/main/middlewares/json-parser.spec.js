const request = require('supertest');

jest.mock('../../../src/main/config/routes', () => jest.fn());

const server = require('../../../src/main/server');

describe('JSON Parser Middleware', () => {
  it('Should parse JSON request', async () => {
    server.post('/api/test-json-parser', (req, res) => {
      res.send(req.body);
    });
    await request(server)
      .post('/api/test-json-parser')
      .send({ test: true })
      .expect({ test: true });
  });
});
