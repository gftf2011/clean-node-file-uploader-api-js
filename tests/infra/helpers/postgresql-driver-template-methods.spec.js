jest.mock(
  '../../../src/infra/helpers/template-methods/singleton/postgresql-pool-singleton',
);

const faker = require('faker');

const PostgresqlDriverTemplateMethods = require('../../../src/infra/helpers/template-methods/postgresql-driver-template-methods');
const PostgresqlPoolSingleton = require('../../../src/infra/helpers/template-methods/singleton/postgresql-pool-singleton');

describe('PostgreSQL Driver', () => {
  // eslint-disable-next-line jest/expect-expect
  it('Should set connection when variables are provided', () => {
    PostgresqlPoolSingleton.mockImplementation(() => {
      return {
        getInstance: (_host, _database, _user, _password, _port, _max) => {
          return {};
        },
      };
    });
    const fakeIp = faker.internet.ip();
    const fakePort = faker.internet.port();
    const fakeHost = `${fakeIp}:${fakePort}`;
    const fakeUser = faker.lorem.word(30);
    const fakeDb = faker.lorem.word(30);
    const fakePassword = faker.internet.password(64, false);
    const fakeMax = faker.datatype.number();
    expect(PostgresqlDriverTemplateMethods.pool).toBeUndefined();
    PostgresqlDriverTemplateMethods.connect({
      host: fakeHost,
      database: fakeDb,
      user: fakeUser,
      password: fakePassword,
      port: fakePort,
      max: fakeMax,
    });
    expect(PostgresqlDriverTemplateMethods.pool).not.toBeUndefined();
  });
});
