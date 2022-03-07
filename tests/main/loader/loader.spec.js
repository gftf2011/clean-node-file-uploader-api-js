const POSTGRES_DB = 'mockdb';
const POSTGRES_USER = 'mockuser';
const POSTGRES_PASSWORD = 'mockpassword';
const POSTGRES_PORT = '3333';
const POSTGRES_HOST = 'mockhost';
const POSTGRES_MAX = '1';

jest.mock('../../../src/infra/helpers/postgresql-driver', () => ({
  connect({ host, database, user, password, port, max }) {
    this.pool = { host, database, user, password, port, max };
  },
}));

jest.mock('../../../src/main/config/postgresql', () => ({
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  port: POSTGRES_PORT,
  max: POSTGRES_MAX,
}));

const loader = require('../../../src/main/loader');

const DatabaseDriver = require('../../../src/infra/helpers/postgresql-driver');

describe('Loader', () => {
  it('Should load databases when method is called', async () => {
    await loader();
    expect(DatabaseDriver.pool.host).toBe(POSTGRES_HOST);
    expect(DatabaseDriver.pool.database).toBe(POSTGRES_DB);
    expect(DatabaseDriver.pool.user).toBe(POSTGRES_USER);
    expect(DatabaseDriver.pool.password).toBe(POSTGRES_PASSWORD);
    expect(DatabaseDriver.pool.port).toBe(POSTGRES_PORT);
    expect(DatabaseDriver.pool.max).toBe(POSTGRES_MAX);
  });
});
