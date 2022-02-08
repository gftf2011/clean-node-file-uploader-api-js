const faker = require('faker');

describe('PostgerSQL Config', () => {
  it('Should all environment variables have values', () => {
    process.env.POSTGRES_HOST = faker.internet.ip();
    process.env.POSTGRES_DB = faker.random.word();
    process.env.POSTGRES_USER = faker.internet.userName();
    process.env.POSTGRES_PASSWORD = faker.internet.password();
    process.env.POSTGRES_PORT = `${faker.internet.port()}`;
    process.env.POSTGRES_MAX = `${faker.datatype.number()}`;

    // eslint-disable-next-line global-require
    const config = require('../../../src/main/config/postgresql');

    expect(config).toEqual({
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: process.env.POSTGRES_PORT,
      max: process.env.POSTGRES_MAX,
    });
  });
});
