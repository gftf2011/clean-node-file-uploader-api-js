const POSTGRES_DB = 'mockdb';
const POSTGRES_USER = 'mockuser';
const POSTGRES_PASSWORD = 'mockpassword';
const POSTGRES_PORT = '3333';
const POSTGRES_HOST = 'mockhost';
const POSTGRES_MAX = '1';

jest.mock(
  '../../../src/infra/helpers/template-methods/postgresql-driver-template-methods',
  () => ({
    connect({ host, database, user, password, port, max }) {
      this.pool = { host, database, user, password, port, max };
    },
  }),
);

jest.mock('../../../src/main/config/postgresql', () => ({
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  port: POSTGRES_PORT,
  max: POSTGRES_MAX,
}));

const loader = require('../../../src/main/loader');

const DatabaseDriverTemplatesMethods = require('../../../src/infra/helpers/template-methods/postgresql-driver-template-methods');

describe('Loader', () => {
  it('Should load databases when method is called', async () => {
    await loader();
    expect(DatabaseDriverTemplatesMethods.pool.host).toBe(POSTGRES_HOST);
    expect(DatabaseDriverTemplatesMethods.pool.database).toBe(POSTGRES_DB);
    expect(DatabaseDriverTemplatesMethods.pool.user).toBe(POSTGRES_USER);
    expect(DatabaseDriverTemplatesMethods.pool.password).toBe(
      POSTGRES_PASSWORD,
    );
    expect(DatabaseDriverTemplatesMethods.pool.port).toBe(POSTGRES_PORT);
    expect(DatabaseDriverTemplatesMethods.pool.max).toBe(POSTGRES_MAX);
  });
});
