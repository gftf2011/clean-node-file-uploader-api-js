const DatabaseDriverTemplateMethodsSpyFactory = require('./spies/database-driver-template-methods-spy-factory');

module.exports = class DependenciesFactory {
  create() {
    this.databaseDriverTemplateMethodsSpy =
      new DatabaseDriverTemplateMethodsSpyFactory().create();
    return {
      databaseDriverTemplateMethodsSpy: this.databaseDriverTemplateMethodsSpy,
    };
  }
};
