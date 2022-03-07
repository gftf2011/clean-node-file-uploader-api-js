const PostgresqlPoolSingleton = require('../../../../src/infra/helpers/singleton/postgresql-pool-singleton');

module.exports = class SutFactory {
  create(_type) {
    this.sut = new PostgresqlPoolSingleton();
    return {
      sut: this.sut,
    };
  }
};
