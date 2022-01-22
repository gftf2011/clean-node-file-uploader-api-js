const InsertFileRepository = require('../../../../src/infra/repositories/insert-file-repository');

const DependenciesFactory = require('../factories/insert-file-repository-dependencies-factory');

module.exports = class SutFactory {
  create(_type) {
    this.dependencies = new DependenciesFactory().create();

    this.sut = new InsertFileRepository({
      insertFileDAO: this.dependencies.insertFileDAOSpy,
    });

    return {
      sut: this.sut,
      ...this.dependencies,
    };
  }
};
