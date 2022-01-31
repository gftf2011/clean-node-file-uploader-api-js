const InsertFileDAOSpyFactory = require('./spies/insert-file-dao-spy-factory');

module.exports = class DependenciesFactory {
  create() {
    this.insertFileDAOSpy = new InsertFileDAOSpyFactory().create();

    return {
      insertFileDAOSpy: this.insertFileDAOSpy,
    };
  }
};
