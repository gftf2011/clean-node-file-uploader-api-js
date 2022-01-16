const InsertFileRepositorySpy = require('../../../../../spies/insert-file-repository-spy');

module.exports = class InsertFileRepositorySpyFactory {
  create() {
    this.insertFileRepositorySpy = new InsertFileRepositorySpy();
    return this.insertFileRepositorySpy;
  }
};
