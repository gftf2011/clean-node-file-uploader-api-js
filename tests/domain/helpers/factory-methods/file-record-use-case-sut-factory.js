const FileRecordUseCase = require('../../../../src/domain/use-cases/file-record-use-case');

const DependenciesFactory = require('../factories/file-record-use-case-dependencies-factory');

const {
  FILE_RECORD_USE_CASE_WITH_NO_DEPENDENCY,
  FILE_RECORD_USE_CASE_WITH_EMPTY_OBJECT_AS_DEPENDENCY,
  FILE_RECORD_USE_CASE_HAS_INSERT_FILE_REPOSITORY_WITH_NO_INSERT,
  FILE_RECORD_USE_CASE_SUT_INSERT_FILE_REPOSITORY_THROWING_ERROR,
} = require('../constants');

const ServerError = require('../../../../src/utils/errors/server-error');

module.exports = class SutFactory {
  create(type) {
    this.dependencies = new DependenciesFactory().create();

    if (type === FILE_RECORD_USE_CASE_WITH_NO_DEPENDENCY) {
      this.sut = new FileRecordUseCase();
    } else if (type === FILE_RECORD_USE_CASE_WITH_EMPTY_OBJECT_AS_DEPENDENCY) {
      this.sut = new FileRecordUseCase({});
    } else if (
      type === FILE_RECORD_USE_CASE_HAS_INSERT_FILE_REPOSITORY_WITH_NO_INSERT
    ) {
      this.sut = new FileRecordUseCase({
        insertFileRepository: {},
      });
    } else if (
      type === FILE_RECORD_USE_CASE_SUT_INSERT_FILE_REPOSITORY_THROWING_ERROR
    ) {
      this.dependencies.insertFileRepositorySpy.insert = () => {
        return Promise.reject(new ServerError());
      };
      this.sut = new FileRecordUseCase({
        insertFileRepository: this.dependencies.insertFileRepositorySpy,
      });
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
