const PostgresqlPoolSingleton = require('../../../../src/infra/helpers/template-methods/singleton/postgresql-pool-singleton');

module.exports = class SutFactory {
  create(_type) {
    this.sut = new PostgresqlPoolSingleton();
    return {
      sut: this.sut,
    };
  }
};
