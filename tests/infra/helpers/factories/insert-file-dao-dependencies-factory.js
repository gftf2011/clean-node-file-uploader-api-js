const DatabaseDriverSpyFactory = require('./spies/database-driver-spy-factory');
const FileEntityToFileModelMapperSpyFactory = require('./spies/file-entity-to-file-model-mapper-spy-factory');

module.exports = class DependenciesFactory {
  create() {
    this.databaseDriverSpy = new DatabaseDriverSpyFactory().create();
    this.fileEntityToFileModelMapperSpy =
      new FileEntityToFileModelMapperSpyFactory().create();
    return {
      databaseDriverSpy: this.databaseDriverSpy,
      fileEntityToFileModelMapperSpy: this.fileEntityToFileModelMapperSpy,
    };
  }
};
