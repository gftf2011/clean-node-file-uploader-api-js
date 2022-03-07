const DatabaseDriverSpy = require('../../../../../spies/database-driver-spy');

module.exports = class DatabaseDriverSpyFactory {
  create() {
    this.databaseDriverSpy = new DatabaseDriverSpy();
    return this.databaseDriverSpy;
  }
};
