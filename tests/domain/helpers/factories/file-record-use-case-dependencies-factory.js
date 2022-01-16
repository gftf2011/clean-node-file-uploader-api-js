const InsertFileRepositorySpyFactory = require('./spies/insert-file-repository-spy-factory');

module.exports = class DependenciesFactory {
  create() {
    this.insertFileRepositorySpy =
      new InsertFileRepositorySpyFactory().create();
    return {
      insertFileRepositorySpy: this.insertFileRepositorySpy,
    };
  }
};
