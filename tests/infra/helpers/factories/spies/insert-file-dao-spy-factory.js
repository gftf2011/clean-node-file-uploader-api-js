const InsertFileDAOSpy = require('../../../../../spies/insert-file-dao-spy');

module.exports = class InsertFileDAOSpyFactory {
  create() {
    this.insertFileDAOSpy = new InsertFileDAOSpy();
    return this.insertFileDAOSpy;
  }
};
