const FileRecordUseCase = require('../../../../src/domain/use-cases/file-record-use-case');

const DependenciesFactory = require('../factories/file-record-use-case-dependencies-factory');

const { FILE_RECORD_USE_CASE_WITH_NO_DEPENDENCY } = require('../constants');

module.exports = class SutFactory {
  create(type) {
    this.dependencies = new DependenciesFactory().create();

    if (type === FILE_RECORD_USE_CASE_WITH_NO_DEPENDENCY) {
      this.sut = new FileRecordUseCase();
    } else {
      this.sut = new FileRecordUseCase({
        insertFileRepository: this.dependencies.insertFileRepositorySpy,
      });
    }

    return {
      sut: this.sut,
      ...this.dependencies,
    };
  }
};