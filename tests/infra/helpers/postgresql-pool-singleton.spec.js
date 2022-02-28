jest.mock('pg', () => ({
  Pool: class Pool {
    constructor(config) {
      this.config = config;
    }
  },
}));

const faker = require('faker');

const SutFactory = require('./factory-methods/postgresql-pool-singleton-factory');

describe('PostgreSQL Pool Singleton', () => {
  it('Should return pool when config variables are provided', () => {
    const { sut } = new SutFactory().create();
    const configPool = {
      host: faker.internet.ip(),
      user: faker.internet.userName(),
      password: faker.internet.password(),
      database: faker.lorem.word(),
      port: faker.internet.port(),
      max: faker.datatype.number(),
    };
    const pool = sut.getInstance(
      configPool.host,
      configPool.database,
      configPool.user,
      configPool.password,
      configPool.port,
      configPool.max,
    );
    expect(pool.config).toEqual(configPool);
  });
});
