const DatabaseDriverTemplateMethodsSpy = require('../../../../../spies/database-driver-template-methods-spy');

module.exports = class DatabaseDriverTemplateMethodsSpyFactory {
  create() {
    this.databaseDriverTemplateMethodsSpy =
      new DatabaseDriverTemplateMethodsSpy();
    return this.databaseDriverTemplateMethodsSpy;
  }
};
