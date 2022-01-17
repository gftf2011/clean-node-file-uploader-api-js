const FileDeleteUseCase = require('../../../../src/domain/use-cases/file-delete-use-case');

const DependenciesFactory = require('../factories/file-delete-use-case-dependencies-factory');

module.exports = class SutFactory {
  create(_type) {
    this.dependencies = new DependenciesFactory().create();

    this.sut = new FileDeleteUseCase({
      fileDeleteAdapter: this.dependencies.fileDeleteAdapterSpy,
    });

    return {
      sut: this.sut,
      ...this.dependencies,
    };
  }
};
