const DatabaseDriverTemplateMethodsSpyFactory = require('./spies/database-driver-template-methods-spy-factory');
const FileEntityToFileModelMapperSpyFactory = require('./spies/file-entity-to-file-model-mapper-spy-factory');

module.exports = class DependenciesFactory {
  create() {
    this.databaseDriverTemplateMethodsSpy =
      new DatabaseDriverTemplateMethodsSpyFactory().create();
    this.fileEntityToFileModelMapperSpy =
      new FileEntityToFileModelMapperSpyFactory().create();
    return {
      databaseDriverTemplateMethodsSpy: this.databaseDriverTemplateMethodsSpy,
      fileEntityToFileModelMapperSpy: this.fileEntityToFileModelMapperSpy,
    };
  }
};
