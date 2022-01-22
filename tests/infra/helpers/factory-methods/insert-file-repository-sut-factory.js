const InsertFileRepository = require('../../../../src/infra/repositories/insert-file-repository');

const DependenciesFactory = require('../factories/insert-file-repository-dependencies-factory');

const {
  INSERT_FILE_REPOSITORY_WITH_NO_DEPENDENCY,
  INSERT_FILE_REPOSITORY_WITH_EMPTY_OBJECT_AS_DEPENDENCY,
} = require('../constants');

module.exports = class SutFactory {
  create(type) {
    this.dependencies = new DependenciesFactory().create();

    if (type === INSERT_FILE_REPOSITORY_WITH_NO_DEPENDENCY) {
      this.sut = new InsertFileRepository();
    } else if (
      type === INSERT_FILE_REPOSITORY_WITH_EMPTY_OBJECT_AS_DEPENDENCY
    ) {
      this.sut = new InsertFileRepository({});
    } else {
      this.sut = new InsertFileRepository({
        insertFileDAO: this.dependencies.insertFileDAOSpy,
      });
    }

    return {
      sut: this.sut,
      ...this.dependencies,
    };
  }
};
