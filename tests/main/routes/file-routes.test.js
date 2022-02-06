const { resolve, basename, join } = require('path');
const fs = require('fs');

const request = require('supertest');

const app = require('../../../src/main/server');
const routes = require('../../../src/main/config/routes');

const PostgresqlDriverTemplateMethods = require('../../../src/infra/helpers/template-methods/postgresql-driver-template-methods');

require('../../../src/main/bootstrap');

const config = require('../../../src/main/config/postgresql');

describe('File Routes', () => {
  beforeAll(async () => {
    PostgresqlDriverTemplateMethods.connect(config);
    routes(app);
  });

  it('Should return 201 when valid PNG file is provided', async () => {
    const filePath = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'public',
      'test',
      'test-image.png',
    );
    const dirPath = resolve(__dirname, '..', '..', '..', 'temp', 'uploads');
    const response = await request(app)
      .post('/api/file')
      .attach('file', filePath);
    const { originalname } = JSON.parse(response.text);
    const { filename } = JSON.parse(response.text);

    expect(response.status).toBe(201);
    expect(originalname).toBe(basename(filePath));
    expect(fs.existsSync(join(dirPath, filename))).toBe(true);
  });

  it('Should return 201 when valid JPG file is provided', async () => {
    const filePath = resolve(
      __dirname,
      '..',
      '..',
      '..',
      'public',
      'test',
      'test-image.jpg',
    );
    const dirPath = resolve(__dirname, '..', '..', '..', 'temp', 'uploads');
    const response = await request(app)
      .post('/api/file')
      .attach('file', filePath);
    const { originalname } = JSON.parse(response.text);
    const { filename } = JSON.parse(response.text);

    expect(response.status).toBe(201);
    expect(originalname).toBe(basename(filePath));
    expect(fs.existsSync(join(dirPath, filename))).toBe(true);
  });

  afterEach(async () => {
    const client = await PostgresqlDriverTemplateMethods.getClientConnect();
    await client.query('BEGIN');
    await client.query('DELETE FROM files RETURNING *', []);
    await client.query('COMMIT');
    await PostgresqlDriverTemplateMethods.clientDisconnect(client);
  });

  afterAll(async () => {
    await PostgresqlDriverTemplateMethods.disconnect();
  });
});
