jest.mock(
  '../../../src/infra/helpers/template-methods/singleton/postgresql-pool-singleton',
);

const faker = require('faker');

const PostgresqlDriverTemplateMethods = require('../../../src/infra/helpers/template-methods/postgresql-driver-template-methods');
const PostgresqlPoolSingleton = require('../../../src/infra/helpers/template-methods/singleton/postgresql-pool-singleton');

describe('PostgreSQL Driver', () => {
  let fakeIp;
  let fakePort;
  let fakeHost;
  let fakeUser;
  let fakeDb;
  let fakePassword;
  let fakeMax;

  beforeEach(() => {
    fakeIp = faker.internet.ip();
    fakePort = faker.internet.port();
    fakeHost = `${fakeIp}:${fakePort}`;
    fakeUser = faker.lorem.word(30);
    fakeDb = faker.lorem.word(30);
    fakePassword = faker.internet.password(64, false);
    fakeMax = faker.datatype.number();
  });

  it('Should set connection when variables are provided', () => {
    PostgresqlPoolSingleton.mockImplementation(() => {
      return {
        getInstance: (_host, _database, _user, _password, _port, _max) => {
          return {};
        },
      };
    });
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

  it('Should disconnect client after create connection', async () => {
    PostgresqlPoolSingleton.mockImplementation(() => {
      return {
        getInstance: (_host, _database, _user, _password, _port, _max) => {
          return {
            connect: jest.fn().mockImplementation(() => ({
              end: jest.fn(),
            })),
          };
        },
      };
    });
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
    const spyClientDisconnect = jest.spyOn(client, 'end');
    expect(client).not.toBeUndefined();
    expect(spyClientConnect).toHaveBeenCalled();
    expect(spyClientConnect).toHaveBeenCalledTimes(1);
    await PostgresqlDriverTemplateMethods.clientDisconnect(client);
    expect(spyClientDisconnect).toHaveBeenCalled();
    expect(spyClientDisconnect).toHaveBeenCalledTimes(1);
  });

  afterEach(() => {
    PostgresqlDriverTemplateMethods.pool = undefined;
  });
});
