const FileDeleteUseCase = require('../../../../src/domain/use-cases/file-delete-use-case');

const DependenciesFactory = require('../factories/file-delete-use-case-dependencies-factory');

const {
  FILE_DELETE_USE_CASE_WITH_NO_DEPENDENCY,
  FILE_DELETE_USE_CASE_WITH_EMPTY_OBJECT_AS_DEPENDENCY,
} = require('../constants');

module.exports = class SutFactory {
  create(type) {
    this.dependencies = new DependenciesFactory().create();

    if (type === FILE_DELETE_USE_CASE_WITH_NO_DEPENDENCY) {
      this.sut = new FileDeleteUseCase();
    } else if (type === FILE_DELETE_USE_CASE_WITH_EMPTY_OBJECT_AS_DEPENDENCY) {
      this.sut = new FileDeleteUseCase({});
    } else {
      this.sut = new FileDeleteUseCase({
        fileDeleteAdapter: this.dependencies.fileDeleteAdapterSpy,
      });
    }

    return {
      sut: this.sut,
      ...this.dependencies,
    };
  }
};
