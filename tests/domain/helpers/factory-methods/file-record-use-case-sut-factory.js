const FileRecordUseCase = require('../../../../src/domain/use-cases/file-record-use-case');

const DependenciesFactory = require('../factories/file-record-use-case-dependencies-factory');

module.exports = class SutFactory {
  create(_type) {
    this.dependencies = new DependenciesFactory().create();

    this.sut = new FileRecordUseCase({
      insertFileRepository: this.dependencies.insertFileRepositorySpy,
    });

    return {
      sut: this.sut,
      ...this.dependencies,
    };
  }
};
