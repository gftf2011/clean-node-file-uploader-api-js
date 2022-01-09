const FileRouter = require('../../../../src/presentation/routers/file-router');

const DependenciesFactory = require('../factories/file-router-dependencies-factory');

module.exports = class SutFactory {
  create(_type) {
    this.dependencies = new DependenciesFactory().create();
    this.sut = new FileRouter({
      fileUploaderUseCase: this.dependencies.fileUploaderUseCaseSpy,
    });
    return {
      sut: this.sut,
      ...this.dependencies,
    };
  }
};
