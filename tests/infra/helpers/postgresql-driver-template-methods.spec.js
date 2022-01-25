jest.mock(
  '../../../src/infra/helpers/template-methods/singleton/postgresql-pool-singleton',
);

const faker = require('faker');

const PostgresqlDriverTemplateMethods = require('../../../src/infra/helpers/template-methods/postgresql-driver-template-methods');
const PostgresqlPoolSingleton = require('../../../src/infra/helpers/template-methods/singleton/postgresql-pool-singleton');

describe('PostgreSQL Driver', () => {
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

  it('Should disconnect from server after set connection', async () => {
    PostgresqlPoolSingleton.mockImplementation(() => {
      return {
        getInstance: (_host, _database, _user, _password, _port, _max) => {
          return {
            end: jest.fn(),
          };
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
    await PostgresqlDriverTemplateMethods.disconnect();
    const spyDisconnect = jest.spyOn(
      PostgresqlDriverTemplateMethods.pool,
      'end',
    );
    expect(spyDisconnect).toHaveBeenCalled();
    expect(spyDisconnect).toHaveBeenCalledTimes(1);
  });

  it('Should create client after connection', async () => {
    PostgresqlPoolSingleton.mockImplementation(() => {
      return {
        getInstance: (_host, _database, _user, _password, _port, _max) => {
          return {
            connect: jest.fn().mockImplementation(() => ({})),
          };
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
    PostgresqlDriverTemplateMethods.connect({
      host: fakeHost,
      database: fakeDb,
      user: fakeUser,
      password: fakePassword,
      port: fakePort,
      max: fakeMax,
    });
    const client = await PostgresqlDriverTemplateMethods.getClientConnect();
    const spyClientConnect = jest.spyOn(
      PostgresqlDriverTemplateMethods.pool,
      'connect',
    );
    expect(client).not.toBeUndefined();
    expect(spyClientConnect).toHaveBeenCalled();
    expect(spyClientConnect).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    PostgresqlDriverTemplateMethods.pool = undefined;
  });
});
