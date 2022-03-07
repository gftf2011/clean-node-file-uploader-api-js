jest.mock('../../../src/infra/helpers/singleton/postgresql-pool-singleton');

const faker = require('faker');

const PostgresqlDriver = require('../../../src/infra/helpers/postgresql-driver');
const PostgresqlPoolSingleton = require('../../../src/infra/helpers/singleton/postgresql-pool-singleton');

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
    expect(PostgresqlDriver.pool).toBeUndefined();
    PostgresqlDriver.connect({
      host: fakeHost,
      database: fakeDb,
      user: fakeUser,
      password: fakePassword,
      port: fakePort,
      max: fakeMax,
    });
    expect(PostgresqlDriver.pool).not.toBeUndefined();
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
    expect(PostgresqlDriver.pool).toBeUndefined();
    PostgresqlDriver.connect({
      host: fakeHost,
      database: fakeDb,
      user: fakeUser,
      password: fakePassword,
      port: fakePort,
      max: fakeMax,
    });
    expect(PostgresqlDriver.pool).not.toBeUndefined();
    await PostgresqlDriver.disconnect();
    const spyDisconnect = jest.spyOn(PostgresqlDriver.pool, 'end');
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
    PostgresqlDriver.connect({
      host: fakeHost,
      database: fakeDb,
      user: fakeUser,
      password: fakePassword,
      port: fakePort,
      max: fakeMax,
    });
    const client = await PostgresqlDriver.getClientConnect();
    const spyClientConnect = jest.spyOn(PostgresqlDriver.pool, 'connect');
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
              release: jest.fn(),
            })),
          };
        },
      };
    });
    PostgresqlDriver.connect({
      host: fakeHost,
      database: fakeDb,
      user: fakeUser,
      password: fakePassword,
      port: fakePort,
      max: fakeMax,
    });
    const client = await PostgresqlDriver.getClientConnect();
    const spyClientConnect = jest.spyOn(PostgresqlDriver.pool, 'connect');
    const spyClientDisconnect = jest.spyOn(client, 'release');
    expect(client).not.toBeUndefined();
    expect(spyClientConnect).toHaveBeenCalled();
    expect(spyClientConnect).toHaveBeenCalledTimes(1);
    await PostgresqlDriver.clientDisconnect(client);
    expect(spyClientDisconnect).toHaveBeenCalled();
    expect(spyClientDisconnect).toHaveBeenCalledTimes(1);
  });

  it('Should commit client single transaction', async () => {
    PostgresqlPoolSingleton.mockImplementation(() => {
      return {
        getInstance: (_host, _database, _user, _password, _port, _max) => {
          return {
            connect: jest.fn().mockImplementation(() => ({
              query: jest.fn().mockImplementation((statement, _values) => {
                if (statement !== 'BEGIN' || statement !== 'COMMIT') {
                  return {
                    rows: [{}],
                  };
                }
                return {};
              }),
            })),
          };
        },
      };
    });
    PostgresqlDriver.connect({
      host: fakeHost,
      database: fakeDb,
      user: fakeUser,
      password: fakePassword,
      port: fakePort,
      max: fakeMax,
    });
    const client = await PostgresqlDriver.getClientConnect();
    const spyClientQuery = jest.spyOn(client, 'query');
    await PostgresqlDriver.singleTransaction(client, faker.random.word(), [
      'name',
      'path',
    ]);
    await PostgresqlDriver.commit(client);
    expect(spyClientQuery).toHaveBeenCalled();
    expect(spyClientQuery).toHaveBeenCalledTimes(3);
  });

  it('Should rollback client single transaction', async () => {
    PostgresqlPoolSingleton.mockImplementation(() => {
      return {
        getInstance: (_host, _database, _user, _password, _port, _max) => {
          return {
            connect: jest.fn().mockImplementation(() => ({
              query: jest.fn().mockImplementation((statement, _values) => {
                if (statement !== 'BEGIN' || statement !== 'ROLLBACK') {
                  return {
                    rows: [{}],
                  };
                }
                return {};
              }),
            })),
          };
        },
      };
    });
    PostgresqlDriver.connect({
      host: fakeHost,
      database: fakeDb,
      user: fakeUser,
      password: fakePassword,
      port: fakePort,
      max: fakeMax,
    });
    const client = await PostgresqlDriver.getClientConnect();
    const spyClientQuery = jest.spyOn(client, 'query');
    await PostgresqlDriver.singleTransaction(client, faker.random.word(), [
      'name',
      'path',
    ]);
    await PostgresqlDriver.rollback(client);
    expect(spyClientQuery).toHaveBeenCalled();
    expect(spyClientQuery).toHaveBeenCalledTimes(3);
  });

  afterEach(() => {
    PostgresqlDriver.pool = undefined;
  });
});
