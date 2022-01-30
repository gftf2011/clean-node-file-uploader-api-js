const request = require('supertest');

jest.mock('../../../src/main/config/routes', () => jest.fn());

describe('Content-Type Middleware', () => {
  let server;

  beforeEach(() => {
    jest.resetModules();
    // eslint-disable-next-line global-require
    server = require('../../../src/main/server');
  });

  it('Should return json content-type as default', async () => {
    server.get('/api/test-content-type', (_req, res) => {
      res.send('');
    });
    await request(server)
      .get('/api/test-content-type')
      .expect('content-type', /json/);
  });

  it('Should return xml content-type if required', async () => {
    server.get('/api/test-content-type', (_req, res) => {
      res.type('xml');
      res.send('');
    });
    await request(server)
      .get('/api/test-content-type')
      .expect('content-type', /xml/);
  });
});
